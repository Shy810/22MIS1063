import { Stack, Level, Package } from "./types";
import {
  BACKEND_PACKAGES,
  FRONTEND_PACKAGES,
  SHARED_PACKAGES,
} from "./constants";

const getEnumValues = <T extends Record<string, string>>(enumObj: T): string[] => {
  return Object.values(enumObj);
};

export const validateStack = (stack: string): void => {
  const validStacks = getEnumValues(Stack);

  if (!validStacks.includes(stack)) {
    console.error(`[VALIDATOR] Stack validation failed | Received: "${stack}" | Expected one of: [${validStacks.join(", ")}]`);
    throw new Error(
      `Invalid stack: "${stack}". Valid stacks are: [${validStacks.join(", ")}]`
    );
  }

  console.log(`[VALIDATOR] Stack validated successfully | Value: "${stack}"`);
};

export const validateLevel = (level: string): void => {
  const validLevels = getEnumValues(Level);

  if (!validLevels.includes(level)) {
    console.error(`[VALIDATOR] Level validation failed | Received: "${level}" | Expected one of: [${validLevels.join(", ")}]`);
    throw new Error(
      `Invalid level: "${level}". Valid levels are: [${validLevels.join(", ")}]`
    );
  }

  console.log(`[VALIDATOR] Level validated successfully | Value: "${level}"`);
};

export const validatePackage = (pkg: string): void => {
  const validPackages = getEnumValues(Package);

  if (!validPackages.includes(pkg)) {
    console.error(`[VALIDATOR] Package validation failed | Received: "${pkg}" | Expected one of: [${validPackages.join(", ")}]`);
    throw new Error(
      `Invalid package: "${pkg}". Valid packages are: [${validPackages.join(", ")}]`
    );
  }

  console.log(`[VALIDATOR] Package validated successfully | Value: "${pkg}"`);
};

export const validateMessage = (message: string): void => {
  if (typeof message !== "string" || message.trim().length === 0) {
    console.error(`[VALIDATOR] Message validation failed | Received empty or non-string message`);
    throw new Error(
      "Invalid message: Message must be a non-empty string."
    );
  }

  console.log(`[VALIDATOR] Message validated successfully | Length: ${message.length} characters`);
};

export const validateStackPackageCompatibility = (
  stack: string,
  pkg: string
): void => {
  const packageEnum = pkg as Package;

  if (SHARED_PACKAGES.has(packageEnum)) {
    console.log(`[VALIDATOR] Stack-Package compatibility check passed | "${pkg}" is a shared package, valid for "${stack}" stack`);
    return;
  }

  if (stack === Stack.BACKEND && FRONTEND_PACKAGES.has(packageEnum)) {
    console.error(`[VALIDATOR] Stack-Package compatibility failed | "${pkg}" is frontend-only, cannot use with "${stack}" stack`);
    throw new Error(
      `Invalid combination: Package "${pkg}" is a frontend-only package and cannot be used with the "${stack}" stack.`
    );
  }

  if (stack === Stack.FRONTEND && BACKEND_PACKAGES.has(packageEnum)) {
    console.error(`[VALIDATOR] Stack-Package compatibility failed | "${pkg}" is backend-only, cannot use with "${stack}" stack`);
    throw new Error(
      `Invalid combination: Package "${pkg}" is a backend-only package and cannot be used with the "${stack}" stack.`
    );
  }

  console.log(`[VALIDATOR] Stack-Package compatibility check passed | "${pkg}" is valid for "${stack}" stack`);
};

export const validateLogParams = (
  stack: string,
  level: string,
  pkg: string,
  message: string
): void => {
  console.log(`[VALIDATOR] Starting validation for log entry | Stack: "${stack}" | Level: "${level}" | Package: "${pkg}"`);

  validateStack(stack);
  validateLevel(level);
  validatePackage(pkg);
  validateMessage(message);
  validateStackPackageCompatibility(stack, pkg);

  console.log(`[VALIDATOR] All validations passed successfully for log entry`);
};
