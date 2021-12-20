import * as actions from '../actions'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const defaultState = {
  count: 0
}

export const fetchMusicInfo = createAsyncThunk(
  'counter/fetchMusicInfo',
  async (name) => {
    const res = await axios.get(
      `https://api.apiopen.top/searchMusic?name=${name}`
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
    [fetchMusicInfo.fulfilled]: (state, action) => {
      console.log(action)
    }
  }
})

export default counter
