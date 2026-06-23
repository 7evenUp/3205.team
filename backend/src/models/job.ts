import * as z from "zod"

import { URLSchema } from "./url.js"

export const JobSchema = z.object({
  jobId: z.string(),
  status: z.enum([
    "PENDING",
    "IN_PROGRESS",
    "COMPLETED",
    "FAILED",
    "CANCELLED",
  ]),
  created_at: z.iso.datetime(),
  urls: z.array(URLSchema),
})
export const JobPayloadSchema = z.object({
  urls: z.array(z.httpUrl()).min(1),
})
export type JobModel = z.infer<typeof JobSchema>
