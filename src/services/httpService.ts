import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class httpService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env?.APIHOST,
    });
  }
  

  /**
   * Makes an HTTP request.
   *
   * @param config The request configuration.
   * @returns The response data.
   */
  async makeRequest<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.request<T>(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // HTTP methods

  /**
   * Makes a GET request.
   *
   * @param url The request URL.
   * @param params The request parameters.
   * @returns The response data.
   */
  async get<T>(url: string, headers?: any, params?: Record<string, any>): Promise<T> {
    return await this.makeRequest({
      method: "GET",
      url,
      params,
      headers,
    });
  }

  /**
   * Makes a POST request.
   *
   * @param url The request URL.
   * @param data The request data.
   * @returns The response data.
   */
  async post<T>(url: string, data: any, headers?: any): Promise<T> {
    return await this.makeRequest({
      method: "POST",
      url,
      data,
      headers,
    });
  }

  /**
   * Makes a PATCH request.
   *
   * @param url The request URL.
   * @param data The request data.
   * @returns The response data.
   */
  async patch<T>(url: string, data: any, headers?: any): Promise<T> {
    return await this.makeRequest({
      method: "PATCH",
      url,
      data,
      headers,
    });
  }

  /**
   * Makes a DELETE request.
   *
   * @param url The request URL.
   * @param params The request parameters.
   * @param data The request data.
   * @returns The response data.
   */
  async delete<T>(url: string, headers?: any, params?: any, data?: any): Promise<T> {
    return await this.makeRequest({
      method: "DELETE",
      url,
      params,
      data,
      headers,
    });
  }
}

export default new httpService();
