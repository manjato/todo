import { TODO_ACTIVE, TODO_LIST } from "../../constantes/todoList";
import { iTodo } from "../../interfaces/itodo";
import {
  ADD_TODO_ACTION,
  ASSIGN_TODO,
  MOVE_TODO_LIST,
  NEWS_ORDER_TODO_LIST,
  REMOVE_TODO_ACTION,
} from "./todo.type";

const initialState = {
  AllTodo: TODO_LIST,
  ActiveTodo: TODO_ACTIVE,
  CompleteTodo: [],
};

export const todoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TODO_ACTION: {
      return {
        ...state,
        AllTodo: [
          ...state.AllTodo,
          {
            id: ++state.AllTodo.length,
            completed: false,
            title: action.payload,
          },
        ],
      };
    }
    case NEWS_ORDER_TODO_LIST: {
      if (action.payload.type === "AllTodo") {
        return {
          ...state,
          AllTodo: action.payload.todoList,
        };
      }
      if (action.payload.type === "ActiveTodo") {
        return {
          ...state,
          ActiveTodo: action.payload.todoList,
        };
      }
      if (action.payload.type === "CompleteTodo") {
        return {
          ...state,
          CompleteTodo: action.payload.todoList,
        };
      }
    }
    case MOVE_TODO_LIST: {
      const titleHeader: Array<string> = [
        "AllTodo",
        "ActiveTodo",
        "CompleteTodo",
      ];
      const payloadTitre: Array<string> = [
        action.payload.typeSource,
        action.payload.typeDestination,
      ];
      const type = titleHeader.filter(x => payloadTitre.indexOf(x) === -1)
      if (type[0] === "AllTodo") {
        return {
          ...state,
          ActiveTodo: action.payload.todoList.ActiveTodo,
          CompleteTodo: action.payload.todoList.CompleteTodo,
        };
      }
      if (type[0] === "ActiveTodo") {
        return {
          ...state,
          AllTodo: action.payload.todoList.AllTodo,
          CompleteTodo: action.payload.todoList.CompleteTodo,
        };
      }
      if (type[0] === "CompleteTodo") {
        return {
          ...state,
          AllTodo: action.payload.todoList.AllTodo,
          ActiveTodo: action.payload.todoList.ActiveTodo,
        };
      }
    }
    case ASSIGN_TODO: {
      if (action.payload.type === "AllTodo") {
        return {
          ...state,
          AllTodo: state.AllTodo.map((todo: any) => {
            if (todo.id === action.payload.id, 10) {
              return action.payload.todo
            } 
              return todo

          }),
        };
      }
      if (action.payload.type === "ActiveTodo") {
        return {
          ...state,
          ActiveTodo: state.ActiveTodo.map((todo: any) => {
            if (todo.id === action.payload.id, 10) {
              return action.payload.todo
            } 
              return todo

          }),
        };
      }
      if (action.payload.type === "CompleteTodo") {
        return {
          ...state,
          CompleteTodo: state.CompleteTodo.map((todo: any) => {
            if (todo.id === action.payload.id, 10) {
              return action.payload.todo
            } 
              return todo

          }),
        };
      }
    }
    default:
      return state;
  }
};
