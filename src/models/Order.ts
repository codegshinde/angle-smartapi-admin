import { Schema, Types, model } from "mongoose";

interface OrderTypes {
  userId: Types.ObjectId;
  orderid: string;
  uniqueorderid: string;
  tradingsymbol: string;
  symboltoken: string;
  transactiontype: string;
}

const orderSchema = new Schema<OrderTypes>(
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

const Order = model<OrderTypes>("orders", orderSchema);

export { Order, OrderTypes };

