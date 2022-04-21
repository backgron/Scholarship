import { IsString } from 'class-validator';

export class RePasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}
