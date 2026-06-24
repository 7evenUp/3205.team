import { Request, Response } from "express"
import * as z from "zod"

import { JobPayloadSchema } from "../models/job.js"
import { jobsOrchestrator } from "../services/orchestrator.js"

export const addJob = async (req: Request, res: Response) => {
  try {
    const { urls } = JobPayloadSchema.parse(req.body)

    const jobId = jobsOrchestrator.addJob(urls)

    jobsOrchestrator.startProcessing(jobId)

    res.status(201).json({ jobId })
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
}
