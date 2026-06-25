import { CheckCircleSolid, Clock, XmarkCircleSolid } from "iconoir-react"

import JobStatus from "../JobStatus"

import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { setActiveJob } from "../../redux/slices/activeJob"
import type { JobsResponse } from "../../redux/api/jobs"

import { cn } from "../../lib/cn"

const JobItem = ({
  created_at,
  jobId,
  status,
  total_urls,
  success_urls,
  error_urls,
}: JobsResponse) => {
  const dispatch = useAppDispatch()
  const activeJobId = useAppSelector((state) => state.activeJob.jobId)

  const onJobClick = (jobId: string) => {
    dispatch(setActiveJob({ jobId }))
  }
  return (
    <button
      key={jobId}
      className={cn(
        "flex w-full justify-between gap-1 rounded-[20px] bg-zinc-900 p-4 transition-colors hover:bg-zinc-800",
        jobId === activeJobId && "pointer-events-none bg-mauve-600"
      )}
      onClick={() => onJobClick(jobId)}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <JobStatus status={status} />
          <p className="flex items-center gap-1 text-sm font-medium text-white/60">
            <Clock className="size-4" />
            {new Date(created_at).toLocaleTimeString()}
          </p>
        </div>
        <p className="min-w-70 text-left font-medium text-white/75">{jobId}</p>
      </div>

      <div className="flex gap-6">
        <div className="flex flex-col items-center">
          <span className="text-xs font-medium">URL всего</span>
          <span className="text-lg font-bold">{total_urls}</span>
        </div>
        <div className="flex flex-col items-center">
          <CheckCircleSolid className="size-4 text-green-500" />
          <span className="text-lg font-bold">{success_urls}</span>
        </div>
        <div className="flex flex-col items-center">
          <XmarkCircleSolid className="size-4 text-orange-500" />
          <span className="text-lg font-bold">{error_urls}</span>
        </div>
      </div>
    </button>
  )
}

export default JobItem
