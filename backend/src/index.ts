import express from "express"
import * as z from "zod"

import { JobPayloadSchema } from "./models/job.js"

import { Orchestrator } from "./services/orchestrator.js"

const jobsOrchestrator = new Orchestrator()

const app = express()

app.use(express.json())

app.post("/api/v1/jobs", async (req, res) => {
  try {
    const { urls } = JobPayloadSchema.parse(req.body)

    const jobId = jobsOrchestrator.addJob(urls)

    jobsOrchestrator.startProcessing(jobId)

    res.json({ jobId })
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
  res.json(jobsOrchestrator.getJobs())
})

app.listen(1488, () => {
  console.log(`Server was started on port: 1488`)
})
