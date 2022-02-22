import { Module } from '@nestjs/common'
import { CounselorsService } from './counselors.service'
import { CounselorsController } from './counselors.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Counselor, CounselorSchema } from './schema/counselor.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Counselor.name, schema: CounselorSchema }])],
  controllers: [CounselorsController],
  providers: [CounselorsService],
  exports: [CounselorsService]
})
export class CounselorsModule { }
