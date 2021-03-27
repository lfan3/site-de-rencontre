"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
var BaseService = /** @class */ (function () {
    function BaseService() {
    }
    //there is no use of express response in service
    //?is here any sens to declared in static?? do we need to call it even the object has not been constructed yet
    BaseService.jsonResponse = function (res, statusCode, message) {
        return res.status(statusCode).json({ message: message });
    };
    BaseService.prototype.clientError = function (res, message) {
        return BaseService.jsonResponse(res, 401, message ? message : 'some Error from client side');
    };
    BaseService.prototype.unauthorized = function (res, message) {
        return BaseService.jsonResponse(res, 401, message ? message : 'nauthorized');
    };
    BaseService.prototype.notFound = function (res, message) {
        return BaseService.jsonResponse(res, 404, message ? message : 'Not found');
    };
    BaseService.prototype.success = function (model) {
        return model;
    };
    BaseService.prototype.fail = function (error) {
        throw new Error(error);
    };
    return BaseService;
}());
exports.BaseService = BaseService;
