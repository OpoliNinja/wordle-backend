import { DataTypes, Sequelize } from "sequelize"

const tryModel = (sequelize: Sequelize) =>
	sequelize.define(
		"Try",
		{
			try: {
				type: DataTypes.STRING(5),
				allowNull: false,
			},
			game: {
				type: DataTypes.NUMBER,
				allowNull: false,
			},
		},
		{
			tableName: "tries",
		},
	)

export default tryModel
