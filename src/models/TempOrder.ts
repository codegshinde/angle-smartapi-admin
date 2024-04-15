import { Schema, Types, model } from "mongoose";

interface TempOrderTypes {
  userId: Types.ObjectId;
  orderid: string;
  uniqueorderid: string;
  script: string;
  type: string;
}

const TempOrderSchema = new Schema<TempOrderTypes>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    orderid: { type: String, required: true },
    uniqueorderid: { type: String, required: true },
    script: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

const TempOrder = model<TempOrderTypes>("tempOrders", TempOrderSchema);

export { TempOrder, TempOrderTypes };

