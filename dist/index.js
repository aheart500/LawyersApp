"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var next_1 = __importDefault(require("next"));
var main_1 = __importDefault(require("./routes/main"));
var Models_1 = require("./Models");
// Server Initialization
var dev = process.env.NODE_ENV !== "production";
var nextApp = next_1.default({ dev: dev });
var handle = nextApp.getRequestHandler();
var app = express_1.default();
nextApp
    .prepare()
    .then(function () {
    app.use(express_1.default.json());
    app.use('/api', function (req, _, next) {
        req.Models = {
            Client: Models_1.ClientModel,
            Image: Models_1.ImageModel,
            Lawyer: Models_1.LawyerModel,
        };
        next();
    }, main_1.default);
    app.all("*", function (req, res) {
        return handle(req, res);
    });
    app.listen(3000, function () {
        console.log("App ready on port 3000");
    });
})
    .catch(function (exception) {
    console.error(exception.stack);
    process.exit(1);
});
