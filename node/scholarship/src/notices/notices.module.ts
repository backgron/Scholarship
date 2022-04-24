import { Module } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { NoticeController as NoticesController } from './notices.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notice, NoticeSchema } from './schema/notice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notice.name, schema: NoticeSchema }]),
  ],
  controllers: [NoticesController],
  providers: [NoticesService],
  exports: [NoticesService],
})
export class NoticesModule {}
