import { Controller, Get, Post, Body, Session, Query } from '@nestjs/common';
import { StudentsService } from 'src/students/students.service';
import { AdminsService } from './admins.service';
import { CounselorsService } from 'src/counselors/counselors.service';
import { AwardsService } from 'src/awards/awards.service';
import { GradesService } from 'src/grades/grades.service';
import { NoticesService } from 'src/notices/notices.service';
import { CreateNoticeDto } from 'src/notices/dto/create-notice.dto';
import { UpdateNoticeDto } from 'src/notices/dto/update-notice.dto';
import { isAuth } from 'src/guard/auth-guard.guard';

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
  @isAuth('admin', 'counselor')
  getStudentInfo() {
    return this.studentsService.getStudentInfo();
  }

  //重置学生密码
  @Post('/resetStuPassword')
  @isAuth('admin', 'counselor')
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
  @isAuth('admin', 'counselor')
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
  @isAuth('admin')
  findCounselorInfo() {
    return this.counselorsService.findCounselorInfo();
  }

  // 条件查询导员信息
  @Post('/findCounselorBy')
  @isAuth('admin')
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
  @isAuth('admin')
  resetCounselorPassword(@Body('_id') _id: string) {
    console.log(1111111);

    return this.counselorsService.resetCounselorPassword(_id);
  }

  @Post('/getCounselorsDetail')
  @isAuth('admin')
  getCounselorsDetail(@Body('_id') _id: string) {
    return this.counselorsService.findCounselorByObjectId(_id);
  }

  // 条件查询奖学金申请
  @Post('/findAwardApply')
  @isAuth('admin', 'counselor')
  async findAllAwardApply(@Body() params: any) {
    let para = {};
    for (let key in params) {
      if (key === 'applyStatus.status') {
        para['applyStatus.status'] = params['applyStatus.status'] - 0;
      } else if (params[key]) {
        para[key] = new RegExp(params[key], 'i');
      }
    }
    console.log(para);
    return this.awardsService.findsAwardCondition(para);
  }

  //条件查询成绩
  @Post('/findsGradeConditionBy')
  @isAuth('admin', 'counselor')
  async findsGradeConditionBy(@Body() params: any) {
    let para = {};
    for (let key in params) {
      if (key === 'classStatus.status') {
        para['classStatus.status'] = params['classStatus.status'] - 0;
      } else if (params[key]) {
        para[key] = new RegExp(params[key], 'i');
      }
    }
    return this.gradesService.findsGradeConditionBy(para);
  }

  //通过一个成绩申请
  @Post('/passGradeApply')
  @isAuth('admin', 'counselor')
  async passGradeApply(@Body() params: { _id: string; status: number }) {
    await this.gradesService.passGradeApply(params._id, params.status);
    return {
      code: 200,
      message: '已通过申请',
    };
  }

  //通过一个奖助学金
  @Post('/passAwardApply')
  @isAuth('admin', 'counselor')
  async passAwardApply(@Body() params: { _id: string; status: number }) {
    await this.awardsService.passAwardApply(params._id, params.status);
    return {
      code: 200,
      message: '已通过申请',
    };
  }

  //驳回一个奖助学金申请
  @Post('/rejectAwardApply')
  @isAuth('admin', 'counselor')
  async rejectAwardApply(@Body('_id') _id: string) {
    await this.awardsService.rejectAwardApply(_id);
    return {
      code: 200,
      message: '已驳回申请',
    };
  }

  //驳回一个奖助学金申请
  @Post('/rejectGradeApply')
  @isAuth('admin', 'counselor')
  async rejectGradeApply(@Body('_id') _id: string) {
    await this.gradesService.rejectGradeApply(_id);
    return {
      code: 200,
      message: '已驳回申请',
    };
  }

  //创建一个公告
  @Post('/createNotices')
  @isAuth('admin')
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

  // 条件查询公告信息
  @Post('/findNoticelorBy')
  @isAuth('admin', 'student')
  findNoticeBy(@Body() params: Object) {
    let para = {};
    for (let key in params) {
      if (key === 'status') {
        para['status'] = params['status'] - 0;
      } else if (params[key]) {
        para[key] = new RegExp(params[key], 'i');
      }
    }
    return this.noticeService.findNoitceBy(para);
  }
}
