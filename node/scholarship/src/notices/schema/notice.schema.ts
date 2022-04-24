import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum } from 'class-validator';
import * as mongoose from 'mongoose';

export type NoticeDocument = Notice & Document;
@Schema()
export class Notice {
  @Prop({ type: mongoose.Types.ObjectId, required: false })
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String })
  time: string;

  @Prop({ type: String })
  main: string;

  @Prop({ type: String })
  type: '公告' | '通知';

  @IsEnum({
    unUse: 0,
    use: 1,
  })
  @Prop()
  status: number;
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
