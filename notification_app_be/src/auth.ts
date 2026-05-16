import axios from "axios";
import { config } from "./config";

let cachedToken: string = config.accessToken;
let tokenExpiry: number = 0;

export const refreshToken = async (): Promise<string> => {
  console.log("[AUTH] Refreshing access token...");

  const response = await axios.post(`${config.baseUrl}/auth`, {
    email: config.auth.email,
    name: config.auth.name,
    rollNo: config.auth.rollNo,
    accessCode: config.auth.accessCode,
    clientID: config.auth.clientId,
    clientSecret: config.auth.clientSecret,
  });

  cachedToken = response.data.access_token;
  tokenExpiry = response.data.expires_in;

  console.log(`[AUTH] Token refreshed successfully | Expires at: ${new Date(tokenExpiry * 1000).toISOString()}`);
  return cachedToken;
};

export const getValidToken = async (): Promise<string> => {
  const nowInSeconds = Math.floor(Date.now() / 1000);

  if (tokenExpiry > 0 && nowInSeconds >= tokenExpiry - 60) {
    console.log("[AUTH] Token expired or expiring soon, refreshing...");
    return await refreshToken();
  }

  if (!cachedToken) {
    return await refreshToken();
  }

  return cachedToken;
};
