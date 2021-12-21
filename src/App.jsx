import React, { useState } from 'react'
import './index.scss'
import { useSelector, useDispatch } from 'react-redux'
import counter, { fetchTemperature } from './store/reducers/counter'

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

  const [city, setCity] = useState('')
  const handleFetchTemperature = () => {
    dispatch(fetchTemperature(city))
  }

  const temperature = useSelector((state) => state.counter.temperature)

  return (
    <>
      <div className="count-container">
        <button onClick={handleAddCount}>+1</button>
        <button onClick={handleSubCount}>-1</button>
        <button onClick={handleMultiCount}>× last</button>
        <span>{count}</span>
      </div>
      <div className="music-container">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          type="text"
        />
        <button onClick={handleFetchTemperature}>获取温度</button>
        {city && (
          <p>
            今天{city}市的温度为<span>{temperature}℃</span>.
          </p>
        )}
      </div>
    </>
  )
}

export default App
