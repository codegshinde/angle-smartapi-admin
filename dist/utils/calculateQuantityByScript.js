"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "calculateQuantityByScript", {
    enumerable: true,
    get: function() {
        return calculateQuantityByScript;
    }
});
async function calculateQuantityByScript(script, quantity) {
    try {
        const qty = parseInt(quantity, 10);
        const string = script.toLocaleLowerCase();
        if (string.includes("banknifty")) {
            return (qty * 15).toString();
        } else if (string.includes("nifty")) {
            return (qty * 50).toString();
        } else {
            return "";
        }
    } catch (error) {
        throw error;
    }
}
