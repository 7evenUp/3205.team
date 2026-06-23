import { randomUUID } from "node:crypto"

import { JobModel } from "../models/job.js"

export class Orchestrator {
  private _jobs = new Map<string, JobModel>()

  getJobById(jobId: string) {
    return this._jobs.get(jobId)
  }

  getJobs() {
    return Object.fromEntries(this._jobs)
  }

  addJob(urls: string[]) {
    const currentDate = new Date().toISOString()
    const jobId = randomUUID()

    this._jobs.set(jobId, {
      created_at: currentDate,
      jobId,
      status: "PENDING",
      urls: urls.map((url) => ({ url, status: "PENDING" })),
    })

    return jobId
  }

  async startProcessing(jobId: string) {
    const job = this.getJobById(jobId)

    if (!job) return

    job.status = "IN_PROGRESS"

    let nextUrlIndex = 0

    const startWorker = async () => {
      while (true) {
        const index = nextUrlIndex++
        const processedURL = job.urls[index]

        if (index >= job.urls.length) break

        processedURL.status = "IN_PROGRESS"
        processedURL.started_at = new Date().toISOString()

        try {
          const { ok, status, statusText } = await fetch(processedURL.url, {
            method: "HEAD",
          })

          processedURL.http_status = status

          if (ok) {
            processedURL.status = "SUCCESS"
          } else {
            processedURL.status = "ERROR"
            processedURL.error = statusText
          }
        } catch (error) {
          console.log("INSIDE CATCH BLOCK")
          console.log(error)
          processedURL.status = "ERROR"
          if (error instanceof Error) {
            processedURL.error = error.message
          }
        } finally {
          processedURL.ended_at = new Date().toISOString()
          console.log(
            "Duration is: ",
            new Date(processedURL.ended_at).getTime() -
              new Date(processedURL.started_at).getTime(),
          )
        }
      }
    }

    const startedWorkers = Array.from({ length: 1 }, () => startWorker())

    // Ждём пока все воркеры прогонят урлы, потом уже ставим статус SUCCESS у джобы
    await Promise.all(startedWorkers)

    job.status = "SUCCESS"
  }
}
