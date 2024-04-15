"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    loginAndSaveApiService: function() {
        return loginAndSaveApiService;
    },
    ltpService: function() {
        return ltpService;
    },
    orderCancelService: function() {
        return orderCancelService;
    },
    orderModifyService: function() {
        return orderModifyService;
    },
    orderPlaceService: function() {
        return orderPlaceService;
    },
    searchScripService: function() {
        return searchScripService;
    },
    tokensRefreshService: function() {
        return tokensRefreshService;
    }
});
const _httpService = /*#__PURE__*/ _interop_require_default(require("./httpService"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const headers = (jwtToken)=>{
    const baseHeaders = {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-UserType": "USER",
        "X-SourceID": "WEB",
        "X-ClientLocalIP": "CLIENT_LOCAL_IP",
        "X-ClientPublicIP": "CLIENT_PUBLIC_IP",
        "X-MACAddress": "MAC_ADDRESS",
        "X-PrivateKey": process.env?.APIKEY
    };
    if (jwtToken) {
        return {
            ...baseHeaders,
            Authorization: `Bearer ${jwtToken}`
        };
    } else {
        return baseHeaders;
    }
};
const loginAndSaveApiService = async (data)=>{
    try {
        const response = await _httpService.default.post("/rest/auth/angelbroking/user/v1/loginByPassword", data, headers());
        return response.data;
    } catch (error) {
        throw error;
    }
};
async function tokensRefreshService(data, jwtToken) {
    try {
        const response = await _httpService.default.post("/rest/auth/angelbroking/jwt/v1/generateTokens", data, headers(jwtToken));
        return response.data;
    } catch (error) {
        throw error;
    }
}
async function searchScripService(data, jwtToken) {
    try {
        const response = await _httpService.default.post("/rest/secure/angelbroking/order/v1/searchScrip", data, headers(jwtToken));
        return response.data;
    } catch (error) {
        throw error;
    }
}
async function orderPlaceService(data, jwtToken) {
    try {
        const response = await _httpService.default.post("/rest/secure/angelbroking/order/v1/placeOrder", data, headers(jwtToken));
        return response.data;
    } catch (error) {
        throw error;
    }
}
async function orderModifyService(data, jwtToken) {
    try {
        const response = await _httpService.default.post("/rest/secure/angelbroking/order/v1/modifyOrder", data, headers(jwtToken));
        return response.data;
    } catch (error) {
        throw error;
    }
}
async function orderCancelService(data, jwtToken) {
    try {
        const response = await _httpService.default.post("/rest/secure/angelbroking/order/v1/cancelOrder", data, headers(jwtToken));
        return response.data;
    } catch (error) {
        throw error;
    }
}
async function ltpService(data, jwtToken) {
    try {
        const response = await _httpService.default.post("/rest/secure/angelbroking/market/v1/quote/", data, headers(jwtToken));
        return response.data;
    } catch (error) {
        throw error;
    }
}
