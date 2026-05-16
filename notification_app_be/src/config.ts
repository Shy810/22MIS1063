import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export const config = {
  port: parseInt(process.env.PORT || "3001", 10),
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

export const validateConfig = (): void => {
  if (!config.baseUrl) throw new Error("BASE_URL is not defined in .env");
  if (!config.accessToken) throw new Error("ACCESS_TOKEN is not defined in .env");
  if (!config.auth.clientId) throw new Error("AUTH_CLIENT_ID is not defined in .env");
  if (!config.auth.clientSecret) throw new Error("AUTH_CLIENT_SECRET is not defined in .env");
};
