import { createStore } from "redux";
import reducer from "../reducers";

// 将管理状态的reducer注入到store中，并生成store
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;