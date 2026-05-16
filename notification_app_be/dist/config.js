"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfig = exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
exports.config = {
    port: parseInt(process.env.PORT || "3000", 10),
    baseUrl: process.env.BASE_URL || "",
    accessToken: process.env.ACCESS_TOKEN || "",
    auth: {
        email: process.env.AUTH_EMAIL || "",
        name: process.env.AUTH_NAME || "",
        rollNo: process.env.AUTH_ROLL_NO || "",
        accessCode: process.env.AUTH_ACCESS_CODE || "",
        clientId: process.env.AUTH_CLIENT_ID || "",
        clientSecret: process.env.AUTH_CLIENT_SECRET || "",
    },
};
const validateConfig = () => {
    if (!exports.config.baseUrl)
        throw new Error("BASE_URL is not defined in .env");
    if (!exports.config.accessToken)
        throw new Error("ACCESS_TOKEN is not defined in .env");
    if (!exports.config.auth.clientId)
        throw new Error("AUTH_CLIENT_ID is not defined in .env");
    if (!exports.config.auth.clientSecret)
        throw new Error("AUTH_CLIENT_SECRET is not defined in .env");
};
exports.validateConfig = validateConfig;
//# sourceMappingURL=config.js.map