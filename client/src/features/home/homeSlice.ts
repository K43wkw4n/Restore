import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
  name: 'counter',
  initialState: {
    fullscreen : false,
  },
  reducers: {
    setScreen: (state) => { state.fullscreen = !state.fullscreen}, 
  }
})

export const { setScreen } = homeSlice.actions