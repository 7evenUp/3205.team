export interface URLModel {
  url: string
  status: "PENDING" | "IN_PROGRESS" | "SUCCESS" | "ERROR" | "CANCELLED"
  https_status?: number
  error?: string
  started_at: string
  ended_at?: string
}
