# redux工作流
```js
// redux模块功能
1. action：可以通过组件的监听事件进而获取到组件的值，然后封装成一个拥有type属性的action对象
2. store：不做逻辑处理，只提供存储和运作——比如state存储和dispatch推送
3. reducer： 拿到action的值后进行相应处理，返回新的state给store，store再将自己维护的state更新
4. 组件：当组件想要使用state时，需要从store中获取，并且订阅store，这样store的state发生变化时，组件就能及时更新state
```

# 无状态组件
+ redux的无状态组件相当于是函数组件，就是没有state，什么时候可以使用state？纯UI的时可以将纯UI拆分成无状态组件，这样做可以提升性能，少了state。

# react-redux
+ react-redux优点：
```js
1. 相比较于redux，react-redux不需要再手动订阅store的状态改变；
2. react-redux可以把我们的有状态的组件可以变成无状态组件
3. 项目大时，有利于开发，复用性比较高，比如把stateToProps和dispatchToProps不同人进行开发
```