import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common'
import { StudentsService } from './students.service'
import { CreateStudentDto } from './dto/create-student.dto'
import { UpdateStudentDto } from './dto/update-student.dto'
import { AwardsService } from 'src/awards/awards.service'
import { CreateAwardDto } from 'src/awards/dto/create-award.dto'
import { GradesService } from 'src/grades/grades.service'
import { ChangeGradeDto } from 'src/grades/dto/student-change-grade.dto'

@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly awardsService: AwardsService,
    private readonly gradesService: GradesService
  ) { }

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto)
  }

  @Post('/createAward')
  createAward(@Body() award: CreateAwardDto, @Session() session: any) {
    this.awardsService.createAward(award, session)
  }

  @Post('/changeGrade')
  async changeGrade(@Body() changeGradeDto: ChangeGradeDto, @Session() session: any) {
    let grade = await this.gradesService.studentChangeGrade(changeGradeDto, session)

    return {
      status: 200,
      msg: '已申请修改成绩',
      data: grade
    }
  }

}
