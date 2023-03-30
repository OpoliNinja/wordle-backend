import { Sequelize } from "sequelize"
import gameModel from "./models/game.model"
import playerModel from "./models/player.model"
import tryModel from "./models/try.model"
import wordModel from "./models/word.model"

const db = () => {
	const sequelize = new Sequelize(
		process.env.DB_NAME || "",
		process.env.DB_USER || "",
		process.env.DB_PASS || "",
		{
			dialect: "postgres",
			host: process.env.DB_HOST,
		},
	)

	const attempt = tryModel(sequelize)
	const game = gameModel(sequelize)
	const player = playerModel(sequelize)
	const word = wordModel(sequelize)

	// Relations
	attempt.belongsTo(game)
	game.hasMany(attempt)
	game.belongsTo(word)
	game.belongsTo(player)
	word.hasMany(game)
	player.hasMany(game)

	return {
		attempt,
		game,
		word,
		player,
		auth: async () => sequelize.authenticate(),
	}
}

export default db()
