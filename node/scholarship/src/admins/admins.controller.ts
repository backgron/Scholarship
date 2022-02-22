import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { StudentsService } from 'src/students/students.service'
import { AdminsService } from './admins.service'
import { CounselorsService } from 'src/counselors/counselors.service'

@Controller('admins')
export class AdminsController {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly studentsService: StudentsService,
    private readonly counselorsService: CounselorsService
  ) {
  }

  //获取学生信息
  @Get('/getStudentInfo')
  getStudentInfo() {
    return this.studentsService.getStudentInfo()
  }

  //重置学生密码
  @Post('/resetStuPassword')
  resetStuPassword(@Body('_id') _id: string) {
    return this.studentsService.resetStuPassword(_id)
  }

  // 通过id找到学生详细信息
  @Post('/getStudentDetail')
  getStudentDetail(@Body('_id') _id: string) {
    return this.studentsService.findByObjectId(_id)
  }

  // 条件查询学生信息
  @Post('/findStuBy')
  findStuBy(@Body() params: Object) {
    let para = {}
    for (let key in params) {
      if (params[key]) {
        para[key] = new RegExp(params[key], 'i')
      }
    }
    return this.studentsService.findStuBy(para)
  }

  //查询所有导员信息
  @Get('/getCounselorInfo')
  findCounselorInfo() {
    return this.counselorsService.findCounselorInfo()
  }

  // 条件查询导员信息
  @Post('/findCounselorBy')
  findCounselorBy(@Body() params: Object) {
    let para = {}
    for (let key in params) {
      if (params[key]) {
        para[key] = new RegExp(params[key], 'i')
      }
    }
    return this.counselorsService.findCounselorBy(para)
  }

  //重置导员密码
  @Post('/resetCounselorPassword')
  resetCounselorPassword(@Body('_id') _id: string) {
    console.log(1111111)

    return this.counselorsService.resetCounselorPassword(_id)
  }

  @Post('/getCounselorsDetail')
  getCounselorsDetail(@Body('_id') _id: string) {
    return this.counselorsService.findCounselorByObjectId(_id)
  }
}
