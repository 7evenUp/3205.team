import { useMemo } from "react"
import { Www } from "iconoir-react"

import { useGetJobsQuery } from "../../redux/api/jobs"

import Button from "../../shared/ui/Button"

import JobItem from "./JobItem"

const Jobs = () => {
  const {
    data: jobsData,
    isLoading: isJobsLoading,
    isError: isJobsError,
  } = useGetJobsQuery(undefined, { pollingInterval: 5000 })

  const jobs = useMemo(() => {
    if (!jobsData) return []

    return jobsData
  }, [jobsData])

  return (
    <div className="flex flex-col items-center justify-center rounded-[48px] bg-zinc-950 p-8">
      <div className="mb-4 flex w-full items-center justify-between">
        <h2 className="self-start text-left text-2xl font-medium">
          Список заданий ({jobs.length})
        </h2>
        <Button>От старых к новым</Button>
      </div>
      {isJobsLoading ? (
        <Www className="animate-spin" />
      ) : isJobsError ? (
        "Error happened"
      ) : jobs.length === 0 ? (
        "No jobs created yet"
      ) : (
        <div className="flex w-full flex-col gap-1">
          {jobs.map((job) => (
            <JobItem key={job.jobId} {...job} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Jobs
