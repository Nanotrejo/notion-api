"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
require("dotenv").config({
    path: ".env",
});
async function main() {
    const port = parseInt(process.env.PORT, 10) || 3000;
    const serv = new server_1.Server(port);
    await serv.listen();
}
main();
//# sourceMappingURL=index.js.map