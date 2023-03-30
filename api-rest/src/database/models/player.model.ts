import { DataTypes, Sequelize } from "sequelize"

const playerModel = (sequelize: Sequelize) =>
	sequelize.define(
		"Player",
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			guest: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
		},
		{
			tableName: "players",
		},
	)

export default playerModel
