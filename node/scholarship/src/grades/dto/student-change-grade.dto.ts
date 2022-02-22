import { IsNotEmpty, IsString } from "class-validator"
import * as mongoose from 'mongoose'


export class ChangeGradeDto {

  @IsNotEmpty()
  grade_id: mongoose.Types.ObjectId

  @IsString()
  newGrade: string


}