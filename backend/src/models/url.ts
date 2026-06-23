import * as z from "zod"

export const URLSchema = z.object({
  url: z.httpUrl(),
  status: z.enum(["PENDING", "IN_PROGRESS", "SUCCESS", "ERROR", "CANCELLED"]),
  http_status: z.number().optional(),
  error: z.string().optional(),
  started_at: z.iso.datetime().optional(),
  ended_at: z.iso.datetime().optional(),
  duration: z.number().optional(),
})

export type URLModel = z.infer<typeof URLSchema>
