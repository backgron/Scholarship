import { Controller, Get, Post, Body, Session } from '@nestjs/common';
import { CreateGradeDTO } from './dto/create-grade.dto';
import { ChangeGradeDto } from './dto/student-change-grade.dto';
import { GradesService } from './grades.service';

@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Get('findAllGradeApply')
  findAllGradeApply() {
    return this.gradesService.findAllGradeApply();
  }

  @Post('createGrade')
  createGrade(@Body() createGradeDTO: CreateGradeDTO, @Session() session: any) {
    return this.gradesService.createGrade(createGradeDTO, session);
  }

  @Post('findStuAllGradesById')
  findStuAllGradesById(@Body('_id') _id: string) {
    return this.gradesService.findStuAllGradesById(_id);
  }

  @Post('studentChangeGrade')
  studentChangeGrade(
    @Body() changeGradeDto: ChangeGradeDto,
    @Session() session: any,
  ) {
    this.gradesService.studentChangeGrade(changeGradeDto, session);
    return {
      message: '已提交申请',
    };
  }
}
