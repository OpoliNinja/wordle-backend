import { Sequelize } from "sequelize"

const gameModel = (sequelize: Sequelize) =>
	sequelize.define(
		"Game",
		{},
		{
			tableName: "games",
		},
	)

export default gameModel
