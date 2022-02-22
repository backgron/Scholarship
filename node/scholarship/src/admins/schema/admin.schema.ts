import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import * as mongoose from "mongoose"

export type AdminDocument = Admin & Document

@Schema()
export class Admin {
  @Prop({ type: mongoose.Types.ObjectId })
  _id: mongoose.Types.ObjectId

  @Prop({ type: String })
  name: string

  @Prop({ type: String })
  adminId: string

  @Prop({ type: String })
  academy: string

  @Prop({ type: String })
  password: string


}

export const AdminSchema = SchemaFactory.createForClass(Admin)
