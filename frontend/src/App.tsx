import ActiveJob from "./components/ActiveJob"
import Jobs from "./components/Jobs"
import { useAppSelector } from "./redux/hooks"

const App = () => {
  const jobId = useAppSelector((state) => state.activeJob.jobId)

  return (
    <div className="min-h-screen w-screen bg-zinc-950 text-white">
      <div className="container mx-auto bg-zinc-900 py-12 px-6">
        <header>
          <h1 className="font-medium text-2xl">
            3205.TEAM Test Task completion by 7evenUp
          </h1>
        </header>

        <main>
          <ActiveJob key={jobId} />
          <Jobs />
        </main>

        <footer className="border-t-2 border-zinc-950 mt-20 pt-6">
          Просто заглушка
        </footer>
      </div>
    </div>
  )
}

export default App
