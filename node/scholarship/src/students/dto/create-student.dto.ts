import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import * as mongoose from 'mongoose';
import { Action } from '../schema/action.prop';
import { Position } from '../schema/position.prop';

export class CreateStudentDto {
  @IsString()
  stuId: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @ValidateNested({ each: true })
  @Type(() => Position)
  position: Position;

  @IsNumber()
  phone: number;

  @IsArray()
  @ValidateNested()
  @Type(() => Action)
  actions: Array<Action>;

  grades: mongoose.Types.ObjectId;
  awards: mongoose.Types.ObjectId;
}
