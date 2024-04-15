import { Static, Type } from "@sinclair/typebox";

const options = Type.Object({
  exchange: Type.String(),
  searchscrip: Type.String(),
});

export const searchSymbolAndTokenSchema = {
  body: options,
};

export type SearchSymbolAndTokenRequestBody = Static<typeof options>;
