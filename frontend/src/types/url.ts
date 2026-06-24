export type IURLStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "SUCCESS"
  | "ERROR"
  | "CANCELLED"

export interface ProcessedURL {
  url: string
  status: IURLStatus
  http_status?: number
  error?: string
  started_at?: string
  ended_at?: string
  duration?: number
}
