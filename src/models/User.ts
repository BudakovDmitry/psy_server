import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
      username: {
      type: String,
    },
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
      roles: [{ type: String, ref: 'Role' }]
  },
  { versionKey: false },
);

const User = mongoose.model('User', userSchema);

export default User;
