# Backend

Серверная часть приложения на Node.js, Express, TypeScript и Zod. API хранит задания в памяти процесса, принимает список URL, запускает их обработку и возвращает статус выполнения.

## Запуск

```bash
pnpm install
pnpm dev
```

Сервер запускается на `http://localhost:1488`, API доступно с префиксом `/api/v1`.

## API

- `POST /api/v1/jobs` — создает задание по списку URL и запускает обработку.
- `GET /api/v1/jobs` — возвращает список заданий с краткой статистикой.
- `GET /api/v1/jobs/:id` — возвращает полную информацию по одному заданию.
- `DELETE /api/v1/jobs/:id` — отменяет задание.

## Структура проекта

```text
backend/
|-- src/                    # Исходный код сервера
|   |-- models/             # Zod-схемы и TypeScript-типы данных
|   |-- router/             # Express router и обработчики API endpoints
|   |-- services/           # Бизнес-логика обработки заданий
|   |-- utils/              # Небольшие вспомогательные функции
|   `-- index.ts            # Точка входа сервера
|-- dist/                   # Скомпилированный JavaScript после сборки
|-- package.json            # Скрипты, зависимости и метаданные пакета
|-- pnpm-lock.yaml          # Зафиксированные версии зависимостей
|-- pnpm-workspace.yaml     # Настройка pnpm workspace для пакета
`-- tsconfig.json           # Конфигурация TypeScript
```

## Основные файлы и папки

### `src/index.ts`

Точка входа приложения. Создает Express app, включает CORS для `http://localhost:5173`, подключает JSON parser, монтирует router на `/api` и запускает сервер на порту `1488`.

### `src/router/`

- `index.ts` — собирает API routes в один Express router.
- `addJob.ts` — обрабатывает `POST /v1/jobs`: валидирует body через Zod, создает задание и запускает обработку URL.
- `getJobs.ts` — обрабатывает `GET /v1/jobs`: возвращает список всех заданий с краткой статистикой.
- `getJobById.ts` — обрабатывает `GET /v1/jobs/:id`: возвращает полные данные задания или `404`.
- `cancelJob.ts` — обрабатывает `DELETE /v1/jobs/:id`: переводит задание в статус `CANCELLED` или возвращает `404`.

### `src/services/`

- `orchestrator.ts` — хранит задания в `Map`, создает новые задания, запускает обработку URL пятью воркерами, обновляет статусы и отменяет задания.

### `src/models/`

- `job.ts` — Zod-схема задания, схема payload для создания задания и тип `JobModel`.
- `url.ts` — Zod-схема обработанного URL и тип `URLModel`.

### `src/utils/`

- `randomDelay.ts` — добавляет случайную задержку до 10 секунд при обработке URL.
