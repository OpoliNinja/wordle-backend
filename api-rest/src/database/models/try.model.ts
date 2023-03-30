import { Sequelize } from "sequelize"

const tryModel = (sequelize: Sequelize) =>
	sequelize.define(
		"Try",
		{},
		{
			tableName: "tries",
		},
	)

export default tryModel
