import { useState } from "react"
import { Clock, Refresh, Xmark } from "iconoir-react"

import TableOfUrls from "./TableOfUrls"

import JobStatus from "../JobStatus"

import { useCancelJobMutation, useGetJobByIdQuery } from "../../redux/api/jobs"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { setActiveJob } from "../../redux/slices/activeJob"

import Button from "../../shared/ui/Button"

const ActiveJob = () => {
  const [hasToStop, setHasToStop] = useState(false)

  const dispatch = useAppDispatch()
  const jobId = useAppSelector((state) => state.activeJob.jobId)

  const { data } = useGetJobByIdQuery(
    { jobId },
    {
      pollingInterval: hasToStop ? Infinity : 1000,
      skip: jobId.length === 0,
      refetchOnMountOrArgChange: true,
    }
  )
  const [mutate, { isUninitialized }] = useCancelJobMutation()

  if (!hasToStop) {
    const isJobFailedOrCompleted =
      data?.status === "FAILED" || data?.status === "COMPLETED"
    const isJobCancelled =
      data?.status === "CANCELLED" &&
      data.urls.every(
        (url) => url.status !== "PENDING" && url.status !== "IN_PROGRESS"
      )
    const isJobFinished = isJobFailedOrCompleted || isJobCancelled

    if (isJobFinished) {
      setHasToStop(true)
    }
  }

  const onCloseClick = () => {
    dispatch(setActiveJob({ jobId: "" }))
  }

  const onCancelClick = async () => {
    if (!isUninitialized) return

    mutate({ jobId })
  }

  if (jobId.length === 0 || !data) return

  return (
    <div className="fixed right-10 bottom-10 z-50 flex min-w-3xl flex-col rounded-[48px] bg-zinc-800/70 p-8 shadow-2xl backdrop-blur-md">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <JobStatus status={data.status} />
            <p className="flex items-center gap-1 text-sm font-medium text-white/60">
              <Clock className="size-4" />
              {new Date(data.created_at).toLocaleTimeString()}
            </p>
          </div>
          <p className="min-w-70 text-left font-medium text-white/75">
            {data.jobId}
          </p>
          {!hasToStop && (
            <Button className="mt-4" onClick={onCancelClick}>
              {!isUninitialized ? (
                <Refresh className="animate-spin" />
              ) : (
                "Cancel processing"
              )}
            </Button>
          )}
        </div>
        <Button className="size-6 p-0" onClick={onCloseClick}>
          <Xmark />
        </Button>
      </div>
      <TableOfUrls urls={data.urls} />
    </div>
  )
}

export default ActiveJob
