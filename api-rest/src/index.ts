import app from "./app"
import db from "./database"

app.listen(app.get("port"), async () => {
	try {
		console.log("Server on port:", app.get("port"))
		await db.auth()
		console.log("Database is successfully connected")
	} catch (err) {
		console.log("Unable to connect to the database")
	}
})
