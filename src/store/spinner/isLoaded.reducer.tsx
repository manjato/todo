import { REQUEST_FINISHED, REQUEST_STARTED } from "./isLoaded.type";

const initialState = {
  isLoaded: false,
  error: null,
};
export const requestReducer = (state = initialState, action: { type: any }) => {
  switch (action.type) {
    case REQUEST_STARTED: {
      return { ...state, isLoaded: false };
    }
    case REQUEST_FINISHED: {
      return { ...state, isLoaded: true };
    }
    default:
      return state;
  }
};
