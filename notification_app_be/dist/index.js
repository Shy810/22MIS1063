"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const startServer = async () => {
    try {
        (0, config_1.validateConfig)();
        console.log("[SERVER] Environment configuration validated successfully");
        app_1.default.listen(config_1.config.port, () => {
            console.log(`[SERVER] Notification backend running on http://localhost:${config_1.config.port}`);
            console.log(`[SERVER] Endpoints:`);
            console.log(`  GET /health                          - Health check`);
            console.log(`  GET /api/notifications               - All notifications`);
            console.log(`  GET /api/notifications/priority?n=10 - Top N priority inbox`);
        });
    }
    catch (error) {
        console.error(`[SERVER] Failed to start: ${error.message}`);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map