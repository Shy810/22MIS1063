"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidToken = exports.refreshToken = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("./config");
let cachedToken = config_1.config.accessToken;
let tokenExpiry = 0;
const refreshToken = async () => {
    console.log("[AUTH] Refreshing access token...");
    const response = await axios_1.default.post(`${config_1.config.baseUrl}/auth`, {
        email: config_1.config.auth.email,
        name: config_1.config.auth.name,
        rollNo: config_1.config.auth.rollNo,
        accessCode: config_1.config.auth.accessCode,
        clientID: config_1.config.auth.clientId,
        clientSecret: config_1.config.auth.clientSecret,
    });
    cachedToken = response.data.access_token;
    tokenExpiry = response.data.expires_in;
    console.log(`[AUTH] Token refreshed successfully | Expires at: ${new Date(tokenExpiry * 1000).toISOString()}`);
    return cachedToken;
};
exports.refreshToken = refreshToken;
const getValidToken = async () => {
    const nowInSeconds = Math.floor(Date.now() / 1000);
    if (tokenExpiry > 0 && nowInSeconds >= tokenExpiry - 60) {
        console.log("[AUTH] Token expired or expiring soon, refreshing...");
        return await (0, exports.refreshToken)();
    }
    if (!cachedToken) {
        return await (0, exports.refreshToken)();
    }
    return cachedToken;
};
exports.getValidToken = getValidToken;
//# sourceMappingURL=auth.js.map