import { Schema, Types, model } from "mongoose";

interface OrderTypes {
  userId: Types.ObjectId;
  orderid: string;
  script: string;
  type: string;
  uniqueorderid: string;
}

const orderSchema = new Schema<OrderTypes>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    orderid: { type: String, required: true },
    uniqueorderid: { type: String, required: true },
    script: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = model<OrderTypes>("orders", orderSchema);

export { Order, OrderTypes };

