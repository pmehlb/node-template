process.env.TZ = 'America/New_York';

(async () => {
	// start web server
	await require('./src/server.ts').start();
})();