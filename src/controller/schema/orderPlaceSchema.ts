import { Static, Type } from "@sinclair/typebox";

const options = Type.Object({
  exchange: Type.Optional(Type.String()),
  tradingsymbol: Type.String({ description: "The trading symbol of the stock" }),
  symboltoken: Type.String(),
  transactiontype: Type.String({ description: "The transaction type (BUY or SELL)" }),
  ordertype: Type.Optional(Type.String()),
  variety: Type.Optional(Type.String()),
  duration: Type.Optional(Type.String()),
  price: Type.Optional(Type.Number()),
  squareoff: Type.Optional(Type.String()),
  stoploss: Type.Optional(Type.Number()),
  quantity: Type.Optional(Type.Number()),
  producttype: Type.Optional(Type.String()),
});

export const orderPlaceRouteSchema = {
  body: options,
};

export type OrderPlaceRequestBody = Static<typeof options>;
