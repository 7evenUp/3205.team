import ActiveJob from "./components/ActiveJob"
import CreateJobForm from "./components/CreateJobForm"
import Jobs from "./components/Jobs"

import { useAppSelector } from "./redux/hooks"

const App = () => {
  const jobId = useAppSelector((state) => state.activeJob.jobId)

  return (
    <div className="flex min-h-screen w-screen flex-col bg-zinc-950 text-white">
      <div className="container mx-auto flex h-full flex-1 flex-col gap-10 bg-zinc-900 px-6 py-12">
        <header>
          <h1 className="text-2xl font-medium">
            3205.TEAM Test Task completion by 7evenUp
          </h1>
        </header>

        <main className="flex flex-1 flex-col gap-2">
          <ActiveJob key={jobId} />
          <CreateJobForm />
          <Jobs />
        </main>
      </div>
    </div>
  )
}

export default App
