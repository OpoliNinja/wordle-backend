import app from "./app"
import { authenticate } from "../database"

app.listen(app.get("port"), async () => {
	console.log("Server on port:", app.get("port"))
	await authenticate()
})
