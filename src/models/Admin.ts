import { Schema, model } from "mongoose";

interface AdminTypes {
  name: string;
  mobile: number;
  email: string;
  password?: string;
  lastLogin: Date;
}

const adminSchema = new Schema<AdminTypes>({
  name: { type: String, required: true },
  mobile: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  lastLogin: { type: Date, required: true },
});

const Admin = model<AdminTypes>("admins", adminSchema);

export { Admin, AdminTypes };

