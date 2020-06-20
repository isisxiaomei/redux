import React, { Component } from 'react';

import store from "./redux/store";
import { changeInputAction, addItemAction, deleteItemAction } from "./redux/actions/actionCreators";
import TodoListUI  from './TodoListUI'



export default class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = store.getState()
        store.subscribe(this.storeChange)
    }

    storeChange = () => {
        this.setState(store.getState());
    }

    inputChang = (e) => {
        const action = changeInputAction(e.target.value)
        store.dispatch(action)
    }

    clickBtn = () => {
        const action = addItemAction()
        store.dispatch(action)
    }

    deleteItem = (index) => {
        const action = deleteItemAction(index)
        store.dispatch(action)
    }
    render() {
        return (
            <TodoListUI
                inputValue={this.state.inputValue}
                list={this.state.list}
                inputChang={this.inputChang}
                clickBtn={this.clickBtn}
                deleteItem={this.deleteItem}
            />
        );
    }
}
