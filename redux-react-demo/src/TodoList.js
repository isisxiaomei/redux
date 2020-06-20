import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeInputAction, addItemAction, deleteItemAction } from "./redux/actions/actionCreators";
import { Input, List, Button } from 'antd'
import "antd/dist/antd.css";



const TodoList = (props) => {
    return (
        <div style={{ margin: 20 }}>
            <Input
                value={props.inputValue}
                style={{ width: 200, marginRight: 20 }}
                onChange={props.inputChang}
            />
            <Button type="primary" onClick={props.clickBtn}>add</Button>
            <div style={{ width: 300, marginTop: 20 }}>
                <List
                    bordered
                    dataSource={props.list}
                    renderItem={(item, index) => <List.Item onClick={() => props.deleteItem(index)}>{item}</List.Item>}
                />
            </div>
        </div>

    );
};

// stateToProps: 将state转为props，返回的对象就是props；
// 本质：输入逻辑-->外部的数据（即state对象）如何转换为 UI 组件的参数
const stateToProps = (state) => {
    // 相当于返回了props对象, props对象中的的值从state中获取
    return {
        inputValue: state.inputValue,
        list: state.list
    }
}


// dispatchToProps函数返回一个对象，对象里面的方法都是UI组件的参数(这个一般都是ui组件上的事件)怎样发出 Action
// 本质：输出逻辑-->用户对ui组件的操作映射成Action对象，从 UI 组件传出去
const dispatchToProps = (dispatch) => {
    return {
        inputChang: (e) => {
            const action = changeInputAction(e.target.value)
            dispatch(action)
        },
        clickBtn: () => {
            const action = addItemAction()
            dispatch(action)
        },
        deleteItem: (index) => {
            const action = deleteItemAction(index)
            dispatch(action)
        }
    }
}


// connect连接组件和state的桥梁：从state获取数据放到UI组件上；从UI组件上用户的操作获取数据dispatch到reducer，最终给state
export default connect(stateToProps, dispatchToProps)(TodoList);
