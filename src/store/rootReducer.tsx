import { combineReducers } from "redux";
import { requestReducer } from "./spinner/isLoaded.reducer";
import { todoReducer } from "./todo/todo.reducer";


const rootReducer = combineReducers({
    todo: todoReducer,
    request: requestReducer
})

export default rootReducer