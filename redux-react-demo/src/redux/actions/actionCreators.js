import { CHANGE_INPUT, ADD_ITEM, DELETE_ITEM } from "./actionTypes";

export const changeInputAction = (value)=>{return {
    type: CHANGE_INPUT,
    value
}}

export const addItemAction = ()=>{return {
    type: ADD_ITEM,
}}

export const deleteItemAction = (value)=>{return {
    type: DELETE_ITEM,
    value
}}