import * as actions from '../actions'
import { createAction, createReducer } from '@reduxjs/toolkit'

const addCount = createAction('ADD_COUNT')
const subCount = createAction('SUB_COUNT')
const multiCount = createAction('MULTI_COUNT')

const defaultState = {
  count: 0
}

export default createReducer(defaultState, {
  [addCount]: (state, action) => actions.handleAddCount(state, action),
  [subCount]: (state, action) => actions.handleSubCount(state, action),
  [multiCount]: (state, action) => actions.handleMultiCount(state, action)
})
