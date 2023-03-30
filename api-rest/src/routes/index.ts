import { Router } from "express"
import playerRoutes from "./player.routes"

const router = Router()

router.use("/players", playerRoutes)

export default router
