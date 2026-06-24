import { api } from "./core"

interface JobsResponse {
  jobId: string
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED" | "CANCELLED"
  created_at: string
  total_urls: number
  success_urls: number
  error_urls: number
}

interface CreateJobResponse {
  jobId: string
}

interface CreateJobPayload {
  urls: string[]
}

const jobsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getJobs: build.query<JobsResponse[], void>({
      query: () => ({
        url: "jobs",
        method: "GET",
      }),
      providesTags: ["Jobs"],
    }),
    addJob: build.mutation<CreateJobResponse, CreateJobPayload>({
      query: (body) => ({
        url: "jobs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Jobs"],
    }),
  }),
  overrideExisting: false,
})

export const { useGetJobsQuery, useAddJobMutation } = jobsApi
