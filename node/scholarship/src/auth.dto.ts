import { IsString } from "class-validator"


export class LoginDto {
  @IsString()
  username: string

  @IsString()
  password: string
}

export class ChangePasswordDto {
  @IsString()
  username: string

  @IsString()
  pre: string

  @IsString()
  next: string
}