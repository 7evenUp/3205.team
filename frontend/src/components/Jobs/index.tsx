import { useMemo, useState } from "react"
import { Check, NavArrowDown, Www } from "iconoir-react"

import JobItem from "./JobItem"

import { useGetJobsQuery } from "../../redux/api/jobs"

import Button from "../../shared/ui/Button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../shared/ui/Popover"

import { cn } from "../../lib/cn"

const Jobs = () => {
  const [sortType, setSortType] = useState<"asc" | "desc">("desc")

  const {
    data: jobsData,
    isLoading: isJobsLoading,
    isError: isJobsError,
  } = useGetJobsQuery(undefined, { pollingInterval: 5000 })

  const jobs = useMemo(() => {
    if (!jobsData) return []

    return [...jobsData].sort((a, b) => {
      const aTime = new Date(a.created_at).getTime()
      const bTime = new Date(b.created_at).getTime()

      return sortType === "asc" ? aTime - bTime : bTime - aTime
    })
  }, [jobsData, sortType])

  return (
    <div className="flex flex-col items-center justify-center rounded-[48px] bg-zinc-950 p-8">
      <div className="mb-4 flex w-full items-center justify-between">
        <h2 className="self-start text-left text-2xl font-medium">
          Список заданий ({jobs.length})
        </h2>
        <Popover>
          <PopoverTrigger
            className="group"
            render={
              <Button>
                {sortType === "desc"
                  ? "От новых к старым"
                  : "От старых к новым"}
                <NavArrowDown className="transition-transform group-data-popup-open:rotate-180" />
              </Button>
            }
          />
          <PopoverContent>
            <Button
              className="grid grid-cols-[24px_1fr]"
              onClick={() => setSortType("desc")}
            >
              <Check className={cn(sortType === "asc" && "invisible")} />
              От новых к старым
            </Button>
            <Button
              className="grid grid-cols-[24px_1fr]"
              onClick={() => setSortType("asc")}
            >
              <Check className={cn(sortType === "desc" && "invisible")} />
              От старых к новым
            </Button>
          </PopoverContent>
        </Popover>
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
