"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOG_ENDPOINT = exports.SHARED_PACKAGES = exports.FRONTEND_PACKAGES = exports.BACKEND_PACKAGES = void 0;
const types_1 = require("./types");
exports.BACKEND_PACKAGES = new Set([
    types_1.Package.CACHE,
    types_1.Package.CONTROLLER,
    types_1.Package.CRON_JOB,
    types_1.Package.DB,
    types_1.Package.DOMAIN,
    types_1.Package.HANDLER,
    types_1.Package.REPOSITORY,
    types_1.Package.ROUTE,
    types_1.Package.SERVICE,
]);
exports.FRONTEND_PACKAGES = new Set([
    types_1.Package.API,
    types_1.Package.COMPONENT,
    types_1.Package.HOOK,
    types_1.Package.PAGE,
    types_1.Package.STATE,
    types_1.Package.STYLE,
]);
exports.SHARED_PACKAGES = new Set([
    types_1.Package.AUTH,
    types_1.Package.CONFIG,
    types_1.Package.MIDDLEWARE,
    types_1.Package.UTILS,
]);
exports.LOG_ENDPOINT = "/logs";
//# sourceMappingURL=constants.js.map