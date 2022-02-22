import { IsString } from "class-validator"
import { ApplyStatus } from "../schema/applyStatus.prop"
import * as mongoose from 'mongoose'

export class CreateAwardDto {
  @IsString()
  applyType: string

  @IsString()
  applyName: string

  @IsString()
  applyLevel: string

  @IsString()
  applyMain: string

}
