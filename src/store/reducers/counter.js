import * as actions from '../actions'
// import * as actionTypes from '../actionTypes'
import { createAction } from '@reduxjs/toolkit'

const addCount = createAction('ADD_COUNT')
const subCount = createAction('SUB_COUNT')
const multiCount = createAction('MULTI_COUNT')

const defaultState = {
  count: 0
}

export default function counter(state = defaultState, action) {
  switch (action.type) {
    case addCount.type:
      return actions.handleAddCount(state, action)
    case subCount.type:
      return actions.handleSubCount(state, action)
    case multiCount.type:
      return actions.handleMultiCount(state, action)
    default:
      return state
  }
}
