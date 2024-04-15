"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addSymbolRouteOptions", {
    enumerable: true,
    get: function() {
        return addSymbolRouteOptions;
    }
});
const _TradingSymbol = require("../../../models/TradingSymbol");
const _addSymbolSchema = require("../../schema/addSymbolSchema");
async function addSymbolHandler(request, reply) {
    try {
        const body = request.body;
        const symbol = await _TradingSymbol.Tradingsymbol.findOne({
            symboltoken: body.symboltoken
        });
        if (symbol) {
            throw new Error("Symbol Already Inserted.");
        }
        const newSymbol = new _TradingSymbol.Tradingsymbol({
            ...body
        });
        await newSymbol.save();
        reply.send({
            symbol: newSymbol,
            message: "Symbol Addedd Successfully"
        });
    } catch (error) {
        throw error;
    }
}
const addSymbolRouteOptions = {
    schema: _addSymbolSchema.addSymbolRouteSchema,
    handler: addSymbolHandler
};
