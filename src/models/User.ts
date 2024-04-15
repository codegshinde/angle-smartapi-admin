import { Schema, model } from "mongoose";

interface UserTypes {
  _id: string;
  name: string;
  role: "user" | "admin";
  mobile: number;
  email: string;
  password?: string;
  broker: string;
}

const userSchema = new Schema<UserTypes>(
  {
    name: { type: String, required: true },
    mobile: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    broker: { type: String, required: true },
  },
  { timestamps: true }
);

const User = model<UserTypes>("users", userSchema);

export { User, UserTypes };

