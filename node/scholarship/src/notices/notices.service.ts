import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { Notice, NoticeDocument } from './schema/notice.schema';

@Injectable()
export class NoticesService {
  constructor(
    @InjectModel(Notice.name)
    private readonly noticesModel: Model<NoticeDocument>,
  ) {}

  //创建一个公告
  createNotices(createNoticeDto: CreateNoticeDto) {
    let dto = {
      ...createNoticeDto,
      _id: new ObjectId(),
      time: new Date().getTime().toString(),
      status: 1,
    };
    let notice = new this.noticesModel(dto);
    console.log(notice);
    notice.save();

    return {
      code: 201,
      message: '创建成功',
      data: notice,
    };
  }

  //修改一个公告
  async updateNotice(_id: string, updateNoticeDto: UpdateNoticeDto) {
    console.log(_id);
    let notice = await this.noticesModel.findByIdAndUpdate(
      new ObjectId(_id),
      updateNoticeDto,
    );
    return {
      code: 200,
      message: '公告已修改',
    };
  }

  //条件模糊搜索 公告
  async findNoitceBy(params: Object) {
    return await this.noticesModel.find(params).sort({ time: -1 });
  }
}
