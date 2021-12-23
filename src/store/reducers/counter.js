import * as actions from '../actions'
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector
} from '@reduxjs/toolkit'
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

const playersAdapter = createEntityAdapter({
  // 将数组对象中每个对象的 id 属性存放在 Adapter 的 IDs 中
  selectId: (player) => player.id,
  // 将 IDs 中对应的每个对象以 id 为指定规则进行排序
  sortComparer: (a, b) => a - b
})

const testState = {
  a: 1,
  b: 2,
  c: 3
}

const addValue = createSelector(
  (state) => state.a,
  (state) => state.b,
  (state) => state.c,
  (value1, value2, value3) => value1 + value2 + value3
)

console.log(addValue(testState)) // 6

const counter = createSlice({
  name: 'counter',
  initialState: playersAdapter.getInitialState(defaultState),
  reducers: {
    addCount: (state, action) => actions.handleAddCount(state, action),
    subCount: (state, action) => actions.handleSubCount(state, action),
    multiCount: (state, action) => actions.handleMultiCount(state, action),
    playerAdd: playersAdapter.addOne
  },
  extraReducers: {
    [fetchTemperature.fulfilled]: (state, action) => {
      actions.handleGetTemperature(state, action)
    }
  }
})

export default counter
