import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      requited: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;
