import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface ActiveJobState {
  jobId: string
}

const initialState: ActiveJobState = {
  jobId: "",
}

export const activeJobSlice = createSlice({
  name: "activeJob",
  initialState,
  reducers: {
    setActiveJob: (state, action: PayloadAction<{ jobId: string }>) => {
      state.jobId = action.payload.jobId
    },
  },
})

export const { setActiveJob } = activeJobSlice.actions

export default activeJobSlice.reducer
