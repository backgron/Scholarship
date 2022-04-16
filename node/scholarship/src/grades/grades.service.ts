import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Grade, GradeDocument } from './schema/grade.schema';
import * as mongoose from 'mongoose';
import { StudentsService } from 'src/students/students.service';
import { ChangeGradeDto } from './dto/student-change-grade.dto';
import { ObjectId } from 'mongodb';
import { CreateGradeDTO } from './dto/create-grade.dto';
import { StudentsModule } from 'src/students/students.module';

@Injectable()
export class GradesService {
  constructor(
    @InjectModel(Grade.name)
    private readonly gradeModel: Model<GradeDocument>,
    private readonly studentsService: StudentsService,
  ) {}

  findByClassId(gradeId: mongoose.Types.ObjectId) {
    return this.gradeModel.findOne({ _id: gradeId });
  }

  async findAllGradeApply() {
    return await this.gradeModel.find(
      { classStatus: { $ne: false } },
      {
        stuName: 1,
        className: 1,
        classGrade: 1,
        'classStatus.newGrade': 1,
        'classStatus.adminName': 1,
        'classStatus.counselorName': 1,
        'classStatus.status': 1,
      },
    );
  }

  async studentChangeGrade(grade: ChangeGradeDto, session: any) {
    let admin = session.stu_admin;
    let counselor = session.stu_counselor;
    if (session.user) {
      let gra = await this.gradeModel.findOne({
        _id: new ObjectId(grade.grade_id),
      });
      console.log(gra);

      gra.classStatus = {
        newGrade: grade.newGrade,
        admin: admin._id,
        adminName: admin.name,
        counselor: counselor._id,
        counselorName: counselor.name,
        status: 0,
      };
      gra.save();
    }
    console.log(session.user);
  }

  async createGrade(createGradeDTO: CreateGradeDTO, session: any) {
    const grade = new this.gradeModel(createGradeDTO);

    const stu = await this.studentsService.findByObjectId(grade.stu);
    grade._id = new mongoose.Types.ObjectId();
    grade.save();
    stu.grades.push(grade._id);

    stu.save();
    return 'create a Grade info';
  }

  async findStuAllGradesById(_id: string) {
    return await this.gradeModel.find({ stuId: new ObjectId(_id) });
  }
}
