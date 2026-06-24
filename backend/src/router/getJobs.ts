import { Request, Response } from "express"

import { jobsOrchestrator } from "../services/orchestrator.js"

export const getJobs = async (_: Request, res: Response) => {
  const jobs = jobsOrchestrator.getJobs()

  res.json(jobs)
}
