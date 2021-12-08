import { types } from "../config/types";

export const eventFocusAction = (event) => ({
    type: types.eventFocus,
    payload: event,
});

export const dateFocusAction = (event) => ({
    type: types.eventDateSelected,
    payload: event,
});