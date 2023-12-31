import express from "express";
import { Application } from "express";
import cors from "cors";
const bodyParser = require("body-parser");

export class Server {
	private app: Application;

	constructor(private port: number) {
		this.app = express();
		this.hello(port);
		this.settings();
		this.accept();
		this.routes();
	}
	private hello(port: number): void {
		console.log(`Escuchando servidor por puerto ${port}`);
	}
	private settings(): void {
		this.app.use(cors());
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.set("port", this.port || 3000);
	}

	async listen() {
		await this.app.listen(this.app.get("port"));
	}

	private routes() {
		this.app.use(require("./routes/routes"));
	}

	private accept() {
		this.app.use(cors({
			origin: (origin, callback) => {
			  const ACCEPTED_ORIGINS = [
				'http://localhost:4200',
				'https://nanotrejo.es'
			  ]
		  
			  if (ACCEPTED_ORIGINS.includes(origin ?? '')) {
				return callback(null, true)
			  }
		  
			  if (!origin) {
				return callback(null, true)
			  }
		  
			  return callback(new Error('Not allowed by CORS'))
			}
		  }))
	}
}
