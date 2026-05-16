"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const axios_1 = __importStar(require("axios"));
const auth_1 = require("./auth");
const validator_1 = require("./validator");
const constants_1 = require("./constants");
const Log = async (stack, level, pkg, message) => {
    console.log(`\n${"─".repeat(60)}`);
    console.log(`[LOGGER] New log request initiated`);
    console.log(`[LOGGER] Parameters | Stack: "${stack}" | Level: "${level}" | Package: "${pkg}"`);
    console.log(`[LOGGER] Message: "${message}"`);
    (0, validator_1.validateLogParams)(stack, level, pkg, message);
    const { BASE_URL, ACCESS_TOKEN } = (0, auth_1.getEnvConfig)();
    const requestBody = {
        stack: stack,
        level: level,
        package: pkg,
        message,
    };
    const url = `${BASE_URL}${constants_1.LOG_ENDPOINT}`;
    console.log(`[LOGGER] Sending POST request to: ${url}`);
    console.log(`[LOGGER] Request body: ${JSON.stringify(requestBody)}`);
    try {
        const response = await axios_1.default.post(url, requestBody, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
        });
        console.log(`✅ [LOG SUCCESS] [${stack.toUpperCase()}] [${level.toUpperCase()}] [${pkg}] - ${message}`);
        console.log(`   Log ID: ${response.data.logID}`);
        console.log(`   Server Response: ${response.data.message}`);
        console.log(`${"─".repeat(60)}\n`);
        return response.data;
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            const status = error.response?.status ?? "N/A";
            const errorMessage = error.response?.data?.message ?? error.message;
            console.error(`❌ [LOG FAILED] [${stack.toUpperCase()}] [${level.toUpperCase()}] [${pkg}] - ${message}`);
            console.error(`   Status Code: ${status}`);
            console.error(`   Error: ${errorMessage}`);
            console.error(`   URL: ${url}`);
            console.error(`${"─".repeat(60)}\n`);
            throw new Error(`Failed to send log: HTTP ${status} - ${errorMessage}`);
        }
        console.error(`❌ [LOG FAILED] Unexpected error while sending log`);
        console.error(`   Error Type: ${error.constructor.name}`);
        console.error(`   Error: ${error.message}`);
        console.error(`${"─".repeat(60)}\n`);
        throw error;
    }
};
exports.Log = Log;
//# sourceMappingURL=logger.js.map