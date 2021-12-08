import { types } from '../config/types';

export const modalState = (event) => ({
    type: types.modalState,
    payload: event
});