import { Static, Type } from "@sinclair/typebox";

const options = Type.Object({
  mobile: Type.String({ maxLength: 10, minLength: 10 }),
  password: Type.RegExp(`^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$`),
});

export const loginRouteSchema = {
  body: options,
};

export type LoginRequestBody = Static<typeof options>;
