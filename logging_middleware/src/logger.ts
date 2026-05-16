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
  console.log(`\n${"─".repeat(60)}`);
  console.log(`[LOGGER] New log request initiated`);
  console.log(`[LOGGER] Parameters | Stack: "${stack}" | Level: "${level}" | Package: "${pkg}"`);
  console.log(`[LOGGER] Message: "${message}"`);

  validateLogParams(stack, level, pkg, message);

  const { BASE_URL, ACCESS_TOKEN } = getEnvConfig();

  const requestBody: LogRequestBody = {
    stack: stack as Stack,
    level: level as Level,
    package: pkg as Package,
    message,
  };

  const url = `${BASE_URL}${LOG_ENDPOINT}`;
  console.log(`[LOGGER] Sending POST request to: ${url}`);
  console.log(`[LOGGER] Request body: ${JSON.stringify(requestBody)}`);

  try {
    const response = await axios.post<LogSuccessResponse>(url, requestBody, {
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
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error.response?.status ?? "N/A";
      const errorMessage = error.response?.data?.message ?? error.message;

      console.error(`❌ [LOG FAILED] [${stack.toUpperCase()}] [${level.toUpperCase()}] [${pkg}] - ${message}`);
      console.error(`   Status Code: ${status}`);
      console.error(`   Error: ${errorMessage}`);
      console.error(`   URL: ${url}`);
      console.error(`${"─".repeat(60)}\n`);

      throw new Error(
        `Failed to send log: HTTP ${status} - ${errorMessage}`
      );
    }

    console.error(`❌ [LOG FAILED] Unexpected error while sending log`);
    console.error(`   Error Type: ${(error as Error).constructor.name}`);
    console.error(`   Error: ${(error as Error).message}`);
    console.error(`${"─".repeat(60)}\n`);

    throw error;
  }
};
