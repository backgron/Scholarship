import { IsArray, IsString } from "class-validator"

export class Position {
  @IsString()
  academy: string

  @IsString()
  major: string

  @IsArray()
  _class: Array<string>
}