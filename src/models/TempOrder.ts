import { Schema, Types, model } from "mongoose";

interface TempOrderTypes {
  userId: Types.ObjectId;
  orderid: string;
  uniqueorderid: string;
  tradingsymbol: string;
  symboltoken: string;
  transactiontype: string;
}

const TempOrderSchema = new Schema<TempOrderTypes>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    orderid: { type: String, required: true },
    uniqueorderid: { type: String, required: true },
    tradingsymbol: { type: String, required: true },
    symboltoken: { type: String, required: true },
    transactiontype: { type: String, required: true },
  },
  { timestamps: true }
);

const TempOrder = model<TempOrderTypes>("tempOrders", TempOrderSchema);

export { TempOrder, TempOrderTypes };

