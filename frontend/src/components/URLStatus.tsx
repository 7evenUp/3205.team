import {
  CheckCircleSolid,
  EvPlugXmark,
  Hourglass,
  PauseSolid,
  XmarkCircleSolid,
} from "iconoir-react"

import type { IURLStatus } from "../types/url"

const URLStatus = ({ status }: { status: IURLStatus }) => {
  if (status === "PENDING") return <PauseSolid />
  if (status === "IN_PROGRESS")
    return <Hourglass className="text-cyan-300 animate-spin" />
  if (status === "SUCCESS")
    return <CheckCircleSolid className="text-green-500" />
  if (status === "ERROR")
    return <XmarkCircleSolid className="text-orange-500" />
  if (status === "CANCELLED") return <EvPlugXmark className="text-yellow-200" />
}

export default URLStatus
