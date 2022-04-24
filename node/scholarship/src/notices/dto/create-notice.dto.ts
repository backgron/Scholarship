import { Prop } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
export class CreateNoticeDto {
  @IsString()
  @Prop({ type: String })
  main: string;

  @Prop({ type: String })
  @IsString()
  type: '公告' | '通知';
}
