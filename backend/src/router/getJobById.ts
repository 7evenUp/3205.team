import { Request, Response } from "express"

import { jobsOrchestrator } from "../services/orchestrator.js"

export const getJobById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const jobId = req.params.id

  const job = jobsOrchestrator.getJobById(jobId)

  if (job) {
    res.json(job)
  } else {
    res.status(404).json({ message: `Job with id=${jobId} not found` })
  }
}
