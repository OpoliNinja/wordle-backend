import { Sequelize } from "sequelize"

const sequelize = new Sequelize(
	process.env.DB_NAME || "",
	process.env.DB_USER || "",
	process.env.DB_PASS || "",
	{
		dialect: "postgres",
		host: process.env.DB_HOST,
	},
)

const authenticate = async () => {
	try {
		await sequelize.authenticate()
		console.log("Database is successfully connected")
	} catch (err) {
		console.log("Unable to connect to the database")
		throw err
	}
}

export { authenticate, sequelize }
