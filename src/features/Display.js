import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { format } from "date-fns";

import { actions } from "../constants/actions";
import { Content } from "../styles";

const Display = ({ connectWs, logout, isWsConnected, wsMessage }) => {
  useEffect(() => {
    connectWs();
  }, [connectWs]);

  return (
    <Content>
      <StatusWrapper>
        <p>WebSocket:</p>
        <Status isConnected={isWsConnected}>
          {isWsConnected ? "connected" : "disconnected"}
        </Status>
      </StatusWrapper>

      {wsMessage?.server_time && (
        <Time>
          {format(new Date(1e3 * wsMessage.server_time), "dd.MM.yy HH:mm:ss")}
        </Time>
      )}
      <Controls>
        <LogoutBtn onClick={logout}>Logout</LogoutBtn>
      </Controls>
    </Content>
  );
};

function mapStateToProps(state) {
  return {
    isWsConnected: state.app.wsConnected,
    wsMessage: state.app.wsMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    connectWs: () => {
      dispatch({
        type: actions.CONNECT_WS_REQUEST,
      });
    },
    logout: () => {
      dispatch({
        type: actions.LOGOUT_REQUEST,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Display);

const Status = styled.div`
  background-color: ${(p) => (p.isConnected ? "#28a745" : "#ff6f57")};
  color: #fff;
  padding: 4px;
  border-radius: 4px;
`;

const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;

  ${Status} {
    margin-left: 6px;
  }
`;

const Time = styled.p`
  margin: 16px 0;
  font-size: 16px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
`;

const LogoutBtn = styled.button`
  padding: 0;
  outline: none;
  border: none;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  border-radius: 4px;
  padding: 6px 12px;
  color: #4394ea;
`;
