import request from "supertest"
import app from "../src/app"

describe("Get ranking", () => {
	it("GET /players/ranking should show the top 10 players", async function () {
		const res = await request(app).get("/players/ranking")
		expect(res.status).toEqual(200)
		expect(res.type).toEqual(expect.stringContaining("json"))
	})
})
