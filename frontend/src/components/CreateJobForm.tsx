import { useState } from "react"

import { useAddJobMutation } from "../redux/api/jobs"
import { useAppDispatch } from "../redux/hooks"
import { setActiveJob } from "../redux/slices/activeJob"

import Button from "../shared/ui/Button"

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

  const [mutate, { isLoading: isAddLoading }] = useAddJobMutation()
  const dispatch = useAppDispatch()

  const onStartClick = async () => {
    if (isAddLoading) return

    const urls = input
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "")

    const { jobId } = await mutate({ urls }).unwrap()

    dispatch(setActiveJob({ jobId }))
  }

  const onPopulateClick = () => {
    setInput(PREDEFINED_URLS.join("\n"))
  }

  return (
    <div className="flex gap-10 rounded-[48px] bg-zinc-950 p-8">
      <div className="flex flex-col items-start justify-center gap-2">
        <h2 className="text-xl font-medium">Создание задания</h2>
        <textarea
          className="min-h-40 w-sm rounded-2xl border-0 bg-zinc-900 p-4 outline-none"
          value={input}
          onChange={(evt) => setInput(evt.currentTarget.value)}
          placeholder="Введите список URL, каждый - с новой строки"
        />
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
