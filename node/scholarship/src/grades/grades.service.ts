import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Grade, GradeDocument } from './schema/grade.schema'
import * as mongoose from 'mongoose'
import { StudentsService } from 'src/students/students.service'
import { ChangeGradeDto } from './dto/student-change-grade.dto'
import { ObjectId } from 'mongodb'


@Injectable()
export class GradesService {
  constructor(@InjectModel(Grade.name) private readonly gradeModel: Model<GradeDocument>,
    private readonly studentsService: StudentsService,
  ) { }

  findByClassId(gradeId: mongoose.Types.ObjectId) {
    return this.gradeModel.findOne({ _id: gradeId })
  }

  async findAllGradeApply() {
    return await this.gradeModel.find({}, {
      stuName: 1,
      className: 1,
      classGrade: 1,
      'classStatus.newGrade': 1,
      'classStatus.adminName': 1,
      'classStatus.counselorName': 1,
      'classStatus.status': 1
    })
  }

  async studentChangeGrade(grade: ChangeGradeDto, session: any) {
    let admin = session.stu_admin
    let counselor = session.stu_counselor
    if (session.user) {
      let gra = await this.gradeModel.findOne({ _id: new ObjectId(grade.grade_id) })
      console.log(gra)

      gra.classStatus = {
        newGrade: grade.newGrade,
        admin: admin._id,
        adminName: admin.name,
        counselor: counselor._id,
        counselorName: counselor.name,
        status: 0
      }
      gra.save()
    }
  }
}
