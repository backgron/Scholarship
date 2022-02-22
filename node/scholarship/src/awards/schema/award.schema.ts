import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import * as mongoose from 'mongoose'
import { Student } from "src/students/schema/student.schema"
import { ApplyStatus } from "./applyStatus.prop"

export type AwardDocument = Award & Document

@Schema()
export class Award {
  // @Prop({ type: mongoose.Types.ObjectId })
  _id: mongoose.Types.ObjectId

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Student' })
  stu: any

  @Prop({ type: String })
  stuName: string

  @Prop({ type: String })
  applyTime: string

  @Prop({ type: String })
  applyType: string

  @Prop({ type: String })
  applyName: string

  @Prop({ type: String })
  applyLevel: string

  @Prop({ type: String })
  applyMain: string

  @Prop({ type: ApplyStatus })
  applyStatus: ApplyStatus
}

export const AwardSchema = SchemaFactory.createForClass(Award)

