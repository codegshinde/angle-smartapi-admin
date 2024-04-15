import { Schema, model } from "mongoose";

interface SymbolTypes {
  tradingsymbol: string;
  symboltoken: string;
  exchange: string;
}

const symbolSchema = new Schema<SymbolTypes>({
  tradingsymbol: { type: String, required: true },
  symboltoken: { type: String, required: true },
  exchange: { type: String, required: true },
});

const Tradingsymbol = model<SymbolTypes>("symbols", symbolSchema);

export { SymbolTypes, Tradingsymbol };

