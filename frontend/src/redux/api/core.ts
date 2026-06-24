import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const BASE_API_URL = "http://localhost:1488/api/v1"

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["Jobs"],
  endpoints: () => ({}),
})
