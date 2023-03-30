import { DataTypes, Sequelize } from "sequelize"

const gameModel = (sequelize: Sequelize) =>
	sequelize.define(
		"Game",
		{
			won: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			tableName: "games",
		},
	)

export default gameModel
