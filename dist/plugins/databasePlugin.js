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
const _fastifyplugin = /*#__PURE__*/ _interop_require_default(require("fastify-plugin"));
const _mongoose = /*#__PURE__*/ _interop_require_default(require("mongoose"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function connectToDatabase() {
    try {
        await _mongoose.default.connect(process.env.DATABASE_URI);
        console.log("Connected to MongoDB ✔");
    } catch (error) {
        throw new Error(`Error connecting to database: ${error}`);
    }
}
async function disconnectDatabase() {
    await _mongoose.default.disconnect();
    console.log("Disconnected from MongoDB");
}
const databasePlugin = async (fastify)=>{
    await connectToDatabase();
    fastify.addHook("onClose", disconnectDatabase);
};
const _default = (0, _fastifyplugin.default)(databasePlugin);
