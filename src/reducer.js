import { actions } from "./constants/actions";

const initialState = {
  flashMsg: null,
  isLoginRequestInProcess: false,
  wsConnected: false,
  wsMessage: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_FLASH_MESSAGE:
    case actions.CONNECT_WS_FAILURE:
      return {
        ...state,
        flashMsg: action?.payload?.message || null,
      };

    case actions.LOGIN_REQUEST:
      return {
        ...state,
        isLoginRequestInProcess: true,
      };

    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        isLoginRequestInProcess: false,
      };

    case actions.LOGIN_FAILURE:
      return {
        ...state,
        isLoginRequestInProcess: false,
        flashMsg: action?.payload?.message || null,
      };

    case actions.SET_WS_CONNECTION_STATUS:
      return {
        ...state,
        wsConnected: action.payload.status,
      };

    case actions.SET_WS_MESSAGE:
      return {
        ...state,
        wsMessage: action.payload.message,
      };

    case actions.STOP_WEBSOCKET:
      return {
        ...state,
        wsMessage: null,
        wsConnected: false,
      };

    default:
      return state;
  }
};
