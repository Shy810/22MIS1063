import axios, { AxiosError } from "axios";
import { getEnvConfig } from "./auth";
import { validateLogParams } from "./validator";
import { LOG_ENDPOINT } from "./constants";
import { Stack, Level, Package, LogRequestBody, LogSuccessResponse } from "./types";

export const Log = async (
  stack: string,
  level: string,
  pkg: string,
  message: string
): Promise<LogSuccessResponse> => {
  validateLogParams(stack, level, pkg, message);

  const { BASE_URL, ACCESS_TOKEN } = getEnvConfig();

  const requestBody: LogRequestBody = {
    stack: stack as Stack,
    level: level as Level,
    package: pkg as Package,
    message,
  };

  const url = `${BASE_URL}${LOG_ENDPOINT}`;

  try {
    const response = await axios.post<LogSuccessResponse>(url, requestBody, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log(
      `✅ [LOG SUCCESS] [${stack.toUpperCase()}] [${level.toUpperCase()}] [${pkg}] - ${message}`
    );
    console.log(`   Log ID: ${response.data.logID}`);
    console.log(`   Server Response: ${response.data.message}`);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error.response?.status ?? "N/A";
      const errorMessage =
        error.response?.data?.message ?? error.message;

      console.error(
        `❌ [LOG FAILED] [${stack.toUpperCase()}] [${level.toUpperCase()}] [${pkg}] - ${message}`
      );
      console.error(`   Status Code: ${status}`);
      console.error(`   Error: ${errorMessage}`);

      throw new Error(
        `Failed to send log: HTTP ${status} - ${errorMessage}`
      );
    }

    console.error(
      `❌ [LOG FAILED] Unexpected error while sending log.`
    );
    console.error(`   Error: ${(error as Error).message}`);

    throw error;
  }
};
