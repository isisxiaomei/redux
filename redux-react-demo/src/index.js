import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import TodoList from './TodoList';
import store from "./redux/store";


ReactDOM.render(
  // 被provider包裹的组件及其子组件都可以获取到store
  <Provider store={store}>
    <TodoList />
  </Provider>,
  document.getElementById('root')
);

