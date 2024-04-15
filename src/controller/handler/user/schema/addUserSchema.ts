import { Static, Type } from "@sinclair/typebox";

const options = Type.Object({
  name: Type.String(),
  email: Type.String(),
  mobile: Type.Number(),
  password: Type.String(),
  clientCode: Type.String(),
  broker: Type.String(),
});

export const addUserSchema = {
  body: options,
};

export type AddUserRequestBody = Static<typeof options>;
