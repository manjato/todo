import { iTodo } from "../../interfaces/itodo";
import { ADD_TODO_ACTION, ASSIGN_TODO, MOVE_TODO_LIST, NEWS_ORDER_TODO_LIST } from "./todo.type";

export const createTodo = (newTodo: iTodo) => {
    return {
      type: ADD_TODO_ACTION,
      payload: newTodo,
    };
  };
export const reorderTodo = (type: string, todoList: Array<iTodo>) => {
  return {
    type: NEWS_ORDER_TODO_LIST,
    payload: {type, todoList}
  }
}
export const moveTodo =(typeSource:string, typeDestination:string, todoList: Array<iTodo>) => {
  return {
    type: MOVE_TODO_LIST,
    payload: {typeSource, typeDestination, todoList}
  }
}
export const assingTodo =(type:string,todo: iTodo) => {
  return {
    type: ASSIGN_TODO,
    payload: {type, todo}
  }
}