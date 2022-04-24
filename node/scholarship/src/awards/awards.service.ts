import { Injectable, Session } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { StudentsService } from 'src/students/students.service';
import { CreateAwardDto } from './dto/create-award.dto';
import { Award, AwardDocument } from './schema/award.schema';

@Injectable()
export class AwardsService {
  constructor(
    @InjectModel(Award.name)
    private readonly AwardsModule: Model<AwardDocument>,
    private readonly studentsService: StudentsService,
  ) {}

  //创建一个奖学金申请
  async createAward(award: CreateAwardDto, session: any) {
    console.log(session);
    let stu = await this.studentsService.findByObjectId(session.user._id);
    let admin = session.stu_admin;
    let counselor = session.stu_counselor;
    if (session.user) {
      let awa = new this.AwardsModule(award);
      awa.applyTime = new Date().getTime().toString();
      awa.applyStatus = {
        admin: admin._id,
        adminName: admin.name,
        counselor: counselor._id,
        counselorName: counselor.name,
        status: 0,
      };
      awa.stu = stu;
      awa.stuName = stu.name;
      awa.save();
      if (stu.awards) {
        stu.awards.push(awa);
      } else {
        stu.awards = [awa];
      }

      stu.save();
    }
  }

  //查找奖学金申请记录
  async findsAwardCondition(awardCondition: any) {
    return await this.AwardsModule.find(awardCondition);
  }

  //删除一个奖助学金申请
  async studentDeleteAward(_id: string, stu_id: string) {
    await this.studentsService.deleteAward(_id, stu_id);
    let deleteOne = await this.AwardsModule.findOneAndDelete({ _id: _id });
    console.log(deleteOne);
    return {
      code: 200,
      message: '撤销申请成功',
      data: deleteOne,
    };
  }

  //通过一个奖助学金申请
  async passAwardApply(_id: string, status?: number) {
    console.log(_id, status);
    let grade = await this.AwardsModule.updateOne(
      { _id: new ObjectId(_id) },
      {
        'applyStatus.status': status,
      },
    );

    console.log(grade);
  }

  //驳回一个奖助学金申请
  async rejectAwardApply(_id: string) {
    await this.AwardsModule.updateOne(
      { _id: new ObjectId(_id) },
      {
        'applyStatus.status': -1,
      },
    );
  }
}
