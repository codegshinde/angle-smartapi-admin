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
