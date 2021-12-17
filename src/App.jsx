import React from 'react'
import './index.scss'
import { useSelector, useDispatch } from 'react-redux'
import { addCount, subCount, multiCount } from './store/reducers/counter'

const App = () => {
  const count = useSelector((state) => state.counter.count)
  const dispatch = useDispatch()

  const handleAddCount = () => {
    dispatch(addCount())
  }

  const handleSubCount = () => {
    dispatch(subCount())
  }

  const handleMultiCount = () => {
    // dispatch({ type: 'MULTI_COUNT', payload: count })
    dispatch(multiCount(count))
  }

  return (
    <div>
      <button onClick={handleAddCount}>+1</button>
      <button onClick={handleSubCount}>-1</button>
      <button onClick={handleMultiCount}>× last</button>
      <span>{count}</span>
    </div>
  )
}

export default App
