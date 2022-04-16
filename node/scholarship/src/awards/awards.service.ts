import { Injectable, Session } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentsService } from 'src/students/students.service';
import { CreateAwardDto } from './dto/create-award.dto';
import { ApplyStatus } from './schema/applyStatus.prop';
import { Award, AwardDocument } from './schema/award.schema';

@Injectable()
export class AwardsService {
  constructor(
    private readonly studentsService: StudentsService,
    @InjectModel(Award.name)
    private readonly AwardsModule: Model<AwardDocument>,
  ) {}

  async createAward(award: CreateAwardDto, session: any) {
    console.log('session', session.user);
    let stu = await this.studentsService.findByStuId(session.user.stuId);
    console.log('stu', stu);
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
}
