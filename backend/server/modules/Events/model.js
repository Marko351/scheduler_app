const EventModel = (sequelize, DataTypes) => {
	const Event = sequelize.define('event', {
		scheduled_at: {
			type: DataTypes.DATEONLY,
			unique: true,
		},
		subject: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.STRING,
		},
	});

	Event.associate = (models) => {
		Event.belongsTo(models.User, {
			foreignKey: 'created_by',
		});
	};

	return Event;
};

export default EventModel;
