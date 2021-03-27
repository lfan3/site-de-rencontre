"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoModel = void 0;
var PhotoModel = /** @class */ (function () {
    function PhotoModel(userPhoto) {
        this.photo_path = userPhoto.photo_path;
        this.profilePhoto = userPhoto.is_profile;
    }
    PhotoModel.prototype.display = function () {
        console.log(this.photo_path);
    };
    return PhotoModel;
}());
exports.PhotoModel = PhotoModel;
