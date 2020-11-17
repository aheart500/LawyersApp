"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("../config");
var upload_1 = __importStar(require("../middlewares/upload"));
var verifyToken_1 = require("../middlewares/verifyToken");
var route = express_1.Router();
route.get('/lawyers', verifyToken_1.tokenHandler, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var lawyers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.Models.Lawyer.findAll({})];
            case 1:
                lawyers = _a.sent();
                res.send(lawyers);
                return [2 /*return*/];
        }
    });
}); });
route.post('/lawyer', verifyToken_1.tokenHandler, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newLawyer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.Models.Lawyer.create(req.body)];
            case 1:
                newLawyer = _a.sent();
                res.send(newLawyer);
                return [2 /*return*/];
        }
    });
}); });
route.patch('/lawyer', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var lawyer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.Models.Lawyer.update(req.body.lawyer, { where: { id: req.body.LawyerId } })];
            case 1:
                lawyer = _a.sent();
                res.send(lawyer);
                return [2 /*return*/];
        }
    });
}); });
route.delete('/lawyer/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var lawyer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.Models.Lawyer.destroy({ where: { id: req.params.id } })];
            case 1:
                lawyer = _a.sent();
                res.send(lawyer);
                return [2 /*return*/];
        }
    });
}); });
route.delete('/client/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.Models.Client.destroy({ where: { id: req.params.id } })];
            case 1:
                client = _a.sent();
                res.send(client);
                return [2 /*return*/];
        }
    });
}); });
route.patch('/client', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.Models.Client.update(req.body.client, { where: { id: req.body.ClientId } })];
            case 1:
                client = _a.sent();
                res.send(client);
                return [2 /*return*/];
        }
    });
}); });
route.post('/client', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newClient;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.Models.Client.create(__assign(__assign({}, req.body.clientData), { LawyerId: req.body.LawyerId }))];
            case 1:
                newClient = _a.sent();
                res.send(newClient);
                return [2 /*return*/];
        }
    });
}); });
route.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password;
    return __generator(this, function (_b) {
        _a = req.body, username = _a.username, password = _a.password;
        if (username === 'rollawer' && password === '123456789') {
            res.send(jsonwebtoken_1.default.sign(username, config_1.SECRET));
        }
        else {
            res.status(401).send("Access Denied");
        }
        return [2 /*return*/];
    });
}); });
route.post('/image', upload_1.default.single('image'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var image;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.Models.Image.create({ ClientId: req.body.ClientId, path: req.file.filename })];
            case 1:
                image = _a.sent();
                res.send(image);
                return [2 /*return*/];
        }
    });
}); });
route.delete('/image/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var image;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.Models.Image.findOne({ where: { id: req.params.id } })];
            case 1:
                image = _a.sent();
                upload_1.handleDelete(image._attributes.path);
                return [4 /*yield*/, image.destroy()];
            case 2:
                _a.sent();
                res.send('Done');
                return [2 /*return*/];
        }
    });
}); });
route.get('/:slug', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var lawyer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.Models.Lawyer.findOne({ where: { slug: req.params.slug }, include: {
                        model: req.Models.Client,
                        attributes: ['name', 'fees', 'date', 'code']
                    } })];
            case 1:
                lawyer = _a.sent();
                res.send(lawyer);
                return [2 /*return*/];
        }
    });
}); });
route.get('/:lawyerSlug/:clientCode', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, lawyerSlug, clientCode, client;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, lawyerSlug = _a.lawyerSlug, clientCode = _a.clientCode;
                return [4 /*yield*/, req.Models.Client.findOne({
                        where: { code: clientCode },
                        include: [{
                                model: req.Models.Lawyer,
                                attributes: ['name'],
                                where: { slug: lawyerSlug },
                            }, {
                                model: req.Models.Image
                            }]
                    })];
            case 1:
                client = _b.sent();
                res.send(client);
                return [2 /*return*/];
        }
    });
}); });
exports.default = route;
