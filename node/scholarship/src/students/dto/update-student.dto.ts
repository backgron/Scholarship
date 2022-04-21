import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Position } from '../schema/position.prop';

export class UpdateStudentDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @ValidateNested({ each: true })
  @Type(() => Position)
  position: Position;

  @IsNumber()
  phone: number;
}
