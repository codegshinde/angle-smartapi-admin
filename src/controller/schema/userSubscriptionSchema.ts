import { Static, Type } from "@sinclair/typebox";

const options = Type.Object({
  userId: Type.String(),
  plan: Type.String(),
});

export const userSubscriptionRouteSchema = {
  body: options,
};

export type UserSubscriptionRequestBody = Static<typeof options>;
