import { useState } from "react"
import { Refresh } from "iconoir-react"

import URLStatus from "./URLStatus"

import { useCancelJobMutation, useGetJobByIdQuery } from "../redux/api/jobs"
import { useAppSelector } from "../redux/hooks"

const ActiveJob = () => {
  const [hasToStop, setHasToStop] = useState(false)

  const jobId = useAppSelector((state) => state.activeJob.jobId)

  const { data } = useGetJobByIdQuery(
    { jobId },
    {
      pollingInterval: hasToStop ? Infinity : 1000,
      skip: jobId.length === 0,
      refetchOnMountOrArgChange: true,
    },
  )
  const [mutate, { isUninitialized }] = useCancelJobMutation()

  if (!hasToStop) {
    const isJobFailedOrCompleted =
      data?.status === "FAILED" || data?.status === "COMPLETED"
    const isJobCancelled =
      data?.status === "CANCELLED" &&
      data.urls.every(
        (url) => url.status !== "PENDING" && url.status !== "IN_PROGRESS",
      )
    const isJobFinished = isJobFailedOrCompleted || isJobCancelled

    if (isJobFinished) {
      setHasToStop(true)
    }
  }

  const onCancelClick = async () => {
    if (!isUninitialized) return

    mutate({ jobId })
  }

  return (
    <div className="fixed z-50 bottom-10 left-10 min-w-3xl rounded-xl bg-zinc-800 shadow p-4 flex flex-col">
      {data ? (
        <>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p>{data.jobId}</p>
              <p>{data.status}</p>
              <p>{new Date(data.created_at).toLocaleString()}</p>
            </div>
            {!hasToStop && (
              <button
                className="bg-amber-800 text-amber-200 h-10 flex items-center justify-center px-4 rounded-md mt-auto"
                onClick={onCancelClick}
              >
                {!isUninitialized ? (
                  <Refresh className="animate-spin" />
                ) : (
                  "Cancel processing"
                )}
              </button>
            )}
          </div>
          <table className="mt-4">
            <tr className="bg-zinc-950 text-sm">
              <th className="p-3">STATUS</th>
              <th className="p-3">URL</th>
              <th className="p-3">STARTED</th>
              <th className="p-3">ENDED</th>
              <th className="p-3">DURATION</th>
              <th className="p-3">HTTP_STATUS</th>
              <th className="p-3">ERROR</th>
            </tr>
            {data.urls.map((url, i) => (
              <tr key={i} className="border-b border-zinc-950 text-sm">
                <td className="p-3 flex items-center justify-center">
                  <URLStatus status={url.status} />
                </td>
                <td className="p-3">{url.url}</td>
                <td className="p-3">
                  {url.started_at
                    ? new Date(url.started_at).toLocaleTimeString()
                    : "-"}
                </td>
                <td className="p-3">
                  {url.ended_at
                    ? new Date(url.ended_at).toLocaleTimeString()
                    : "-"}
                </td>
                <td className="p-3">
                  {url.duration ? `${(url.duration / 1000).toFixed(2)}s` : "-"}
                </td>
                <td className="p-3">{url.http_status ?? "-"}</td>
                <td className="p-3">{url.error ?? "-"}</td>
              </tr>
            ))}
          </table>
        </>
      ) : (
        "ActiveJob"
      )}
    </div>
  )
}

export default ActiveJob
