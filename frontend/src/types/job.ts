import type { ProcessedURL } from "./url"

export interface Job {
  jobId: string
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED" | "CANCELLED"
  created_at: string
  urls: ProcessedURL[]
}
