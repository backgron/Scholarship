import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import * as mongoose from 'mongoose'
import { ClassStatus } from "./classStatus.prop"

export type GradeDocument = Grade & Document
@Schema()
export class Grade {
  @Prop({ type: mongoose.Types.ObjectId ,required:false})
  _id: mongoose.Types.ObjectId

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Student' })
  stu: any

  @Prop({ type: String })
  stuName: string

  @Prop({ type: String })
  className: string

  @Prop({ type: String })
  classGrade: string

  @Prop({ type: ClassStatus || Boolean })
  classStatus: ClassStatus | Boolean

}


export const GradeSchema = SchemaFactory.createForClass(Grade)
