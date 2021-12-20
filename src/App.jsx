import React from 'react'
import './index.scss'
import { useSelector, useDispatch } from 'react-redux'
import counter, { fetchMusicInfo } from './store/reducers/counter'

const App = () => {
  const count = useSelector((state) => state.counter.count)
  const dispatch = useDispatch()

  const handleAddCount = () => {
    dispatch(counter.actions.addCount())
  }

  const handleSubCount = () => {
    dispatch(counter.actions.subCount())
  }

  const handleMultiCount = () => {
    dispatch(counter.actions.multiCount(count))
  }

  const handleFetchMusic = () => {
    dispatch(fetchMusicInfo('黑色毛衣'))
  }

  return (
    <div>
      <button onClick={handleAddCount}>+1</button>
      <button onClick={handleSubCount}>-1</button>
      <button onClick={handleMultiCount}>× last</button>
      <button onClick={handleFetchMusic}>fetch music</button>
      <span>{count}</span>
    </div>
  )
}

export default App
