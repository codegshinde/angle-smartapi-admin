import { Static, Type } from "@sinclair/typebox";

const options = Type.Object({
  exchange: Type.String(),
  tradingsymbol: Type.String(),
  symboltoken: Type.String(),
});

export const addSymbolRouteSchema = {
  body: options,
};

export type AddSymbolRequestBody = Static<typeof options>;
