import express from "express"

import { addJob } from "./addJob.js"
import { getJobs } from "./getJobs.js"
import { getJobById } from "./getJobById.js"
import { cancelJob } from "./cancelJob.js"

const router = express.Router({ strict: true })

router.post("/v1/jobs", addJob)
router.get("/v1/jobs", getJobs)
router.get("/v1/jobs/:id", getJobById)
router.delete("/v1/jobs/:id", cancelJob)

export { router }
