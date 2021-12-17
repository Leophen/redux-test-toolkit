import * as actions from '../actions'
import { createAction, createReducer, createSlice } from '@reduxjs/toolkit'

export const addCount = createAction('ADD_COUNT')
export const subCount = createAction('SUB_COUNT')
export const multiCount = createAction('MULTI_COUNT')

const defaultState = {
  count: 0
}

const counter = createReducer(defaultState, {
  [addCount]: (state, action) => actions.handleAddCount(state, action),
  [subCount]: (state, action) => actions.handleSubCount(state, action),
  [multiCount]: (state, action) => actions.handleMultiCount(state, action)
})

// const c2 = createSlice({
//   name: 'counter',
//   initialState: defaultState,
//   reducers: {
//     addCount: (state, action) => actions.handleAddCount(state, action),
//     subCount: (state, action) => actions.handleSubCount(state, action),
//     multiCount: (state, action) => actions.handleMultiCount(state, action)
//   }
// })

export default counter
