import { BadRequestException, Body, Injectable, Session } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose } from 'mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student, StudentDocument } from './schema/student.schema';
import {
  changePassword,
  isPassword,
  restPassword,
} from 'src/util/passwordUtil';
import { ObjectId } from 'mongodb';
import { AwardsService } from 'src/awards/awards.service';
@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
  ) {}

  create(createStudentDto: CreateStudentDto) {
    let stu = new this.studentModel(createStudentDto);
    console.log(createStudentDto);
    stu.save();
    return 'This action adds a new student';
  }

  //通过 stuId 查找学生
  async findByStuId(stuId: string) {
    let stu = await this.studentModel.find(
      { stuId: stuId },
      {
        _id: 1,
        password: 0,
        grades: 0,
        awards: 0,
      },
    );

    return stu[0];
  }

  //通过 ObjectId 查找学生
  async findByObjectId(_id: string) {
    return await this.studentModel.findOne({ _id: new ObjectId(_id) });
  }

  // 学生登录
  async login(stuId: string, password: string) {
    let stu = await this.findByStuId(stuId);
    let stuObj = await this.findByObjectId(stu._id.toHexString());
    if (stuObj && (await isPassword(stuObj, this.studentModel, password))) {
      return stu;
    }
  }

  //学生修改密码
  async changeStuPassword(_id: string, pre: string, next: string) {
    let stu = await this.findByObjectId(_id);
    console.log(stu);
    if (await changePassword(stu, this.studentModel, pre, next)) {
      return {
        code: 200,
        message: '密码修改成功',
      };
    } else {
      return {
        code: 401,
        message: '旧密码错误',
      };
    }
  }

  //分页查找学生 账号/姓名/班级
  async getStudentInfo() {
    let students = await this.studentModel.aggregate([
      {
        $project: {
          stuId: 1,
          name: 1,
          'position._class': 1,
        },
      },
    ]);

    return students.map((item) => {
      if (item.position && item.position['_class']) {
        Reflect.set(item, '_class', item.position['_class']);
        Reflect.deleteProperty(item, 'position');
      }
      return item;
    });
  }

  //重置学生密码
  async resetStuPassword(_id: string) {
    return restPassword(_id, this.studentModel);
  }

  // 条件查询学生
  async findStuBy(params: Object) {
    let students = await this.studentModel.find(params, {
      stuId: 1,
      name: 1,
      'position._class': 1,
    });
    return students.map((item) => {
      return {
        _id: item._id,
        stuId: item.stuId,
        name: item.name,
        _class: item.position['_class'],
      };
    });
  }

  // 查询自己的奖学金申请
  async findsAwardApply(session: any) {
    let stuAwardsApply = (await this.findByObjectId(session.user._id)).populate(
      [
        {
          path: 'awards',
        },
      ],
    );
    return (await stuAwardsApply).awards;
  }

  // 查询自己的成绩申请
  async findGradeApply(session: any) {
    let stuGradesApply = (await this.findByObjectId(session.user._id)).populate(
      [
        {
          path: 'grades',
        },
      ],
    );
    let grades = (await stuGradesApply).grades.filter(
      (item) => item.classStatus !== undefined,
    );
    return grades;
  }

  //查询自己的所有申请
  async findAllApply(session: any) {
    let grades = await this.findGradeApply(session);
    let awards = await this.findsAwardApply(session);

    let applys = [...grades, ...awards].sort((a, b) => {
      let timeA = a.applyTime || a.classStatus.applyTime;
      let timeB = b.applyTime || b.classStatus.applyTime;
      return timeA > timeB ? -1 : 1;
    });
    return applys;
  }

  // 查询自己的奖惩信息
  async findAllActions(session: any) {
    let actions = (await this.findByObjectId(session.user._id)).populate([
      {
        path: 'actions',
      },
    ]);
    return (await actions).actions;
  }

  //修改自己的基本信息
  async upDateInfo(updateStudentDto: UpdateStudentDto, session: any) {
    let res = await this.studentModel.updateOne(
      { _id: new ObjectId(session.user._id) },
      updateStudentDto,
    );
    session.user = await this.findByStuId(session.user.stuId);
    return {
      user: { user: session.user, userType: 'student' },
      code: 200,
      message: '修改成功',
    };
  }

  //学生删除一个奖学金申请
  async deleteAward(_id: string, stu_id: string): Promise<any> {
    let stu = await this.findByObjectId(stu_id);
    stu.awards = stu.awards.filter((item) => {
      return item.toString() !== _id;
    });
    stu.save();
  }

  //学生删除一个成绩申请
  async deleteGradeApply(_id: string, stu_id: string): Promise<any> {
    let stu = await this.findByObjectId(stu_id);
    stu.grades = stu.grades.filter((item) => {
      return item.toString() !== _id;
    });
    console.log(stu);
    stu.save();
  }
}
