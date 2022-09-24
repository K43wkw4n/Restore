import { createSlice } from '@reduxjs/toolkit'

export const testSlice = createSlice({
  name: 'testRTk',
  initialState: {
    myname: "555555555555"
  },
  reducers: {
    incre6: state => { state.myname += "111111111111" },
    decre7: state => { state.myname += "333333333333" },
  }
})

export const { incre6, decre7 } = testSlice.actions