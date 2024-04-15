import { Static, Type } from "@sinclair/typebox";

const options = Type.Object({
  variety: Type.String(),
  orderid: Type.String(),
});

export const orderCancelRouteSchema = {
  body: options,
};

export type OrderCancelRequestBody = Static<typeof options>;
