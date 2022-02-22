import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import * as mongoose from 'mongoose'
import { Position } from "src/students/schema/position.prop"

export type CounselorDocument = Counselor & Document
@Schema()
export class Counselor {
  @Prop({ type: mongoose.Types.ObjectId })
  _id: mongoose.Types.ObjectId

  @Prop({ type: String })
  counselorId: string

  @Prop({ type: String })
  password: string

  @Prop({ type: String })
  name: string

  @Prop({ enum: ['男', '女'] })
  sex: string

  @Prop({ type: Position })
  position: Position

  @Prop({ type: Number })
  phone: number

}



export const CounselorSchema = SchemaFactory.createForClass(Counselor)
