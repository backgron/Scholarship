import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AwardsService } from 'src/awards/awards.service';
import { CreateAwardDto } from 'src/awards/dto/create-award.dto';
import { GradesService } from 'src/grades/grades.service';
import { ChangeGradeDto } from 'src/grades/dto/student-change-grade.dto';
import { RePasswordDto } from './dto/repassword-student.dto';

@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly awardsService: AwardsService,
    private readonly gradesService: GradesService,
  ) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Post('/createAward')
  createAward(@Body() award: CreateAwardDto, @Session() session: any) {
    console.log('session', session.user);
    this.awardsService.createAward(award, session);
  }

  @Post('/changeGrade')
  async changeGrade(
    @Body() changeGradeDto: ChangeGradeDto,
    @Session() session: any,
  ) {
    let grade = await this.gradesService.studentChangeGrade(
      changeGradeDto,
      session,
    );
    console.log('changeGrade', session);
    return {
      status: 200,
      msg: '已申请修改成绩',
      data: grade,
    };
  }

  @Get('/getAllGrade')
  async getAllGrade(@Query('stuid') stuid: string) {
    let stu = await this.studentsService.findByStuId(stuid);

    return stu
      ? stu.grades
      : {
          statusCode: 400,
          message: '学生不存在',
        };
  }

  @Get('/findsAwardCondition')
  async findsAwardCondition(@Session() session: any) {
    return await this.studentsService.findsAwardApply(session);
  }

  @Get('/findGradeApply')
  async findGradeApply(@Session() session: any) {
    return await this.studentsService.findGradeApply(session);
  }

  @Get('/findAllApply')
  async findAllApply(@Session() session: any) {
    return await this.studentsService.findAllApply(session);
  }

  @Get('/findAllGrades')
  async findAllGrades(@Session() session: any) {
    return await this.studentsService.findAllGrades(session);
  }

  @Get('/findAllActions')
  async findAllActions(@Session() session: any) {
    return await this.studentsService.findAllActions(session);
  }

  @Post('/upDateInfo')
  async upDateInfo(
    @Body() updateStudentDto: UpdateStudentDto,
    @Session() session: any,
  ) {
    return await this.studentsService.upDateInfo(updateStudentDto, session);
  }

  @Post('/changeStuPassword')
  async changeStuPassword(
    @Body() rePasswordDto: RePasswordDto,
    @Session() session: any,
  ) {
    return this.studentsService.changeStuPassword(
      session.user._id,
      rePasswordDto.oldPassword,
      rePasswordDto.newPassword,
    );
  }

  @Post('/deleteApply')
  async deleteApply(@Body('_id') _id: string, @Session() session: any) {
    return this.awardsService.studentDeleteAward(_id, session.user._id);
  }
}
