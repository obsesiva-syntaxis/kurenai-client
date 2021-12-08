import { combineReducers } from "redux";
import { eventReducer } from "./eventReducer";
import { modalReducer } from "./modalReducer";

export const rootReducer = combineReducers({
    event: eventReducer,
    modal: modalReducer
});