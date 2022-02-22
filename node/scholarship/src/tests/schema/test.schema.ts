import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import * as mongoose from 'mongoose'

export type TestDocument = Test & Document

@Schema()
export class Test {
  @Prop({ required: true, type: String })
  name: string

  @Prop({ required: true, type: String })
  age: number

  @Prop({ required: false, type: mongoose.Types.ObjectId })
  _id: mongoose.Types.ObjectId
}

export const TestSchema = SchemaFactory.createForClass(Test)

