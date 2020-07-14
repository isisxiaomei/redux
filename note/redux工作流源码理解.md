# 1 redux基本函数源码
## 1.1 Redux.createSotre
+ `createSotre`函数最终返回对象`store`，包含`dispatch、subscribe、getState、replaceReducer`等方法
```js
// 省略了若干代码
export default function createStore(reducer, preloadedState, enhancer) {
    // 省略参数校验和替换
    // 当前的 reducer 函数
    let currentReducer = reducer
    // 当前state
    let currentState = preloadedState
    // 当前的监听数组函数
    let currentListeners = []
    // 下一个监听数组函数
    let nextListeners = currentListeners
    // 是否正在dispatch中
    let isDispatching = false

    // 为了实现实时性，所以这里用了两个数组来分别处理dispatch事件和接收subscribe事件
    function ensureCanMutateNextListeners() {
        if (nextListeners === currentListeners) {
        nextListeners = currentListeners.slice()
        }
    }
    function getState() {
        return currentState
    }
    function subscribe(listener) {}
    function dispatch(action) {}
    function replaceReducer(nextReducer) {}
    function observable() {}
    // ActionTypes.INIT @@redux/INITu.v.d.u.6.r
    dispatch({ type: ActionTypes.INIT })
    return {
        dispatch,
        subscribe,
        getState,
        replaceReducer,
        [$observable]: observable
    }
}
```
## 1.2 store.dispatch(action)
+ `store.dispatch(action)`：
  - 1. 判断action.type是否存在；
  - 2. 执行reducer并更新store的当前状态
  - 3. 遍历调用监听函数
  - 4. 返回当前action
+ isDispatch的处理确定了只能单线程派发，多线程可能存在问题（不知道对不对，个人想法，有待验证 // todo??? ）
```js
function dispatch(action) {
    // 判断action是否是对象，不是则报错
    if (!isPlainObject(action)) {
      throw new Error(
        'Actions must be plain objects. ' +
          'Use custom middleware for async actions.'
      )
    }
    // 判断action.type 是否存在，没有则报错
    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
          'Have you misspelled a constant?'
      )
    }
    // 不是则报错
    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }

    // 在dispatch中就执行了reducer，并且将currentState更新
    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
        // 调用完后置为 false
      isDispatching = false
    }
    // 上面的state更新，接着把收集的监听函数拿出来依次调用（一般监听函数里面都是`state = store.getState()`来更新组件自己的state）
    // currentListeners是数组存放的是监听store的函数；
    const listeners = (currentListeners = nextListeners)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }
    // 最终返回 action
    return action
}
```
## 1.3 store.getState()
+ `store.getState()`返回当前store中的state
```js
function getState() {
    // 判断正在dispatch中，则报错
    if (isDispatching) {
        throw new Error(
        'You may not call store.getState() while the reducer is executing. ' +
            'The reducer has already received the state as an argument. ' +
            'Pass it down from the top reducer instead of reading it from the store.'
        )
    }
    // 返回当前的state
    return currentState
}
```
## 1.4 store.subscribe(listener)
+ 订阅函数的主要作用是注册监听事件，然后返回取消订阅的函数，它把所有的订阅函数统一放一个数组里，只维护这个数组；`store.dispatch(action)`时遍历执行监听函数
+ `subscribe`返回一个取消订阅的函数；如果直接调用则取消订阅当前的监听函数`listener`
```js
function subscribe(listener) {
    // 订阅参数校验不是函数报错
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.')
    }
    // 正在dispatch中，报错
    if (isDispatching) {
      throw new Error(
        'You may not call store.subscribe() while the reducer is executing. ' +
          'If you would like to be notified after the store has been updated, subscribe from a ' +
          'component and invoke store.getState() in the callback to access the latest state. ' +
          'See https://redux.js.org/api-reference/store#subscribelistener for more details.'
      )
    }
    // 订阅为 true
    let isSubscribed = true

    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    // 返回一个取消订阅的函数
    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }
      // 正在dispatch中，则报错
      if (isDispatching) {
        throw new Error(
          'You may not unsubscribe from a store listener while the reducer is executing. ' +
            'See https://redux.js.org/api-reference/store#subscribelistener for more details.'
        )
      }
      // 订阅为 false
      isSubscribed = false
    // 为了实现实时性，所以这里用了两个数组来分别处理dispatch事件和接收subscribe事件
      ensureCanMutateNextListeners()
    //   找到当前监听函数
      const index = nextListeners.indexOf(listener)
    //   在数组中删除
      nextListeners.splice(index, 1)
      currentListeners = null
    }
}

function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
        nextListeners = currentListeners.slice()
    }
}
```



# 2 问题
+ isDispatch的处理确定了只能单线程派发，多线程可能存在问题


# 3. 中间件相关源码
## 3.1 Redux.applyMiddleware(...middlewares)
+ 增强版的store

## 3.2 Redux.compose(...functions)
+ 将函数串联起来

# 参考
+ https://juejin.im/post/5ee63b7d51882542fc6265ad#heading-6
+ https://tech.meituan.com/2017/07/14/redux-design-code.html