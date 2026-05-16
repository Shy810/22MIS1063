"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogParams = exports.validateStackPackageCompatibility = exports.validateMessage = exports.validatePackage = exports.validateLevel = exports.validateStack = void 0;
const types_1 = require("./types");
const constants_1 = require("./constants");
const getEnumValues = (enumObj) => {
    return Object.values(enumObj);
};
const validateStack = (stack) => {
    const validStacks = getEnumValues(types_1.Stack);
    if (!validStacks.includes(stack)) {
        console.error(`[VALIDATOR] Stack validation failed | Received: "${stack}" | Expected one of: [${validStacks.join(", ")}]`);
        throw new Error(`Invalid stack: "${stack}". Valid stacks are: [${validStacks.join(", ")}]`);
    }
    console.log(`[VALIDATOR] Stack validated successfully | Value: "${stack}"`);
};
exports.validateStack = validateStack;
const validateLevel = (level) => {
    const validLevels = getEnumValues(types_1.Level);
    if (!validLevels.includes(level)) {
        console.error(`[VALIDATOR] Level validation failed | Received: "${level}" | Expected one of: [${validLevels.join(", ")}]`);
        throw new Error(`Invalid level: "${level}". Valid levels are: [${validLevels.join(", ")}]`);
    }
    console.log(`[VALIDATOR] Level validated successfully | Value: "${level}"`);
};
exports.validateLevel = validateLevel;
const validatePackage = (pkg) => {
    const validPackages = getEnumValues(types_1.Package);
    if (!validPackages.includes(pkg)) {
        console.error(`[VALIDATOR] Package validation failed | Received: "${pkg}" | Expected one of: [${validPackages.join(", ")}]`);
        throw new Error(`Invalid package: "${pkg}". Valid packages are: [${validPackages.join(", ")}]`);
    }
    console.log(`[VALIDATOR] Package validated successfully | Value: "${pkg}"`);
};
exports.validatePackage = validatePackage;
const validateMessage = (message) => {
    if (typeof message !== "string" || message.trim().length === 0) {
        console.error(`[VALIDATOR] Message validation failed | Received empty or non-string message`);
        throw new Error("Invalid message: Message must be a non-empty string.");
    }
    console.log(`[VALIDATOR] Message validated successfully | Length: ${message.length} characters`);
};
exports.validateMessage = validateMessage;
const validateStackPackageCompatibility = (stack, pkg) => {
    const packageEnum = pkg;
    if (constants_1.SHARED_PACKAGES.has(packageEnum)) {
        console.log(`[VALIDATOR] Stack-Package compatibility check passed | "${pkg}" is a shared package, valid for "${stack}" stack`);
        return;
    }
    if (stack === types_1.Stack.BACKEND && constants_1.FRONTEND_PACKAGES.has(packageEnum)) {
        console.error(`[VALIDATOR] Stack-Package compatibility failed | "${pkg}" is frontend-only, cannot use with "${stack}" stack`);
        throw new Error(`Invalid combination: Package "${pkg}" is a frontend-only package and cannot be used with the "${stack}" stack.`);
    }
    if (stack === types_1.Stack.FRONTEND && constants_1.BACKEND_PACKAGES.has(packageEnum)) {
        console.error(`[VALIDATOR] Stack-Package compatibility failed | "${pkg}" is backend-only, cannot use with "${stack}" stack`);
        throw new Error(`Invalid combination: Package "${pkg}" is a backend-only package and cannot be used with the "${stack}" stack.`);
    }
    console.log(`[VALIDATOR] Stack-Package compatibility check passed | "${pkg}" is valid for "${stack}" stack`);
};
exports.validateStackPackageCompatibility = validateStackPackageCompatibility;
const validateLogParams = (stack, level, pkg, message) => {
    console.log(`[VALIDATOR] Starting validation for log entry | Stack: "${stack}" | Level: "${level}" | Package: "${pkg}"`);
    (0, exports.validateStack)(stack);
    (0, exports.validateLevel)(level);
    (0, exports.validatePackage)(pkg);
    (0, exports.validateMessage)(message);
    (0, exports.validateStackPackageCompatibility)(stack, pkg);
    console.log(`[VALIDATOR] All validations passed successfully for log entry`);
};
exports.validateLogParams = validateLogParams;
//# sourceMappingURL=validator.js.map