import express from "express"
import cors from "cors"

import { router } from "./router/index.js"

const app = express()

app.use(cors({ origin: "http://localhost:5173" }))
app.use(express.json())

app.use("/api", router)

app.listen(1488, () => {
  console.log(`Server was started on port: 1488`)
})
