import { Static, Type } from "@sinclair/typebox";

const options = Type.Object({
  apiId: Type.String(),
  quantity: Type.Optional(Type.Number()),
  clientCode: Type.Optional(Type.String()),
  totpSecret: Type.Optional(Type.String()),
  pin: Type.Optional(Type.Number()),
});

export const updateAPISchema = {
  body: options,
};

export type UpdateAPIRequestBody = Static<typeof options>;
