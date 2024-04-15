import "fastify";
import { ComparePassword } from "./utils/comparePassword";
import { HashPassword } from "./utils/hashPassword";

declare module "fastify" {
  interface FastifyRequest {
    hashPassword: HashPassword;
    comparePassword: ComparePassword;
    signJWT: (payload: Record<string, string | any>) => string;
  }
}

declare module "fastify" {
  interface FastifyInstance {
    config: {
      DATABASE_URI: string;
      JWT_SECRET: string;
    };
  }
}

export interface AdminToken {
  id: string;
  iat: string;
  eat: string;
}

export interface AngleApiResponse {
  status: boolean;
  message: string;
  errorcode: string;
  data: any[];
}

export interface OrderTypes {
  exchange: "NFO";
  ordertype: "MARKET";
  producttype: "INTRADAY";
  tradingsymbol: string;
  symboltoken: string;
  variety: "NORMAL";
  transactiontype: "BUY" | "SELL";
  duration: "DAY";
  price?: string;
  squareoff?: string;
  stoploss?: string;
  quantity: string;
}

export interface OrderPlaceApiResponse {
  status: string;
  message: string;
  errorcode: number;
  data: {
    script: string;
    orderid: string;
    uniqueorderid: string;
  };
}

export interface OrderModifyApiResponse {
  status: string;
  message: string;
  errorcode: number;
  data: {
    orderid: string;
    uniqueorderid: string;
  };
}

export interface LoginApiResponse {
  status: boolean;
  message: string;
  errorcode: string;
  data: {
    jwtToken: string;
    refreshToken: string;
    feedToken: string;
  };
}
