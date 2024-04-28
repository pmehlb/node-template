import {Express} from "express";

export class WebRoutes {
	public static register(app: Express) {
		app.get('/', async (req, res) => {
			return res.render('template');
		});
		app.get('/layout-fixed-sidebar', async (req, res) => {
			return res.render('layout-fixed-sidebar');
		});
	}
}