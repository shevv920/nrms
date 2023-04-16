import { Types, Schema, model } from 'mongoose';

export const AccountSchema = new Schema({
  _id       : { type: String, required: true, default: function () { new Types.ObjectId().toString() } },
  firstName : { type: String, required: true },
  lastName  : { type: String },
  email     : { type: String, required: true, unique: true, lowercase: true },
  createdAt : { type: Date },
  updatedAt : { type: Date },
}, {
  timestamps: true,
});

export const AccountModel = model('Account', AccountSchema);
