import { Request, Response, NextFunction } from "express"
import db from "../database"

const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const username = req.get("Username")

	if (!username) {
		return res.status(401)
	}

	const user = await db.player.findOne({
		where: {
			username,
		},
	})

	if (!user) {
		return res.status(403)
	}

	res.locals.user = user

	next()
}

export default authMiddleware
