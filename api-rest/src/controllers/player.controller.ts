import { NextFunction, Request, Response } from "express"
import db from "../database"
import { QueryTypes } from "sequelize"

class PlayerController {
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
