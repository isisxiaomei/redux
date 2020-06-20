
const defaultState = {
    inputValue: "请输入...",
    list: [
        'AAA',
        'bbb',
        'ccc',
    ]

}
export default (state=defaultState, action)=>{
    // 参数action是store.dispatch(action)推送过来的
    if (action.type === 'changeInput'){
        let newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = action.value;
        return newState;
    }
    if (action.type === 'addItem'){
        let newState = JSON.parse(JSON.stringify(state))
        newState.list.push(newState.inputValue);
        newState.inputValue = '';
        return newState;
    }
    if (action.type === 'deleteItem'){
        let newState = JSON.parse(JSON.stringify(state))
        newState.list.splice(action.value, 1)
        return newState;
    }
    return state;
}