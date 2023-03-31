import { NextFunction, Request, Response } from "express"
import { QueryTypes } from "sequelize"
import Joi from "joi"
import db from "../database"
import uid from "../utils/uid"

class PlayerController {
	newUserSchemaRequest = Joi.object<{ username?: string }>({
		username: Joi.string().alphanum().min(3).max(30).optional(),
	})
	getMe = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { error, value } = this.newUserSchemaRequest.validate(
				req.body,
			)
			if (error) {
				return res.status(400).json(error.details)
			}

			const player = await db.player.findOrCreate({
				where: {
					username: value?.username || `Player_${uid(8)}`,
				},
				defaults: {
					guest: !value?.username,
					id: uid(23),
				},
			})

			const wins = await db.game.count({
				where: {
					player: player[0].dataValues["id"],
					won: true,
				},
			})

			const totalGames = await db.game.count({
				where: {
					player: player[0].dataValues["id"],
				},
			})

			res.status(player[1] ? 201 : 200).json({
				...player[0].dataValues,
				isNew: player[1],
				wins,
				totalGames,
			})
		} catch (err) {
			next(err)
		}
	}

	getRanking = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const ranking: { username: string; victories: number }[] =
				await db.sequelize.query(
					"SELECT p.username, count(p.username) AS victories FROM players p INNER JOIN games g ON p.id = g.player WHERE g.won = TRUE GROUP BY p.username ORDER BY victories DESC LIMIT 10",
					{ type: QueryTypes.SELECT },
				)
			res.status(200).json(ranking)
		} catch (err) {
			next(err)
		}
	}
}

export default PlayerController
