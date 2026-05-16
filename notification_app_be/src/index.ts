import app from "./app";
import { config, validateConfig } from "./config";

const startServer = async (): Promise<void> => {
  try {
    validateConfig();
    console.log("[SERVER] Environment configuration validated successfully");

    app.listen(config.port, () => {
      console.log(`[SERVER] Notification backend running on http://localhost:${config.port}`);
      console.log(`[SERVER] Endpoints:`);
      console.log(`  GET /health                          - Health check`);
      console.log(`  GET /api/notifications               - All notifications`);
      console.log(`  GET /api/notifications/priority?n=10 - Top N priority inbox`);
    });
  } catch (error: any) {
    console.error(`[SERVER] Failed to start: ${error.message}`);
    process.exit(1);
  }
};

startServer();
