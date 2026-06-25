import {
  CheckCircleSolid,
  EvPlugXmark,
  Hourglass,
  PauseSolid,
  XmarkCircleSolid,
} from "iconoir-react"

import type { IJobStatus } from "../types/job"

import { cn } from "../lib/cn"

const JobStatus = ({ status }: { status: IJobStatus }) => {
  return (
    <p
      className={cn(
        "flex items-center gap-2 text-sm font-medium",
        status === "PENDING" && "text-white",
        status === "IN_PROGRESS" && "text-cyan-300",
        status === "COMPLETED" && "text-green-500",
        status === "FAILED" && "text-orange-500",
        status === "CANCELLED" && "text-yellow-200"
      )}
    >
      {status === "PENDING" ? (
        <PauseSolid className="size-5" />
      ) : status === "IN_PROGRESS" ? (
        <Hourglass className="size-5 animate-spin" />
      ) : status === "COMPLETED" ? (
        <CheckCircleSolid className="size-5" />
      ) : status === "FAILED" ? (
        <XmarkCircleSolid className="size-5" />
      ) : (
        <EvPlugXmark className="size-5" />
      )}
      {status}
    </p>
  )
}

export default JobStatus
