```js
1. store必须是唯一的，并且只能有一个store
2. 只有store可以修改state，reducer是不可以修改 (store拿到reducer的返回，然后自己修改自己的state，reducer是不能修改state的，只能拷贝一份，操作完返回给store，store再修改)
3. Reducer必须是纯函数（纯函数也就是特定的输入必须有特定的输出，调用参数相同时永远返回相同的结果; 比如不能将异步请求放里面，因为并不是每次返回的结果都相同）
```