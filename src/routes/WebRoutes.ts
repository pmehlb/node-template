import {Express} from "express";

export class WebRoutes {
	public static register(app: Express) {
		app.get('/', async (req, res) => {
			return res.render('index');
		})
	}
}