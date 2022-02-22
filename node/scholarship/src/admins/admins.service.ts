import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { changePassword, isPassword } from 'src/util/passwordUtil'
import { Admin, AdminDocument } from './schema/admin.schema'

@Injectable()
export class AdminsService {
  constructor(@InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>) { }


  //通过 adminId 查找
  async findByAdminId(adminId: string) {
    return await this.adminModel.findOne({ adminId: adminId })
  }

  // admin登录
  async login(adminId: string, password: string) {
    let admin = await this.findByAdminId(adminId)
    if (admin && await isPassword(admin, this.adminModel, password)) {
      return admin
    }
  }

  //admin修改密码
  async changeAdminPassword(adminId: string, pre: string, next: string) {
    let admin = await this.findByAdminId(adminId)

    if (admin && await changePassword(admin, this.adminModel, pre, next)) {
      return admin
    }
  }


  //通过学院寻找管理员
  async findAdminByAcademy(academy: string) {
    return this.adminModel.findOne({ academy: academy })
  }
}
