import { Server } from "./server";
require("dotenv").config({
	path: ".env",
});

async function main() {
	const port: number = parseInt(<string>process.env.PORT, 10) || 3000;

	const serv = new Server(port);
	await serv.listen();
}

main();
