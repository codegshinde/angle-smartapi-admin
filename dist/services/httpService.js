"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _axios = /*#__PURE__*/ _interop_require_default(require("axios"));
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class httpService {
    /**
   * Makes an HTTP request.
   *
   * @param config The request configuration.
   * @returns The response data.
   */ async makeRequest(config) {
        try {
            const response = await this.axiosInstance.request(config);
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
   */ async get(url, headers, params) {
        return await this.makeRequest({
            method: "GET",
            url,
            params,
            headers
        });
    }
    /**
   * Makes a POST request.
   *
   * @param url The request URL.
   * @param data The request data.
   * @returns The response data.
   */ async post(url, data, headers) {
        return await this.makeRequest({
            method: "POST",
            url,
            data,
            headers
        });
    }
    /**
   * Makes a PATCH request.
   *
   * @param url The request URL.
   * @param data The request data.
   * @returns The response data.
   */ async patch(url, data, headers) {
        return await this.makeRequest({
            method: "PATCH",
            url,
            data,
            headers
        });
    }
    /**
   * Makes a DELETE request.
   *
   * @param url The request URL.
   * @param params The request parameters.
   * @param data The request data.
   * @returns The response data.
   */ async delete(url, headers, params, data) {
        return await this.makeRequest({
            method: "DELETE",
            url,
            params,
            data,
            headers
        });
    }
    constructor(){
        _define_property(this, "axiosInstance", void 0);
        this.axiosInstance = _axios.default.create({
            baseURL: process.env?.APIHOST
        });
    }
}
const _default = new httpService();
