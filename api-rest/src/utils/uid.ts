import { randomBytes } from "crypto"

function uid(length = 24) {
	return randomBytes(Math.ceil(length / 2))
		.toString("hex")
		.slice(0, length)
}

export default uid
