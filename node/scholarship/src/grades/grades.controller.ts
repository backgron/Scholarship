import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common'
import { CreateGradeDTO } from './dto/create-grade.dto'
import { ChangeGradeDto } from './dto/student-change-grade.dto'
import { GradesService } from './grades.service'

@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) { }

  @Get('findAllGradeApply')
  findAllGradeApply() {
    return this.gradesService.findAllGradeApply()
  }

  @Post('createGrade')
  createGrade(@Body() createGradeDTO:CreateGradeDTO,@Session()session:any){
    return this.gradesService.createGrade(createGradeDTO,session)
  }
}
