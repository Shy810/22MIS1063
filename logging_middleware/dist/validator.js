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
        throw new Error(`Invalid stack: "${stack}". Valid stacks are: [${validStacks.join(", ")}]`);
    }
};
exports.validateStack = validateStack;
const validateLevel = (level) => {
    const validLevels = getEnumValues(types_1.Level);
    if (!validLevels.includes(level)) {
        throw new Error(`Invalid level: "${level}". Valid levels are: [${validLevels.join(", ")}]`);
    }
};
exports.validateLevel = validateLevel;
const validatePackage = (pkg) => {
    const validPackages = getEnumValues(types_1.Package);
    if (!validPackages.includes(pkg)) {
        throw new Error(`Invalid package: "${pkg}". Valid packages are: [${validPackages.join(", ")}]`);
    }
};
exports.validatePackage = validatePackage;
const validateMessage = (message) => {
    if (typeof message !== "string" || message.trim().length === 0) {
        throw new Error("Invalid message: Message must be a non-empty string.");
    }
};
exports.validateMessage = validateMessage;
const validateStackPackageCompatibility = (stack, pkg) => {
    const packageEnum = pkg;
    if (constants_1.SHARED_PACKAGES.has(packageEnum)) {
        return;
    }
    if (stack === types_1.Stack.BACKEND && constants_1.FRONTEND_PACKAGES.has(packageEnum)) {
        throw new Error(`Invalid combination: Package "${pkg}" is a frontend-only package and cannot be used with the "${stack}" stack.`);
    }
    if (stack === types_1.Stack.FRONTEND && constants_1.BACKEND_PACKAGES.has(packageEnum)) {
        throw new Error(`Invalid combination: Package "${pkg}" is a backend-only package and cannot be used with the "${stack}" stack.`);
    }
};
exports.validateStackPackageCompatibility = validateStackPackageCompatibility;
const validateLogParams = (stack, level, pkg, message) => {
    (0, exports.validateStack)(stack);
    (0, exports.validateLevel)(level);
    (0, exports.validatePackage)(pkg);
    (0, exports.validateMessage)(message);
    (0, exports.validateStackPackageCompatibility)(stack, pkg);
};
exports.validateLogParams = validateLogParams;
//# sourceMappingURL=validator.js.map