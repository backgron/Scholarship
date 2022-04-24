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
import { StudentsService } from 'src/students/students.service';
import { AdminsService } from './admins.service';
import { CounselorsService } from 'src/counselors/counselors.service';
import { AwardsService } from 'src/awards/awards.service';
import { GradesService } from 'src/grades/grades.service';
import { NoticesService } from 'src/notices/notices.service';
import { CreateNoticeDto } from 'src/notices/dto/create-notice.dto';
import { UpdateNoticeDto } from 'src/notices/dto/update-notice.dto';

@Controller('admins')
export class AdminsController {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly studentsService: StudentsService,
    private readonly counselorsService: CounselorsService,
    private readonly awardsService: AwardsService,
    private readonly gradesService: GradesService,
    private readonly noticeService: NoticesService,
  ) {}

  //获取学生信息
  @Get('/getStudentInfo')
  getStudentInfo() {
    return this.studentsService.getStudentInfo();
  }

  //重置学生密码
  @Post('/resetStuPassword')
  resetStuPassword(@Body('_id') _id: string) {
    return this.studentsService.resetStuPassword(_id);
  }

  // 通过id找到学生详细信息
  @Post('/getStudentDetail')
  getStudentDetail(@Body('_id') _id: string) {
    return this.studentsService.findByObjectId(_id);
  }

  // 条件查询学生信息
  @Post('/findStuBy')
  findStuBy(@Body() params: Object) {
    let para = {};
    for (let key in params) {
      if (params[key]) {
        para[key] = new RegExp(params[key], 'i');
      }
    }
    return this.studentsService.findStuBy(para);
  }

  //查询所有导员信息
  @Get('/getCounselorInfo')
  findCounselorInfo() {
    return this.counselorsService.findCounselorInfo();
  }

  // 条件查询导员信息
  @Post('/findCounselorBy')
  findCounselorBy(@Body() params: Object) {
    let para = {};
    for (let key in params) {
      if (params[key]) {
        para[key] = new RegExp(params[key], 'i');
      }
    }
    return this.counselorsService.findCounselorBy(para);
  }

  //重置导员密码
  @Post('/resetCounselorPassword')
  resetCounselorPassword(@Body('_id') _id: string) {
    console.log(1111111);

    return this.counselorsService.resetCounselorPassword(_id);
  }

  @Post('/getCounselorsDetail')
  getCounselorsDetail(@Body('_id') _id: string) {
    return this.counselorsService.findCounselorByObjectId(_id);
  }

  // 条件查询奖学金申请
  @Post('/findAwardApply')
  async findAllAwardApply(@Body() params: any) {
    let para = {};
    for (let key in params) {
      if (params[key]) {
        para[key] = new RegExp(params[key], 'i');
      }
    }
    return this.awardsService.findsAwardCondition(para);
  }

  //条件查询成绩
  @Post('/findsGradeConditionBy')
  async findsGradeConditionBy(@Body() params: any) {
    let para = {};
    for (let key in params) {
      if (params[key]) {
        para[key] = new RegExp(params[key], 'i');
      }
    }
    return this.gradesService.findsGradeConditionBy(para);
  }

  //通过一个成绩申请
  @Post('/passGradeApply')
  async passGradeApply(@Body('_id') _id: string) {
    await this.gradesService.passGradeApply(_id, 2);
    return {
      code: 200,
      message: '已通过申请',
    };
  }

  //通过一个奖助学金
  @Post('/passAwardApply')
  async passAwardApply(@Body('_id') _id: string) {
    await this.awardsService.passAwardApply(_id, 2);
    return {
      code: 200,
      message: '已通过申请',
    };
  }

  //驳回一个奖助学金申请
  @Post('/rejectAwardApply')
  async rejectAwardApply(@Body('_id') _id: string) {
    await this.awardsService.rejectAwardApply(_id);
    return {
      code: 200,
      message: '已驳回申请',
    };
  }

  //驳回一个奖助学金申请
  @Post('/rejectGradeApply')
  async rejectGradeApply(@Body('_id') _id: string) {
    await this.gradesService.rejectGradeApply(_id);
    return {
      code: 200,
      message: '已驳回申请',
    };
  }

  //创建一个公告
  @Post('/createNotices')
  async createNotices(
    @Body() params: CreateNoticeDto,
    @Session() session: any,
  ) {
    return this.noticeService.createNotices(params);
  }

  //修改一个公告
  @Post('/updateNotice')
  async updateNotice(
    @Query('_id') _id: string,
    @Body() updateNoticeDto: UpdateNoticeDto,
  ) {
    return this.noticeService.updateNotice(_id, updateNoticeDto);
  }

  // 条件查询导员信息
  @Post('/findNoticelorBy')
  findNoticeBy(@Body() params: Object) {
    let para = {};
    for (let key in params) {
      if (params[key]) {
        para[key] = new RegExp(params[key], 'i');
      }
    }
    return this.noticeService.findNoitceBy(para);
  }
}
