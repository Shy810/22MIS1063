import dotenv from "dotenv";
import path from "path";
import { EnvConfig } from "./types";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export const getEnvConfig = (): EnvConfig => {
  const BASE_URL = process.env.BASE_URL;
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

  if (!BASE_URL || BASE_URL.trim().length === 0) {
    throw new Error(
      "Missing environment variable: BASE_URL is not defined in .env file."
    );
  }

  if (!ACCESS_TOKEN || ACCESS_TOKEN.trim().length === 0) {
    throw new Error(
      "Missing environment variable: ACCESS_TOKEN is not defined in .env file."
    );
  }

  return {
    BASE_URL: BASE_URL.trim(),
    ACCESS_TOKEN: ACCESS_TOKEN.trim(),
  };
};
