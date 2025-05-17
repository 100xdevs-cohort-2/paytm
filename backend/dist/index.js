"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Ienv_1 = __importDefault(require("./Ienv"));
const connect_1 = __importDefault(require("./connect"));
const mainRoutes_1 = __importDefault(require("./routes/mainRoutes"));
const cors_1 = __importDefault(require("cors"));
const server = (0, express_1.default)();
const port = Ienv_1.default.PORT || "8001";
server.use((0, cors_1.default)());
server.use(express_1.default.json());
(0, connect_1.default)().then((connectMessage) => {
    console.log(connectMessage);
    server.use(mainRoutes_1.default);
    server.listen(port, () => {
        console.log("Server started on port: ", port);
    });
}).catch((e) => {
    console.log(e);
});
