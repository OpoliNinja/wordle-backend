import { Sequelize } from "sequelize"

const wordModel = (sequelize: Sequelize) =>
	sequelize.define(
		"Word",
		{},
		{
			tableName: "words",
		},
	)

export default wordModel
