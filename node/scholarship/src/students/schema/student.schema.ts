import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import * as mongoose from 'mongoose'
import { Position } from "./position.prop"
import { Action } from './action.prop'
import { Award } from "src/awards/schema/award.schema"

export type StudentDocument = Student & Document


@Schema()
export class Student {

  @Prop({ type: mongoose.Types.ObjectId, required: false })
  _id: mongoose.Types.ObjectId

  @Prop({ type: String, require: true })
  stuId: string

  @Prop({ type: String, require: true })
  password: string

  @Prop({ type: String, require: true })
  name: string

  @Prop({ type: Number })
  age: number

  @Prop({ enum: ['男', '女'] })
  sex: string

  @Prop({ type: Position, require: true })
  position: Position

  @Prop({ type: Number })
  phone: number

  @Prop({ type: Array })
  actions: Array<Action>

  @Prop({ type: [mongoose.Types.ObjectId], ref: 'Grade' })
  grades: any[]

  @Prop({ type: [mongoose.Types.ObjectId], ref: 'Award' })
  awards: any[]

}

export const StudentSchema = SchemaFactory.createForClass(Student)
