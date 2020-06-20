import React from 'react';



const  TodoListUI = (props) => {
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

export default TodoListUI;


