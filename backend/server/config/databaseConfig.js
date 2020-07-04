import { Sequelize, DataTypes } from 'sequelize';

import { UserModel } from '../modules/Users';
import { EventModel } from '../modules/Events';

const sequelize = new Sequelize(
	process.env.DATABASE_NAME,
	process.env.DATABASE_USERNAME,
	process.env.DATABASE_PASSWORD,
	{
		dialect: 'postgres',
		port: process.env.DATABASE_PORT,
	}
);

const dbConfig = {
	User: UserModel(sequelize, DataTypes),
	Event: EventModel(sequelize, DataTypes),
};

Object.keys(dbConfig).forEach((modelName) => {
	if ('associate' in dbConfig[modelName]) {
		dbConfig[modelName].associate(dbConfig);
	}
});

dbConfig.sequelize = sequelize;
dbConfig.Sequelize = Sequelize;

// set models to be visible trough the app
const models = (req, res, next) => {
	req.models = dbConfig;
	next();
};

export { dbConfig, models };
