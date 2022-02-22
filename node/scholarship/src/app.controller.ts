import { BadRequestException, Body, Controller, Get, Post, Session, UseGuards } from '@nestjs/common'
import { AdminsService } from './admins/admins.service'
import { AppService } from './app.service'
import { ChangePasswordDto, LoginDto } from './auth.dto'
import { CounselorsService } from './counselors/counselors.service'
import { isAuth } from './guard/auth-guard.guard'
import { StudentsService } from './students/students.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly studentsService: StudentsService,
    private readonly adminsService: AdminsService,
    private readonly counselorsService: CounselorsService
  ) { }

  @Get()
  async getHello() {
    return this.appService.getHello()
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Session() session: any) {


    //如果是admin
    let admin = await this.adminsService.login(loginDto.username, loginDto.password)
    if (admin) {
      session.user = admin
      session.userType = "admin"
      return {
        status: 200,
        data: {
          user: session.user,
          userType: session.userType
        }
      }
    }

    //如果是导员
    let counselor = await this.counselorsService.login(loginDto.username, loginDto.password)
    if (counselor) {
      session.user = counselor
      session.userType = "counselor"
      return {
        status: 200,
        data: {
          user: session.user,
          userType: session.userType
        }
      }
    }


    //如果是学生
    let stu = await this.studentsService.login(loginDto.username, loginDto.password)

    if (stu) {
      session.user = stu
      session.userType = "student"
      session.stu_counselor = await this.counselorsService.findCounselorsByClass(stu.position._class)
      session.stu_admin = await this.adminsService.findAdminByAcademy(stu.position.academy)
      console.log(session.stu_admin)
      return {
        status: 200,
        data: {
          user: session.user,
          userType: session.userType
        }
      }
    }

    throw new BadRequestException('用户名或密码错误')
  }


  @Post('/changePassword')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Session() session: any) {
    let user = await this.studentsService.changeStuPassword(changePasswordDto.username, changePasswordDto.pre, changePasswordDto.next) ||
      await this.adminsService.changeAdminPassword(changePasswordDto.username, changePasswordDto.pre, changePasswordDto.next) ||
      await this.counselorsService.changeCounselorPassword(changePasswordDto.username, changePasswordDto.pre, changePasswordDto.next)

    console.log(111)


    if (user) {
      return {
        status: 200,
        user: changePasswordDto.username,
        userType: session.userType,
        msg: '修改密码成功'
      }
    }
  }

  @Get('/who')
  @isAuth('admin', 'student')
  isWho(@Session() session: any) {
    return {
      user: session.user,
      userType: session.userType
    }
  }
}
