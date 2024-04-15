import { Schema, Types, model } from "mongoose";

interface ApiTypes {
  _id: string;
  userId: Types.ObjectId;
  quantity: string;
  jwtToken: string;
  refreshToken: string;
  feedToken: string;
  clientCode: string;
  totpSecret: string;
  pin: string;
  status: boolean;
  plan: string;
  startDate: Date;
  endDate?: Date;
}

const angelApiSchema = new Schema<ApiTypes>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, unique: true },
    quantity: { type: String, required: true },
    totpSecret: { type: String, required: true },
    jwtToken: { type: String, required: false },
    refreshToken: { type: String, required: false },
    feedToken: { type: String, required: false },
    clientCode: { type: String, required: true, unique: true },
    pin: { type: String, required: true },
    status: { type: Boolean, default: false },
    plan: { type: String, required: false },
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false },
  },
  { timestamps: true }
);

const API = model<ApiTypes>("apis", angelApiSchema);

export { API, ApiTypes };

