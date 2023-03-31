import db from "../database"

class GameBroker {
	private _currentWord = ""
	private _currentWordId = 0
	//I had the option to use setInterval (5 min), but I opt for validate the last attempt for a better performance
	// 5 min = 300,000 milliseconds
	private _lastGeneration = 0

	private generateNewWord = async () => {
		const word = await db.word.findOne({
			order: db.sequelize.random(),
			limit: 1,
			attributes: ["id", "word"],
			where: {
				used: false,
			},
		})
		this._currentWord = word?.dataValues["word"]
		this._currentWordId = word?.dataValues["id"]
		this._lastGeneration = Date.now()
	}

	attempt = async (
		playerID: string,
		word: string,
	): Promise<{
		result?: { letter: string; value: 1 | 2 | 3 }[]
		remaining_time: number
	}> => {
		if (Date.now() - this._lastGeneration >= 300_000) {
			await this.generateNewWord()
		}

		const [game] = await db.game.findOrCreate({
			where: {
				player: playerID,
				word: this._currentWordId,
			},
		})

		const countTries = await db.attempt.count({
			include: {
				model: db.game,
				where: {
					id: game.dataValues["id"],
				},
			},
		})
		if (countTries >= 5 || game.dataValues["won"]) {
			return {
				remaining_time: 300_000 - (Date.now() - this._lastGeneration),
			}
		}

		await db.attempt.create({
			try: word,
			game: game.dataValues["id"],
		})

		let result: {
			letter: string
			value: 1 | 2 | 3
		}[] = []
		if (this._currentWord === word) {
			db.game.update(
				{
					won: true,
				},
				{
					where: {
						id: game.dataValues["id"],
					},
				},
			)

			result = word.split("").map((letter) => ({ letter, value: 1 }))
		} else {
			for (let i = 0; i < word.length; i++) {
				if (this._currentWord.at(i) === word.at(i)) {
					result[i] = {
						letter: word.at(i) as string,
						value: 1,
					}
				} else if (this._currentWord.includes(word.at(i) as string)) {
					result[i] = {
						letter: word.at(i) as string,
						value: 2,
					}
				} else {
					result[i] = {
						letter: word.at(i) as string,
						value: 3,
					}
				}
			}
		}

		return {
			result,
			remaining_time: 300_000 - (Date.now() - this._lastGeneration),
		}
	}
}

export default new GameBroker()
