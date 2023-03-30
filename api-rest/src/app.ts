import { config } from "dotenv"
import express, { Express, Request, Response, NextFunction } from "express"
import helmet from "helmet"
import router from "../routes"

// Initializations
config()
const app: Express = express()

// Settings
app.set("port", process.env.PORT || 5000)

// Middlewares
app.use(helmet())
app.use(express.json())

// Routes
app.use(router)

// Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	return res.status(500).json({})
})

export default app
