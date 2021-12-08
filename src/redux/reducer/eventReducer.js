import { types } from "../config/types";

const initialState = {
    event: '',
    eventFocus: '',
    dateFocus: ''
}

export const eventReducer = ( state = initialState, action ) => {
    switch ( action.type) {
        case types.eventFocus:
            return {
                ...state,
                eventFocus: action.payload
            }
        case types.eventDateSelected:
            return {
                ...state,
                dateFocus: action.payload
            }
    
        default:
            return state;
    }
}