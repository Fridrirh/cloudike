import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import { actions } from "../constants/actions";

const FlashMsg = ({ message }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch({
          type: actions.SET_FLASH_MESSAGE,
          payload: null,
        });
      }, 4000);
    }
  }, [message, dispatch]);

  if (!message) {
    return null;
  }

  return <Wrapper>{message}</Wrapper>;
};

function mapStateToProps(state) {
  return {
    message: state.app.flashMsg,
  };
}

export default connect(mapStateToProps)(FlashMsg);

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  max-width: 300px;
  top: 10px;
  right: 10px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ff6f57;
  box-shadow: 0 4px 10px rgba(194, 198, 210, 0.2);
  padding: 20px;
  font-size: 12px;
  animation: ${fadeIn} 1s;
`;
