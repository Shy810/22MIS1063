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
    throw new Error(
      `Invalid stack: "${stack}". Valid stacks are: [${validStacks.join(", ")}]`
    );
  }
};

export const validateLevel = (level: string): void => {
  const validLevels = getEnumValues(Level);

  if (!validLevels.includes(level)) {
    throw new Error(
      `Invalid level: "${level}". Valid levels are: [${validLevels.join(", ")}]`
    );
  }
};

export const validatePackage = (pkg: string): void => {
  const validPackages = getEnumValues(Package);

  if (!validPackages.includes(pkg)) {
    throw new Error(
      `Invalid package: "${pkg}". Valid packages are: [${validPackages.join(", ")}]`
    );
  }
};

export const validateMessage = (message: string): void => {
  if (typeof message !== "string" || message.trim().length === 0) {
    throw new Error(
      "Invalid message: Message must be a non-empty string."
    );
  }
};

export const validateStackPackageCompatibility = (
  stack: string,
  pkg: string
): void => {
  const packageEnum = pkg as Package;

  if (SHARED_PACKAGES.has(packageEnum)) {
    return;
  }

  if (stack === Stack.BACKEND && FRONTEND_PACKAGES.has(packageEnum)) {
    throw new Error(
      `Invalid combination: Package "${pkg}" is a frontend-only package and cannot be used with the "${stack}" stack.`
    );
  }

  if (stack === Stack.FRONTEND && BACKEND_PACKAGES.has(packageEnum)) {
    throw new Error(
      `Invalid combination: Package "${pkg}" is a backend-only package and cannot be used with the "${stack}" stack.`
    );
  }
};

export const validateLogParams = (
  stack: string,
  level: string,
  pkg: string,
  message: string
): void => {
  validateStack(stack);
  validateLevel(level);
  validatePackage(pkg);
  validateMessage(message);
  validateStackPackageCompatibility(stack, pkg);
};
