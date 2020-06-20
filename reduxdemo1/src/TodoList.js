import React, { Component } from 'react';
import { Input, List, Button } from 'antd'
import "antd/dist/antd.css";

import store from "./redux/store";



class TodoList extends Component {
    constructor(props) {
        super(props)
        // store.getState()可以获取托管在store中的reducer中管理的state对象
        this.state = store.getState()

        // 这里需要订阅store，这样state发生了变化，就会调用订阅的函数，我们可以在订阅的函数中获取心得state
        store.subscribe(this.storeChange)
    }

    storeChange = ()=>{
        this.setState(store.getState());
    }

    inputChang = (e) => {
        const action = {
            type: 'changeInput',
            value: e.target.value
        }
        // action是一个对象拿到组件的值，然后store.dispatch(action)直接将action推送到reducer中
        store.dispatch(action)
    }

    clickBtn = ()=>{
        const action = {
            type: 'addItem',
        }
        store.dispatch(action)
    }

    deleteItem = (index)=>{
        const action = {
            type: 'deleteItem',
            value: index
        }
        store.dispatch(action)
    }
    
    render() {
        return (
            <div style={{ margin: 20 }}>
                <Input
                    value={this.state.inputValue}
                    style={{ width: 200, marginRight: 20 }}
                    onChange={this.inputChang}
                />
                <Button type="primary" onClick={this.clickBtn}>add</Button>
                <div style={{ width: 300, marginTop: 20 }}>
                    <List
                        bordered
                        dataSource={this.state.list}
                        renderItem={(item, index) => <List.Item onClick={ () => this.deleteItem(index)}>{item}</List.Item>}
                    />
                </div>
            </div>);
    }
}

export default TodoList;