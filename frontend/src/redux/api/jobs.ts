import { api } from "./core"

import type { Job } from "../../types/job"

export interface JobsResponse {
  jobId: string
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED" | "CANCELLED"
  created_at: string
  total_urls: number
  success_urls: number
  error_urls: number
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
    getJobById: build.query<Job, { jobId: string }>({
      query: ({ jobId }) => ({
        url: `jobs/${jobId}`,
        method: "GET",
      }),
    }),
    addJob: build.mutation<{ jobId: string }, { urls: string[] }>({
      query: (body) => ({
        url: "jobs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Jobs"],
    }),
    cancelJob: build.mutation<void, { jobId: string }>({
      query: ({ jobId }) => ({
        url: `jobs/${jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useAddJobMutation,
  useCancelJobMutation,
} = jobsApi
