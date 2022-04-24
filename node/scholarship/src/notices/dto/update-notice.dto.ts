import { Prop } from '@nestjs/mongoose';
import { IsBoolean, IsEnum, IsString } from 'class-validator';

export class UpdateNoticeDto {
  @IsString()
  @Prop({ type: String })
  main: string;

  @Prop({ type: String })
  @IsString()
  type: '公告' | '通知';

  @Prop({ type: String })
  @IsEnum({
    unUse: 0,
    use: 1,
  })
  @Prop()
  status: number;
}
