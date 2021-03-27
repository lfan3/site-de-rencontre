"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Circle = /** @class */ (function () {
    function Circle() {
    }
    //?why static for jsonResponse
    Circle.prototype.jsonResponse = function (statusCode, message) {
        console.log(statusCode);
        console.log(message);
    };
    Circle.jsonResponse = function (statusCode, message) {
        console.log(statusCode);
        console.log(message);
    };
    Circle.prototype.clientError = function (message) {
        return this.jsonResponse(400, 'abc');
    };
    Circle.prototype.showChildeName = function () {
        return this.constructor.name;
    };
    Circle.pi = 3.14;
    return Circle;
}());
var R = /** @class */ (function (_super) {
    __extends(R, _super);
    function R(nu) {
        var _this = _super.call(this) || this;
        _this.n = nu;
        return _this;
    }
    return R;
}(Circle));
var c = new R(2);
c.showChildeName();
function printLabel(labeledObj) {
    console.log(labeledObj.label);
}
var myObj = { size: 10, label: "Size 10 Object" };
//printLabel(myObj);
