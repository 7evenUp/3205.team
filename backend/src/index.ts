import express from "express"
import { randomUUID } from "node:crypto"
import * as z from "zod"

import { JobModel, JobPayloadSchema } from "./models/job.js"

const jobs = new Map<string, JobModel>()

const app = express()

app.use(express.json())

app.post("/api/v1/jobs", async (req, res, next) => {
  try {
    const { urls } = JobPayloadSchema.parse(req.body)

    const currentDate = new Date().toISOString()
    const randomJobId = randomUUID()

    jobs.set(randomJobId, {
      created_at: currentDate,
      jobId: randomJobId,
      status: "PENDING",
      urls,
    })

    res.json({ jobId: randomJobId })
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: err.issues })
      return
    }

    if (err instanceof Error) {
      res.status(400).json({ message: err.message })
      return
    }

    res.status(502).json({ message: "Unknown error" })
  }
})

app.get("/api/v1/jobs", (_, res) => {
  res.json(Object.fromEntries(jobs))
})

app.listen(1488, () => {
  console.log(`Server was started on port: 1488`)
})
