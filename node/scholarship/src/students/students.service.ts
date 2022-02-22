import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Mongoose } from 'mongoose'
import { CreateStudentDto } from './dto/create-student.dto'
import { UpdateStudentDto } from './dto/update-student.dto'
import { Student, StudentDocument } from './schema/student.schema'
import { changePassword, isPassword, restPassword } from 'src/util/passwordUtil'
import { ObjectId } from 'mongodb'
@Injectable()
export class StudentsService {
  constructor(@InjectModel(Student.name) private studentModel: Model<StudentDocument>) { }


  create(createStudentDto: CreateStudentDto) {
    let stu = new this.studentModel(createStudentDto)
    console.log(createStudentDto)
    stu.save()
    return 'This action adds a new student'
  }

  //通过 stuId 查找学生
  async findByStuId(stuId: string) {
    return await this.studentModel.findOne({ stuId: stuId })
  }

  //通过 ObjectId 查找学生
  async findByObjectId(_id: string) {
    let stu = await this.studentModel.find({ _id: new ObjectId(_id) }, {
      _id: 0,
      password: 0,
      awards: 0
    }).populate([{
      path: 'grades', select: {
        _id: 0,
        className: 1,
        classGrade: 1
      }
    }])
    console.log(stu)

    return stu[0]
  }


  // 学生登录
  async login(stuId: string, password: string) {
    let stu = await this.findByStuId(stuId)
    if (stu && await isPassword(stu, this.studentModel, password)) {
      return stu
    }
  }

  //学生修改密码
  async changeStuPassword(stuId: string, pre: string, next: string) {
    let stu = await this.findByStuId(stuId)

    if (stu && await changePassword(stu, this.studentModel, pre, next)) {
      return stu
    }
  }

  //分页查找学生 账号/姓名/班级
  async getStudentInfo() {
    let students = await this.studentModel.aggregate([
      {
        $project: {
          stuId: 1,
          name: 1,
          'position._class': 1
        }
      }
    ])

    return students.map(item => {
      if (item.position && item.position['_class']) {
        Reflect.set(item, '_class', item.position['_class'])
        Reflect.deleteProperty(item, 'position')
      }
      return item
    })
  }

  //重置学生密码
  async resetStuPassword(_id: string) {
    return restPassword(_id, this.studentModel)
  }

  // 条件查询学生
  async findStuBy(params: Object) {
    let students = await this.studentModel.find(params, {
      stuId: 1,
      name: 1,
      'position._class': 1
    })
    return students.map(item => {
      return {
        _id: item._id,
        stuId: item.stuId,
        name: item.name,
        _class: item.position['_class']
      }
    })
  }

}
