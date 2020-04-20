import { put, call, takeLatest, all, take, race } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { push } from "connected-react-router";

import { actions } from "./constants/actions";
import { api } from "./api";

function initWebsocket(ws) {
  return eventChannel((emitter) => {
    ws.onopen = () => {
      emitter({
        type: actions.SET_WS_CONNECTION_STATUS,
        payload: { status: true },
      });
    };

    ws.onerror = (error) => {
      console.log(`WebSocket error`);
      console.dir(error);
    };

    ws.onclose = (e) => {
      emitter({
        type: actions.SET_WS_CONNECTION_STATUS,
        payload: { status: false },
      });

      if (localStorage.getItem("x-test-app-jwt-token")) {
        emitter({
          type: actions.CONNECT_WS_REQUEST,
        });
      }
    };

    ws.onmessage = (message) => {
      emitter({
        type: actions.SET_WS_MESSAGE,
        payload: { message: JSON.parse(message.data) },
      });
    };

    return () => {
      ws.close();
    };
  });
}

function* login(action) {
  try {
    const { username, password } = action.payload;
    const response = yield call(api.post, "login", { username, password });
    const token = response?.headers?.["x-test-app-jwt-token"];

    if (token) {
      localStorage.setItem("x-test-app-jwt-token", token);
      yield put(push("/display"));
    }

    yield put({ type: actions.LOGIN_SUCCESS });
  } catch (e) {
    yield put({
      type: actions.LOGIN_FAILURE,
      payload: { message: e?.response?.data?.description },
    });
  }
}

function* logout() {
  try {
    localStorage.removeItem("x-test-app-jwt-token");
    yield put({
      type: actions.STOP_WEBSOCKET,
    });
    yield put(push("/"));
    yield put({ type: actions.LOGOUT_SUCCESS });
  } catch (e) {
    yield put({ type: actions.LOGOUT_FAILURE });
  }
}

function* externalListener(socketChannel) {
  while (true) {
    const action = yield take(socketChannel);
    yield put(action);
  }
}

function* connectWs(action) {
  try {
    const token = localStorage.getItem("x-test-app-jwt-token");
    if (token) {
      const response = yield api({
        method: "GET",
        url: "subscribe",
        headers: { "x-test-app-jwt-token": token },
      });

      const wsUrl = response?.data?.url;

      if (wsUrl) {
        const ws = new WebSocket(`${wsUrl}`);
        const channel = yield call(initWebsocket, ws);

        while (true) {
          const { cancel } = yield race({
            action: all([call(externalListener, channel)]),
            cancel: take(actions.STOP_WEBSOCKET),
          });

          if (cancel) {
            channel.close();
          }
        }
      }

      yield put({ type: actions.CONNECT_WS_SUCCESS });
    }
  } catch (e) {
    yield put({
      type: actions.CONNECT_WS_FAILURE,
      payload: { message: e?.response?.data?.description },
    });
  }
}

export default function* root() {
  yield all([
    takeLatest(actions.LOGIN_REQUEST, login),
    takeLatest(actions.CONNECT_WS_REQUEST, connectWs),
    takeLatest(actions.LOGOUT_REQUEST, logout),
  ]);
}
