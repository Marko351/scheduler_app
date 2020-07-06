import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../../swagger.json';

export default (app) => {
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
