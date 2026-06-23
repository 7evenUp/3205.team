import * as z from "zod"

export const JobSchema = z.object({
  jobId: z.string(),
  status: z.enum(["PENDING", "IN_PROGRESS", "SUCCESS", "ERROR", "CANCELLED"]),
  created_at: z.iso.datetime(),
  urls: z.array(z.httpUrl()),
})
export const JobPayloadSchema = z.object({
  urls: z.array(z.httpUrl()).min(1),
})
export type JobModel = z.infer<typeof JobSchema>
