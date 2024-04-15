import { Static, Type } from "@sinclair/typebox";

const options = Type.Object({
  userId: Type.String(),
  quantity: Type.Number(),
  clientCode: Type.String(),
  totpSecret: Type.String(),
  pin: Type.Number(),
});

export const addAPISchema = {
  body: options,
};

export type AddAPIRequestBody = Static<typeof options>;
