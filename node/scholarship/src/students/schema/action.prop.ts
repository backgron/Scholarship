
import { IsString } from "class-validator"


export class Action {
  @IsString()
  name: string

  @IsString()
  grade: string

  other: string
}