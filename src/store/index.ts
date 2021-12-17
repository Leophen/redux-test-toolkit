// import { createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import reducers from './reducers/index'

// const store = createStore(reducers)
const store = configureStore({
  reducer: reducers
})
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
