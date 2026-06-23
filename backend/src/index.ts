import express from "express"
import { randomUUID } from "node:crypto"

import { JobModel } from "./models/job.js"

const jobs = new Map<string, JobModel>()

const app = express()

app.use(express.json())

app.post("/api/v1/jobs", async (req, res) => {
  const urls = req.body.urls as string[]
  const currentDate = new Date().toISOString()
  const randomJobId = randomUUID()

  jobs.set(randomJobId, {
    created_at: currentDate,
    jobId: randomJobId,
    status: "PENDING",
    urls,
  })

  res.json({ jobId: randomJobId })
})

app.get("/api/v1/jobs", (_, res) => {
  res.json(Object.fromEntries(jobs))
})

app.listen(1488, () => {
  console.log(`Server was started on port: 1488`)
})
