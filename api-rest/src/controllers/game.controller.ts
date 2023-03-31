import { Request, Response, NextFunction } from "express"
import Joi from "joi"
import gameBroker from "../utils/gameBroker"

class GameController {
	playSchemaRequest = Joi.object<{ user_word: string }>({
		user_word: Joi.string().length(5).required(),
	})
	play = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { value, error } = this.playSchemaRequest.validate(req.body)
			if (error) {
				return res.status(400).json(error.details)
			}

			const user = res.locals["user"]

			const response = await gameBroker.attempt(user.id, value?.user_word)

			res.status(201).json(response)
		} catch (e) {
			next(e)
		}
	}
}

export default GameController
