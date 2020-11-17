"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDelete = exports.uploadFolder = void 0;
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
exports.uploadFolder = path_1.default.join(__dirname, '..', 'images');
if (!fs_1.default.existsSync(exports.uploadFolder)) {
    fs_1.default.mkdirSync(exports.uploadFolder);
}
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, exports.uploadFolder);
    },
    filename: function (req, file, cb) {
        var fileName = file.originalname.toLowerCase().split(" ").join("-");
        cb(null, Date.now() + "-" + fileName);
    },
});
exports.handleDelete = function (filename) {
    var imagePath = path_1.default.join(exports.uploadFolder, filename);
    if (fs_1.default.existsSync(imagePath)) {
        fs_1.default.unlinkSync(imagePath);
    }
};
exports.default = multer_1.default({ storage: storage });
