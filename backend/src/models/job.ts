export interface JobModel {
  jobId: string
  status: "PENDING" | "IN_PROGRESS" | "SUCCESS" | "ERROR" | "CANCELLED"
  created_at: string
  urls: string[]
}
