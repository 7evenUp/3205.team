import { randomUUID } from "node:crypto"

import { JobModel } from "../models/job.js"
import { randomDelay } from "../utils/randomDelay.js"

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

        if (index >= job.urls.length) break

        const processedURL = job.urls[index]

        processedURL.status = "IN_PROGRESS"
        processedURL.started_at = new Date().toISOString()

        try {
          const { ok, status, statusText } = await fetch(processedURL.url, {
            method: "HEAD",
          })

          await randomDelay()

          processedURL.http_status = status

          if (ok) {
            processedURL.status = "SUCCESS"
          } else {
            processedURL.status = "ERROR"
            processedURL.error = statusText
          }
        } catch (error) {
          await randomDelay()

          processedURL.status = "ERROR"

          if (error instanceof Error) {
            processedURL.error = error.message
          }
        } finally {
          processedURL.ended_at = new Date().toISOString()
          processedURL.duration =
            new Date(processedURL.ended_at).getTime() -
            new Date(processedURL.started_at).getTime()
        }
      }
    }

    const startedWorkers = Array.from({ length: 2 }, () => startWorker())

    // Ждём пока все воркеры прогонят урлы, потом уже ставим статусы для джобы
    await Promise.all(startedWorkers)

    // Если хоть один урл упал ошибкой, то фейлим всю джобу
    // В ином случае джоба считается успешной
    if (job.urls.some((url) => url.status === "ERROR")) {
      job.status = "FAILED"
    } else {
      job.status = "COMPLETED"
    }
  }
}
