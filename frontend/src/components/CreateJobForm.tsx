import { useState } from "react"

import { useAddJobMutation } from "../redux/api/jobs"
import { useAppDispatch } from "../redux/hooks"
import { setActiveJob } from "../redux/slices/activeJob"

import Button from "../shared/ui/Button"

import { cn } from "../lib/cn"

const PREDEFINED_URLS = [
  "https://google.com",
  "https://github.com",
  "https://developers.openai.com/",
  "https://www.behance.net/",
  "https://center.yandex.cloud/",
  "https://claude.ai/",
  "https://expressjs.com/",
  "https://www.youtube.com/",
  "https://react.dev/",
  "https://leanctx.com/",
  "https://redux-toolkit.js.org/",
  "https://soundcloud.com/",
]

const CreateJobForm = () => {
  const [input, setInput] = useState("")

  const [addJob, { isLoading: isAddLoading, error }] = useAddJobMutation()
  const dispatch = useAppDispatch()

  const onStartClick = async () => {
    if (isAddLoading) return
    if (input.trim().length === 0) return

    const urls = input
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "")

    const { jobId } = await addJob({ urls }).unwrap()

    dispatch(setActiveJob({ jobId }))
  }

  const onPopulateClick = () => {
    setInput(PREDEFINED_URLS.join("\n"))
  }

  return (
    <div className="flex gap-10 rounded-[48px] bg-zinc-950 p-8">
      <div className="flex flex-col items-start justify-center gap-2">
        <h2 className="text-xl font-medium">Создание задания</h2>
        <div className="flex flex-col gap-2">
          <textarea
            className={cn(
              "min-h-40 w-sm rounded-2xl border-0 bg-zinc-900 p-4 outline-none",
              error && "bg-red-600/10 ring ring-red-600/40"
            )}
            value={input}
            onChange={(evt) => setInput(evt.currentTarget.value)}
            placeholder="Введите список URL, каждый - с новой строки"
          />
          {error && (
            <span className="max-w-sm text-sm font-medium text-red-600">
              Произошла ошибка. Убедитесь что каждый URL находится на отдельной
              строке
            </span>
          )}
        </div>
        <Button
          className="mt-2 w-full"
          onClick={onStartClick}
          isLoading={isAddLoading}
        >
          Запустить проверку
        </Button>
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-medium">Заготовки для вставки</h2>
        <p className="text-sm font-medium text-white/60">
          Лень заполнять? Вставь уже готовые URL в поле ввода
        </p>
        <Button className="mt-2" onClick={onPopulateClick}>
          Вставить
        </Button>
      </div>
    </div>
  )
}

export default CreateJobForm
