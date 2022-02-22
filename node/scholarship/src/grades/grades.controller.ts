import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common'
import { ChangeGradeDto } from './dto/student-change-grade.dto'
import { GradesService } from './grades.service'

@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) { }

}
