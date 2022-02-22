import { IsString } from "class-validator"

export class Position {
  @IsString()
  academy: string

  @IsString()
  major: string

  @IsString()
  _class: string
}