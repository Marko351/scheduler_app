export default (app) => {
	app.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate'); // HTTP 1.1.
		res.setHeader('Pragma', 'no-cache'); // HTTP 1.0.
		res.setHeader('Expires', '0'); // Proxies.
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept, Authorization'
		);
		if (req.method === 'OPTIONS') {
			res.header(
				'Access-Control-Allow-Methods',
				'PUT, POST, PATCH, DELETE, GET'
			);
			return res.status(200).json({});
		}
		next();
	});
};
