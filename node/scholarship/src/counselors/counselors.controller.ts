import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CounselorsService } from './counselors.service'
import { CreateCounselorDto } from './dto/create-counselor.dto'
import { UpdateCounselorDto } from './dto/update-counselor.dto'

@Controller('counselors')
export class CounselorsController {
  constructor(private readonly counselorsService: CounselorsService) { }

}
