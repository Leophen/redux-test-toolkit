# redux-test-toolkit

[Redux Toolkit](https://redux-toolkit-cn.netlify.app/) 是 Redux 官方提供的编写 Redux 逻辑的方法。它简化了大多数 Redux 任务，防止了常见错误，并使编写 Redux 应用程序变得更加容易。

**安装：**

```bash
# npm
npm install @reduxjs/toolkit

# yarn
yarn add @reduxjs/toolkit
```

## 一、configureStore

[configureStore](https://redux-toolkit-cn.netlify.app/tutorials/basic-tutorial#%E4%BB%8B%E7%BB%8D%EF%BC%9Aconfigurestore) 用于包装 *createStore*。可以组合切片 reducers、添加 Redux 中间件，集成并默认开启 [redux-thunk](https://github.com/reduxjs/redux-thunk)、Redux DevTools 扩展。

**src/store/index.js：**

```diff
- import { createStore } from 'redux'
+ import { configureStore } from '@reduxjs/toolkit'
  import reducers from './reducers/index'

- const store = createStore(reducers)
+ const store = configureStore({
+   reducer: reducers
+ })
  export default store
```

## 二、createAction()

[createAction](https://redux-toolkit-cn.netlify.app/api/createAction) 用于创建一个 `action`。可以直接传入 action type 字符串来替代 type 常量，返回 action 函数；

**src/store/reducers/counter.js：**

```diff
  import * as actions from '../actions'
- import * as actionTypes from '../actionTypes'
+ import { createAction } from '@reduxjs/toolkit'

+ export const addCount = createAction('ADD_COUNT')
+ export const subCount = createAction('SUB_COUNT')
+ export const multiCount = createAction('MULTI_COUNT')

  const defaultState = {
    count: 0
  }

  export default function counter(state = defaultState, action) {
    switch (action.type) {
-     case actionTypes.ADD_COUNT:
+     case addCount.type:
        return actions.handleAddCount(state, action)
-     case actionTypes.SUB_COUNT:
+     case subCount.type:
        return actions.handleSubCount(state, action)
-     case actionTypes.MULTI_COUNT:
+     case multiCount.type:
        return actions.handleMultiCount(state, action)
      default:
        return state
    }
  }
```

在组件中引入导出的 Action *▼*

**src/App.jsx：**

```diff
  import React from 'react'
  import './index.scss'
  import { useSelector, useDispatch } from 'react-redux'
+ import { addCount, subCount, multiCount } from './store/reducers/counter'

  const App = () => {
    const count = useSelector((state) => state.counter.count)
    const dispatch = useDispatch()

    const handleAddCount = () => {
-     dispatch({ type: 'ADD_COUNT' })
+     dispatch(addCount())
    }

    const handleSubCount = () => {
-     dispatch({ type: 'SUB_COUNT' })
+     dispatch(subCount())
    }

    const handleMultiCount = () => {
-     dispatch({ type: 'MULTI_COUNT', payload: count })
+     dispatch(multiCount(count))
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
```

## 三、createReducer()

[createReducer](https://redux-toolkit-cn.netlify.app/api/createReducer) 用于创建一个 `reducer`。将 action type 映射到 case reducer 函数中，不用再写 switch-case，而且集成的 [immer](https://github.com/mweststrate/immer) 可以编写更简单的 immutable 更新，例如 *state.todos [3] .completed = true*

**src/store/reducers/counter.js：**

```diff
  import * as actions from '../actions'
- import { createAction } from '@reduxjs/toolkit'
+ import { createAction, createReducer } from '@reduxjs/toolkit'

  export const addCount = createAction('ADD_COUNT')
  export const subCount = createAction('SUB_COUNT')
  export const multiCount = createAction('MULTI_COUNT')

  const defaultState = {
    count: 0
  }

- export default function counter(state = defaultState, action) {
-   switch (action.type) {
-     case addCount.type:
-       return actions.handleAddCount(state, action)
-     case subCount.type:
-       return actions.handleSubCount(state, action)
-     case multiCount.type:
-       return actions.handleMultiCount(state, action)
-     default:
-       return state
-   }
- }

+ const counter = createReducer(defaultState, {
+   [addCount]: (state, action) => actions.handleAddCount(state, action),
+   [subCount]: (state, action) => actions.handleSubCount(state, action),
+   [multiCount]: (state, action) => actions.handleMultiCount(state, action)
+ })

+ export default counter
```

## 四、createSlice()

[createSlice](https://redux-toolkit-cn.netlify.app/api/createSlice) 用于创建一个 `slice`。接受一个 reducer 函数的对象、分片名称和初始状态值，并自动生成具有相应 action creators 和 action 类型的分片 reducer；

因此上面的 createAction 可以进一步优化掉 *▼*

**src/store/reducers/counter.js：**

```diff
  import * as actions from '../actions'
- import { createAction, createReducer } from '@reduxjs/toolkit'
+ import { createSlice } from '@reduxjs/toolkit'

  const defaultState = {
    count: 0
  }

- export const addCount = createAction('ADD_COUNT')
- export const subCount = createAction('SUB_COUNT')
- export const multiCount = createAction('MULTI_COUNT')

- const counter = createReducer(defaultState, {
-   [addCount]: (state, action) => actions.handleAddCount(state, action),
-   [subCount]: (state, action) => actions.handleSubCount(state, action),
-   [multiCount]: (state, action) => actions.handleMultiCount(state, action)
- })

+ const counter = createSlice({
+   name: 'counter',
+   initialState: defaultState,
+   reducers: {
+     addCount: (state, action) => actions.handleAddCount(state, action),
+     subCount: (state, action) => actions.handleSubCount(state, action),
+     multiCount: (state, action) => actions.handleMultiCount(state, action)
+   }
+ })

  export default counter
```

注意 `createSlice` 创建出的 *slice* 的 reducer 属性值才是 reducer *▼*

**src/store/index.js：**

```diff
  import { combineReducers } from 'redux'
  import counter from './counter'

  export default combineReducers({
-   counter
+   counter: counter.reducer
  })
```

然后在组件中引入 *slice* 的 actions 属性值提取供 `dispatch` 使用的新 Action *▼*

**src/App.jsx：**

```diff
  import React from 'react'
  import './index.scss'
  import { useSelector, useDispatch } from 'react-redux'
- import { addCount, subCount, multiCount } from './store/reducers/counter'
+ import counter from './store/reducers/counter'

  const App = () => {
    const count = useSelector((state) => state.counter.count)
    const dispatch = useDispatch()

    const handleAddCount = () => {
-     dispatch(addCount())
+     dispatch(counter.actions.addCount())
    }

    const handleSubCount = () => {
-     dispatch(subCount())
+     dispatch(counter.actions.subCount())
    }

    const handleMultiCount = () => {
-     dispatch(multiCount(count))
+     dispatch(counter.actions.multiCount(count))
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
```

## 五、createAsyncThunk

[createAsyncThunk](https://redux-toolkit-cn.netlify.app/api/createAsyncThunk) 创建一个 `thunk`。用于处理异步 Action，接受 action type 和 payload，返回 promise，并生成一个发起基于该 promise 的 *pending/fulfilled/rejected* action 类型的 thunk；

创建 `thunk` 如下 *▼*

**src/store/reducers/counter.js：**

```diff
  import * as actions from '../actions'
- import { createSlice } from '@reduxjs/toolkit'
+ import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
+ import axios from 'axios'

  const defaultState = {
    count: 0
  }

+ export const fetchTemperature = createAsyncThunk(
+   'counter/fetchTemperature',
+   async (city) => {
+     const res = await axios.get(
+       `http://wthrcdn.etouch.cn/weather_mini?city=${city}`
+     )
+     return res.data
+   }
+ )

  const counter = createSlice({
    name: 'counter',
    initialState: defaultState,
    reducers: {
      addCount: (state, action) => actions.handleAddCount(state, action),
      subCount: (state, action) => actions.handleSubCount(state, action),
      multiCount: (state, action) => actions.handleMultiCount(state, action)
    },
+   extraReducers: {
+     [fetchTemperature.fulfilled]: (state, action) => {
+       console.log(action)
+     }
+   }
  })

  export default counter
```

注意上面创建的 `thunk` 是放在 *extraReducers* 下。使用 `thunk` 如下 *▼*

**src/App.jsx：**

```diff
  import React from 'react'
  import './index.scss'
  import { useSelector, useDispatch } from 'react-redux'
- import counter from './store/reducers/counter'
+ import counter, { fetchTemperature } from './store/reducers/counter'

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

+   const handleFetchTemperature = () => {
+     dispatch(fetchTemperature('广州'))
+   }

    return (
      <div>
        <button onClick={handleAddCount}>+1</button>
        <button onClick={handleSubCount}>-1</button>
        <button onClick={handleMultiCount}>× last</button>
+       <button onClick={handleFetchTemperature}>获取广州温度</button>
        <span>{count}</span>
      </div>
    )
  }

  export default App
```

点击“*获取广州温度*”按钮输出结果：

<img src="http://tva1.sinaimg.cn/large/0068vjfvgy1gxlgt7gc3nj319e0ki49t.jpg" width="777" referrerPolicy="no-referrer" />

## 六、createEntityAdapter

[createEntityAdapter](https://redux-toolkit-cn.netlify.app/api/createEntityAdapter) 用于生成一组可重用的 reducers 和 selectors，来管理规范化 store 数据。换句话说，就是利用所创建 *Adapter* 的 API 来操作 state。由 `createEntityAdapter` 方法生成的 entity state 结构如下：

```js
{
  // 每个对象唯一的 id（string | number）
  // 可以在 createEntityAdapter 的 selectId 中设置对象的某个属性为该 id（索引值）
  ids: [],
  // 映射的实体对象
  entities: {}
}
```

创建 *Adapter* 如下 *▼*

**src/store/reducers/counter.js：**

```diff
  import * as actions from '../actions'
- import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
+ import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
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

+ const playersAdapter = createEntityAdapter({
+   // 将数组对象中每个对象的 id 属性存放在 Adapter 的 IDs 中
+   selectId: (player) => player.id,
+   // 将 IDs 中对应的每个对象以 id 为指定规则进行排序
+   sortComparer: (a, b) => a - b
+ })

  const counter = createSlice({
    name: 'counter',
-   initialState: defaultState,
+   initialState: playersAdapter.getInitialState(defaultState),
    reducers: {
      addCount: (state, action) => actions.handleAddCount(state, action),
      subCount: (state, action) => actions.handleSubCount(state, action),
      multiCount: (state, action) => actions.handleMultiCount(state, action),
+     playerAdd: playersAdapter.addOne
    },
    extraReducers: {
      [fetchTemperature.fulfilled]: (state, action) => {
        actions.handleGetTemperature(state, action)
      }
    }
  })

  export default counter
```

### ddOne API 使用

**src/App.jsx：**

```tsx
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
```

点击效果如下：

<img src="http://tva1.sinaimg.cn/large/0068vjfvgy1gxlqvh6ojwj30si0k4jww.jpg" width="450" referrerPolicy="no-referrer" />

[点击查看更多 Adapter API](https://redux-toolkit-cn.netlify.app/api/createentityadapter/#return-value)

## 七、createSelector 组件

来自 [Reselect](https://github.com/reduxjs/reselect) 库，被重新导出，用于 state 缓存，防止不必要的计算。

举个例子：

```js
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
```

上面在 `createSelector` 的最后一个参数中进行前面参数结果的缓存处理。
