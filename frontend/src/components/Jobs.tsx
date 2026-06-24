import { useMemo, useState } from "react"
import { Www } from "iconoir-react"

import { useAddJobMutation, useGetJobsQuery } from "../redux/api/jobs"

const Jobs = () => {
  const [input, setInput] = useState("")

  const {
    data: jobsData,
    isLoading: isJobsLoading,
    isError: isJobsError,
  } = useGetJobsQuery()
  const [mutate, { isLoading: isAddLoading }] = useAddJobMutation()

  const jobs = useMemo(() => {
    if (!jobsData) return []

    return jobsData
  }, [jobsData])

  const onButtonClick = async () => {
    if (isAddLoading) return

    const urls = input
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "")

    const jobId = await mutate({ urls }).unwrap()
    console.log(jobId)
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2 items-center justify-center">
        <p>Введите урлы, каждый на новой строке</p>
        <textarea
          className="p-4 rounded-md bg-zinc-800 outline-none border-0"
          value={input}
          onChange={(evt) => setInput(evt.currentTarget.value)}
        />
        <button
          className="h-10 flex items-center gap-2 justify-center rounded-md bg-white text-black px-4"
          onClick={onButtonClick}
        >
          {isAddLoading ? "Creating..." : "Create"}
        </button>
      </div>
      <div className="flex flex-col gap-1 w-full items-center justify-center">
        {isJobsLoading ? (
          <Www className="animate-spin" />
        ) : isJobsError ? (
          "Error happened"
        ) : jobs.length === 0 ? (
          "No jobs created yet"
        ) : (
          jobs.map((job) => (
            <div className="p-4 w-full rounded-lg bg-zinc-800" key={job.jobId}>
              jobId: {job.jobId}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Jobs
