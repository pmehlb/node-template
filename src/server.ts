import express from "express";
import path from "path";
import morgan from "morgan";
import bodyParser from "body-parser";
import {WebRoutes} from "./routes/WebRoutes";

export async function start() {
	let port = parseInt(process.env.PORT as string) || 3000;
	let hostname = process.env.HOSTNAME || "127.0.0.1";
	let server = express();
	// use body parser
	server.use(bodyParser.urlencoded({extended: true}));
	server.use(bodyParser.json());
	
	// FIX FOR DEVELOPMENT: calls to `localhost` are now routed through ipv6 as of Node v17
	if (process.env.ENVIRONMENT === 'development') {
		const dns = require('node:dns');
		dns.setDefaultResultOrder('ipv4first');
	}
	// use Morgan for logging
	server.use(morgan(":remote-addr :method :url HTTP/:http-version :status :res[content-length] - :response-time ms"));
	
	// use EJS
	server.set('view engine', 'ejs');
	server.set('views', path.join(__dirname, "views"));
	// use `/public` directory for static files
	server.use(express.static(path.join(__dirname, "public")));
	
	WebRoutes.register(server);
	
	server.listen(port, hostname, () => {
		console.log(`Server listening @ ${hostname}:${port}.`);
	});
}