"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getSymbolRouteOptions", {
    enumerable: true,
    get: function() {
        return getSymbolRouteOptions;
    }
});
const _TradingSymbol = require("../../../models/TradingSymbol");
async function getSymbolHandler(request, reply) {
    try {
        const symbols = await _TradingSymbol.Tradingsymbol.find({}); // Fetch symbols from the database
        if (symbols.length === 0) {
            throw new Error("Symbol Already Inserted."); // Handle if no symbols found
        }
        reply.send({
            symbols: symbols,
            message: "Symbols Retrieved Successfully"
        });
    } catch (error) {
        throw error;
    }
}
const getSymbolRouteOptions = {
    schema: {},
    handler: getSymbolHandler
};
