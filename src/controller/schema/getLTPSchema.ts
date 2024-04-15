import { Static, Type } from "@sinclair/typebox";

const options = Type.Object({
  mode: Type.String(),
  exchangeTokens: Type.Any(),
});

export const getLTPRouteSchema = {
  body: options,
};

export type GetLTPRequestBody = Static<typeof options>;
