import mongoose from 'mongoose';
import {DiarySuccessType} from "../types/types";

const userSchema = new mongoose.Schema(
  {
      name: {
          type: String
      },
      email: {
        type: String,
          unique: true,
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
          }]
      },
      roles: [{ type: String, ref: 'Role' }]
  },
  { versionKey: false },
);

const User = mongoose.model('User', userSchema);

export default User;
