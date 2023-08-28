"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = require("body-parser");
class Server {
    constructor(port) {
        this.port = port;
        this.app = express_1.default();
        this.hello(port);
        this.settings();
        this.accept();
        this.routes();
    }
    hello(port) {
        console.log(`Escuchando servidor por puerto ${port}`);
    }
    settings() {
        this.app.use(cors_1.default());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.set("port", this.port || 3000);
    }
    async listen() {
        await this.app.listen(this.app.get("port"));
    }
    routes() {
        this.app.use(require("./routes/routes"));
    }
    accept() {
        this.app.use(cors_1.default({
            origin: (origin, callback) => {
                const ACCEPTED_ORIGINS = [
                    'http://localhost:4200',
                    'https://nanotrejo.es'
                ];
                if (ACCEPTED_ORIGINS.includes(origin !== null && origin !== void 0 ? origin : '')) {
                    return callback(null, true);
                }
                if (!origin) {
                    return callback(null, true);
                }
                return callback(new Error('Not allowed by CORS'));
            }
        }));
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map