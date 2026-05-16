"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = exports.Level = exports.Stack = void 0;
var Stack;
(function (Stack) {
    Stack["BACKEND"] = "backend";
    Stack["FRONTEND"] = "frontend";
})(Stack || (exports.Stack = Stack = {}));
var Level;
(function (Level) {
    Level["DEBUG"] = "debug";
    Level["INFO"] = "info";
    Level["WARN"] = "warn";
    Level["ERROR"] = "error";
    Level["FATAL"] = "fatal";
})(Level || (exports.Level = Level = {}));
var Package;
(function (Package) {
    Package["CACHE"] = "cache";
    Package["CONTROLLER"] = "controller";
    Package["CRON_JOB"] = "cron_job";
    Package["DB"] = "db";
    Package["DOMAIN"] = "domain";
    Package["HANDLER"] = "handler";
    Package["REPOSITORY"] = "repository";
    Package["ROUTE"] = "route";
    Package["SERVICE"] = "service";
    Package["API"] = "api";
    Package["COMPONENT"] = "component";
    Package["HOOK"] = "hook";
    Package["PAGE"] = "page";
    Package["STATE"] = "state";
    Package["STYLE"] = "style";
    Package["AUTH"] = "auth";
    Package["CONFIG"] = "config";
    Package["MIDDLEWARE"] = "middleware";
    Package["UTILS"] = "utils";
})(Package || (exports.Package = Package = {}));
//# sourceMappingURL=types.js.map