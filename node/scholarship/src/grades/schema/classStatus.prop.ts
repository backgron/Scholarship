import { Prop } from "@nestjs/mongoose"
import { IsEnum, IsString } from "class-validator"
import { Types } from "mongoose"

export class ClassStatus {
  @Prop({ type: String })
  newGrade: string

  @Prop({ type: Types.ObjectId, ref: 'Counselor' })
  counselor: Types.ObjectId

  @Prop({ type: String })
  counselorName: string

  @Prop({ type: Types.ObjectId, ref: 'Admin' })
  admin: Types.ObjectId

  @Prop({ type: String })
  adminName: string

  @IsEnum({
    fail: -1,
    student: 0,
    counselor: 1,
    admin: 2,
  })
  @Prop()
  status: number
}