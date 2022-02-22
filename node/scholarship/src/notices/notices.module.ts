import { Module } from '@nestjs/common'
import { NoticeService } from './notices.service'
import { NoticeController } from './notices.controller'

@Module({
  controllers: [NoticeController],
  providers: [NoticeService]
})
export class NoticeModule { }
