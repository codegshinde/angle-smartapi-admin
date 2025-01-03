import { OrderCancelRequestBody } from "../controller/schema/orderCancelSchema";
import { OrderModifyRequestBody } from "../controller/schema/orderModifySchema";
import { AngleApiResponse, LoginApiResponse, OrderModifyApiResponse, OrderPlaceApiResponse, OrderTypes } from "../types";
import httpService from "./httpService";

const headers = (jwtToken?: string) => {
  const baseHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-UserType": "USER",
    "X-SourceID": "WEB",
    "X-ClientLocalIP": "CLIENT_LOCAL_IP",
    "X-ClientPublicIP": "CLIENT_PUBLIC_IP",
    "X-MACAddress": "MAC_ADDRESS",
    "X-PrivateKey": process.env?.APIKEY,
  };

  if (jwtToken) {
    return {
      ...baseHeaders,
      Authorization: `Bearer ${jwtToken}`,
    };
  } else {
    return baseHeaders;
  }
};

export const loginAndSaveApiService = async (data: { clientcode: string; password: string; totp: string }): Promise<LoginApiResponse> => {
  try {
    const response = await httpService.post<LoginApiResponse>("/rest/auth/angelbroking/user/v1/loginByPassword", data, headers());
    return response;
  } catch (error) {
    throw error;
  }
};

export async function tokensRefreshService(data: { refreshToken: string }, jwtToken: string) {
  try {
    const response = await httpService.post<AngleApiResponse>("/rest/auth/angelbroking/jwt/v1/generateTokens", data, headers(jwtToken));

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function searchScripService(data: any, jwtToken: string) {
  try {
    const response = await httpService.post<AngleApiResponse>("/rest/secure/angelbroking/order/v1/searchScrip", data, headers(jwtToken));
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function orderPlaceService(data: OrderTypes, jwtToken: string): Promise<OrderPlaceApiResponse> {
  try {
    const response = await httpService.post<OrderPlaceApiResponse>("/rest/secure/angelbroking/order/v1/placeOrder", data, headers(jwtToken));
    return response;
  } catch (error) {
    throw error;
  }
}

export async function orderModifyService(data: OrderModifyRequestBody, jwtToken: string): Promise<OrderModifyApiResponse> {
  try {
    const response = await httpService.post<OrderModifyApiResponse>("/rest/secure/angelbroking/order/v1/modifyOrder", data, headers(jwtToken));
    return response;
  } catch (error) {
    throw error;
  }
}

export async function orderCancelService(data: OrderCancelRequestBody, jwtToken: string) {
  try {
    const response = await httpService.post<AngleApiResponse>("/rest/secure/angelbroking/order/v1/cancelOrder", data, headers(jwtToken));
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function ltpService(data: any, jwtToken: string) {
  try {
    const response = await httpService.post<AngleApiResponse>("/rest/secure/angelbroking/market/v1/quote/", data, headers(jwtToken));
    return response.data;
  } catch (error) {
    throw error;
  }
}
