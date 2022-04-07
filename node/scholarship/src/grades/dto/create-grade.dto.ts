
import { Prop } from '@nestjs/mongoose'
import { IsNotEmpty, IsString } from 'class-validator'
import * as mongoose from 'mongoose'
export class CreateGradeDTO{

  @Prop()
  @IsNotEmpty()
  stu:mongoose.Types.ObjectId

  @Prop()
  @IsString()
  stuName:string

  @Prop()
  @IsString()
  className:string

  @Prop()
  @IsString()
  classGrade:string
}