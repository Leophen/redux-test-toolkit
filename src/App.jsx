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
      {/* count 操作 */}
      <div className="count-container">
        <button onClick={handleAddCount}>+1</button>
        <button onClick={handleSubCount}>-1</button>
        <button onClick={handleMultiCount}>× last</button>
        <span>{count}</span>
      </div>
      {/* temperature 操作 -> 测试 createAsyncThunk */}
      <div className="temperature-container">
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
      {/* player 操作 -> 测试 createEntityAdapter */}
      <div className="player-container">
        <button
          onClick={() =>
            dispatch(
              counter.actions.playerAdd({ id: '006', name: 'UZI' })
            )
          }
        >
          playerAdd006
        </button>
        <button
          onClick={() =>
            dispatch(
              counter.actions.playerAdd({ id: '001', name: 'clearlove' })
            )
          }
        >
          playerAdd001
        </button>
      </div>
    </>
  )
}

export default App
