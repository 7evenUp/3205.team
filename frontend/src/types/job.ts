import type { ProcessedURL } from "./url"

export type IJobStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED"

export interface Job {
  jobId: string
  status: IJobStatus
  created_at: string
  urls: ProcessedURL[]
}
