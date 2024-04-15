import { Static, Type } from "@sinclair/typebox";

const options = Type.Object({
  variety: Type.String(),
  orderid: Type.String(),
  ordertype: Type.String(),
  producttype: Type.String(),
  duration: Type.String(),
  tradingsymbol: Type.String(),
  symboltoken: Type.String(),
  exchange: Type.String(),
});

export const orderModifyRouteSchema = {
  body: options,
};

export type OrderModifyRequestBody = Static<typeof options>;
