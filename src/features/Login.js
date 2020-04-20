import React from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";

import { FormInput, Spinner } from "../components";
import { actions } from "../constants/actions";
import { Content } from "../styles";

const Login = ({ loginRequest, isLoading }) => (
  <Content>
    <Form onSubmit={loginRequest} validate={validation}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Row>
            <p>Username:</p>
            <Field
              name="username"
              component={FormInput}
              placeholder="username"
              disabled={isLoading}
            />
          </Row>
          <Row>
            <p>Password:</p>
            <Field
              name="password"
              component={FormInput}
              placeholder="password"
              type="password"
              disabled={isLoading}
            />
          </Row>
          <Controls>
            {isLoading ? (
              <Spinner />
            ) : (
              <SubmitBtn type="submit">Submit</SubmitBtn>
            )}
          </Controls>
        </form>
      )}
    </Form>
  </Content>
);

function mapStateToProps(state) {
  return {
    isLoading: state.app.isLoginRequestInProcess,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginRequest: (values) => {
      dispatch({
        type: actions.LOGIN_REQUEST,
        payload: { ...values },
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

function validation({ username, password }) {
  const errors = {};

  if (!username) {
    errors.username = "Username can't be blank";
  }
  if (!password) {
    errors.password = "Password can't be blank";
  }

  return errors;
}

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  p {
    min-width: 40%;
    font-size: 16px;
    margin-right: 8px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;

    p {
      margin-bottom: 8px;
    }

    & > div {
      width: 100%;
    }
  }
`;

const Controls = styled.div`
  min-height: 30px;
  margin: 0 8px 0 0;
`;

const SubmitBtn = styled.button`
  padding: 0;
  outline: none;
  border: none;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  border-radius: 4px;

  padding: 6px 12px;
  background-color: #44af69;
`;
