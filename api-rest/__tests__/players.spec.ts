import request from "supertest"
import app from "../src/app"

describe("Get ranking", () => {
	it("GET /players/ranking should show the top 10 players", async function () {
		const res = await request(app).get("/players/ranking")
		expect(res.status).toEqual(200)
		expect(res.type).toEqual(expect.stringContaining("json"))
	})
})

describe("Get or create myself", () => {
	it("POST /players/me should create a new player if I the username is free", async function () {
		const payload = {
			username: "Opolitesting",
		}

		const res = await request(app)
			.post("/players/me")
			.send(payload)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")

		expect(res.status).toEqual(201)
		expect(res.body).toMatchObject({
			username: "Opolitesting",
			isNew: true,
			guest: false,
		})
	})

	it("POST /players/me should get an already created player", async function () {
		const payload = {
			username: "Opolitesting",
		}

		const res = await request(app)
			.post("/players/me")
			.send(payload)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")

		expect(res.status).toEqual(200)
		expect(res.body).toMatchObject({
			username: "Opolitesting",
			isNew: false,
			guest: false,
		})
	})

	it("POST /players/me should create an guest profile if it doesn't receive an username", async function () {
		const res = await request(app)
			.post("/players/me")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")

		expect(res.status).toEqual(201)
		expect(res.body).toMatchObject({
			isNew: true,
			guest: true,
		})
	})
})
