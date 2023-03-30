import { Sequelize } from "sequelize"
import { config } from "dotenv"
import gameModel from "./models/game.model"
import playerModel from "./models/player.model"
import tryModel from "./models/try.model"
import wordModel from "./models/word.model"
config()

const db = () => {
	const sequelize = new Sequelize(
		process.env.DB_NAME || "",
		process.env.DB_USER || "",
		process.env.DB_PASS || "",
		{
			dialect: "postgres",
			host: process.env.DB_HOST,
			define: {
				timestamps: false,
			},
		},
	)

	const attempt = tryModel(sequelize)
	const game = gameModel(sequelize)
	const player = playerModel(sequelize)
	const word = wordModel(sequelize)

	// Relations
	attempt.belongsTo(game, { foreignKey: "game" })
	game.hasMany(attempt, { foreignKey: "game" })
	game.belongsTo(word, { foreignKey: "word" })
	game.belongsTo(player, { foreignKey: "player" })
	word.hasMany(game, { foreignKey: "word" })
	player.hasMany(game, { foreignKey: "player" })

	return {
		attempt,
		game,
		word,
		player,
		auth: async () => sequelize.authenticate(),
		sequelize,
	}
}

export default db()
