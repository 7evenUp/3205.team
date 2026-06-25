# Frontend

Клиентская часть приложения на React, TypeScript, Vite, Redux Toolkit Query и Tailwind CSS.

## Запуск

```bash
pnpm install
pnpm dev
```

После запуска приложение доступно по адресу `http://localhost:5173/`.

## Структура проекта

```text
frontend/
|-- public/                 # Статические файлы, которые Vite копирует как есть
|-- src/                    # Исходный код приложения
|   |-- components/         # React-компоненты экранов и виджетов
|   |-- lib/                # Небольшие общие утилиты
|   |-- redux/              # Store, RTK Query API и локальные slices
|   |-- shared/ui/          # Переиспользуемые UI-компоненты
|   |-- types/              # Общие TypeScript-типы данных
|   |-- App.tsx             # Корневой компонент интерфейса
|   |-- main.tsx            # Точка входа React-приложения
|   `-- index.css           # Глобальные стили и подключение Tailwind
|-- index.html              # HTML-шаблон Vite
|-- package.json            # Скрипты, зависимости и метаданные пакета
|-- pnpm-lock.yaml          # Зафиксированные версии зависимостей
|-- vite.config.ts          # Конфигурация Vite
|-- eslint.config.js        # Конфигурация ESLint
|-- .prettierrc             # Конфигурация Prettier
`-- tsconfig*.json          # Конфигурации TypeScript
```

## Основные файлы и папки

### `public/`

- `favicon.png` — иконка сайта.
- `icons.svg` — SVG-спрайт или набор статических иконок.

### `src/components/`

- `CreateJobForm.tsx` — форма создания задания: принимает список URL, отправляет их на API и делает созданное задание активным.
- `JobStatus.tsx` — отображает статус задания.
- `URLStatus.tsx` — отображает статус отдельного URL.
- `Providers.tsx` — подключает Redux store к React-приложению.
- `ActiveJob/` — виджет активного задания:
  - `index.tsx` — загружает активное задание, периодически обновляет его состояние и позволяет отменить обработку.
  - `TableOfUrls.tsx` — таблица URL внутри активного задания.
- `Jobs/` — список созданных заданий:
  - `index.tsx` — получает задания с API, сортирует их и выводит список.
  - `JobItem.tsx` — строка одного задания в списке.

### `src/redux/`

- `store.ts` — создает Redux store, подключает RTK Query middleware и экспортирует типы `RootState` и `AppDispatch`.
- `hooks.ts` — типизированные хуки для работы с Redux.
- `api/core.ts` — базовая настройка RTK Query и адрес API `http://localhost:1488/api/v1`.
- `api/jobs.ts` — endpoints для заданий: список, получение по ID, создание и отмена.
- `slices/activeJob.ts` — хранит ID текущего активного задания.

### `src/shared/ui/`

- `Button.tsx` — общий компонент кнопки.
- `Popover.tsx` — общий компонент всплывающего меню на базе `@base-ui/react`.

### `src/types/`

- `job.ts` — типы задания и его статусов.
- `url.ts` — типы обработанного URL и его статусов.

### `src/lib/`

- `cn.ts` — утилита для объединения CSS-классов через `clsx` и `tailwind-merge`.
