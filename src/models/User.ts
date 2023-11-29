import mongoose from 'mongoose';
import {DiarySuccessType} from "../types/types";

export const userSchema = new mongoose.Schema(
  {
      name: {
          type: String
      },
      email: {
        type: String,
          required: true
      },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
      isActivated: {
        type: Boolean,
        default: false
      },
      isActive: {
        type: Boolean,
        default: false
      },
      activationLink: {
          type: String
      },
      avatar: {
          type: String,
      },
      diarySuccess: {
          type: [{
              title: String,
              description: String,
              date: String,
              _id: String,
          }]
      },
      diaryOfGoodness: {
          type: [{
              title: String,
              description: String,
              date: String,
              _id: String,
          }]
      },
      registrationDate: {
        type: Date,
          required: true,
      },
      roles: [{ type: String, ref: 'Role' }]
  },
  { versionKey: false },
);

const User = mongoose.model('User', userSchema);

export default User;
