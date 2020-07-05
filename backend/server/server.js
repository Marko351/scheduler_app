import express from 'express';
import morgan from 'morgan';

import routesConfig from './config/routesConfig';
import { dbConfig, models } from './config/databaseConfig';
import headersConfig from './config/headersConfig';

const port = 5555;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(models);

//Headers config
headersConfig(app);

// Routes configuration
routesConfig(app);

// Database Configuration
dbConfig.sequelize.sync({}).then(() => {
	app.listen(port, () => {
		console.log(`App is up and running on port ${port}`);
	});
});
