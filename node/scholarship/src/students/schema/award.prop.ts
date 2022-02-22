import * as mongoose from 'mongoose'
export class AwardProp {
  type: mongoose.Types.ObjectId
  ref: 'Award'
}