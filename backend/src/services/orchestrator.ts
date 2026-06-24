import { randomUUID } from "node:crypto"

import { JobModel } from "../models/job.js"
import { randomDelay } from "../utils/randomDelay.js"

const jobs = new Map<string, JobModel>()

export const jobsOrchestrator = {
  getJobById: (jobId: string) => {
    return jobs.get(jobId)
  },

  getJobs: () => {
    // массив с краткой инфой по урлам
    let jobArray = []

    for (const { jobId, created_at, status, urls } of jobs.values()) {
      jobArray.push({
        jobId,
        created_at,
        status,
        total_urls: urls.length,
        success_urls: urls.filter((url) => url.status === "SUCCESS").length,
        error_urls: urls.filter((url) => url.status === "ERROR").length,
      })
    }

    return jobArray
  },

  addJob: (urls: string[]) => {
    const currentDate = new Date().toISOString()
    const jobId = randomUUID()

    jobs.set(jobId, {
      created_at: currentDate,
      jobId,
      status: "PENDING",
      urls: urls.map((url) => ({ url, status: "PENDING" })),
    })

    return jobId
  },

  startProcessing: async (jobId: string) => {
    const job = jobs.get(jobId)

    if (!job) return

    job.status = "IN_PROGRESS"

    let nextUrlIndex = 0

    const startWorker = async () => {
      while (true) {
        const index = nextUrlIndex++

        if (index >= job.urls.length) break

        const processedURL = job.urls[index]

        if (job.status === "CANCELLED") {
          processedURL.status = "CANCELLED"
          console.log(`Cancelling url processing for ${processedURL.url}`)
          continue
        }

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

          console.log(`Finished processing ${processedURL.url}`)
          console.log(`Duration for this url is ${processedURL.duration}`)
        }
      }
    }

    const startedWorkers = Array.from({ length: 1 }, () => startWorker())

    // Ждём пока все воркеры прогонят урлы, потом уже ставим статусы для джобы
    await Promise.all(startedWorkers)

    // @ts-expect-error typescript думает, что job.status тут всегда в состоянии "IN_PROGRESS"
    if (job.status === "CANCELLED") return

    // Если хоть один урл упал ошибкой, то фейлим всю джобу
    // В ином случае джоба считается успешной
    // Состояние "CANCELED" проставляется джобе в DELETE ручке
    if (job.urls.some((url) => url.status === "ERROR")) {
      job.status = "FAILED"
    } else {
      job.status = "COMPLETED"
    }
  },

  cancelJob: (jobId: string) => {
    const job = jobs.get(jobId)

    if (!job) return

    job.status = "CANCELLED"
  },
}
