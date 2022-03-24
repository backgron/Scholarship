import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { Model } from 'mongoose'
import { changePassword, isPassword, restPassword } from 'src/util/passwordUtil'
import { Counselor, CounselorDocument } from './schema/counselor.schema'

@Injectable()
export class CounselorsService {
  constructor(@InjectModel(Counselor.name) private readonly counselorModel: Model<CounselorDocument>) { }

  //通过 counselorId 查找详情
  async findByCounselorId(counselorId: string) {
    return await this.counselorModel.findOne({ counselorId: counselorId })
  }

  //通过_id查找导员详情
  async findCounselorByObjectId(_id: string) {
    let counselor = await this.counselorModel.findById(new ObjectId(_id), {
      counselorId: 1,
      name: 1,
      sex: 1,
      position: 1,
      phone: 1
    })
    console.log(_id)

    console.log(counselor)

    return counselor
  }

  // counselor登录
  async login(counselorId: string, password: string) {
    let counselor = await this.findByCounselorId(counselorId)
    if (counselor && await isPassword(counselor, this.counselorModel, password)) {
      return counselor
    }
  }

  //counselor修改密码
  async changeCounselorPassword(counselorId: string, pre: string, next: string) {
    let counselor = await this.findByCounselorId(counselorId)

    if (counselor && await changePassword(counselor, this.counselorModel, pre, next)) {
      return counselor
    }
  }

  //搜索所有导员  工号/姓名/系院
  async findCounselorInfo() {
    let counselors = await this.counselorModel.aggregate([
      {
        $project: {
          counselorId: 1,
          name: 1,
          'position.academy': 1
        }
      }
    ])

    return counselors.map(item => {
      return {
        _id: item._id,
        counselorId: item.counselorId,
        name: item.name,
        academy: item.position ? item.position.academy : '暂无分配'
      }
    })
  }

  //条件模糊搜索 导员
  async findCounselorBy(params: Object) {
    let counselors = await this.counselorModel.find(params, {
      counselorId: 1,
      name: 1,
      'position.academy': 1
    })
    return counselors.map(item => {
      return {
        _id: item._id,
        counselorId: item.counselorId,
        name: item.name,
        academy: item.position ? item.position.academy : '暂无分配'
      }
    })
  }

  //重置导员密码
  async resetCounselorPassword(_id: string) {
    return restPassword(_id, this.counselorModel)
  }

  // 通过 班级准确查询导员
  async findCounselorsByClass(className: string) {
    return await this.counselorModel.findOne({ 'position._class': { $elemMatch: { $eq: className } } })
  }
}
