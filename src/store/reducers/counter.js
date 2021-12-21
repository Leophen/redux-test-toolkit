import * as actions from '../actions'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const defaultState = {
  count: 0,
  temperature: 0
}

export const fetchTemperature = createAsyncThunk(
  'counter/fetchTemperature',
  async (city) => {
    const res = await axios.get(
      `http://wthrcdn.etouch.cn/weather_mini?city=${city}`
    )
    return res.data
  }
)

const counter = createSlice({
  name: 'counter',
  initialState: defaultState,
  reducers: {
    addCount: (state, action) => actions.handleAddCount(state, action),
    subCount: (state, action) => actions.handleSubCount(state, action),
    multiCount: (state, action) => actions.handleMultiCount(state, action)
  },
  extraReducers: {
    [fetchTemperature.fulfilled]: (state, action) => {
      actions.handleGetTemperature(state, action)
    }
  }
})

export default counter
