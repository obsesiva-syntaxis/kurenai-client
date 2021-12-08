import { types } from '../config/types';

const initialState = {
    state: false
}

export const modalReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.modalState:
            return {
                state: action.payload
            }
        default:
            return state;
    }
}