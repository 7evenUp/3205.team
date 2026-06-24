import { Request, Response } from "express"

import { jobsOrchestrator } from "../services/orchestrator.js"

export const cancelJob = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const jobId = req.params.id

  const job = jobsOrchestrator.getJobById(jobId)

  if (job) {
    jobsOrchestrator.cancelJob(jobId)
    res.sendStatus(204)
  } else {
    res.status(404).json({ message: `Job with id=${jobId} not found` })
  }
}
