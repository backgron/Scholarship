import { IsString } from 'class-validator';

type ApplyType = 'awardApply' | 'gradeApply';

export class DeleteApplyDto {
  @IsString()
  _id: string;

  @IsString()
  applyType: ApplyType;
}
