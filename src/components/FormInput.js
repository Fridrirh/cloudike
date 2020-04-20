import React from "react";
import styled from "styled-components";

import { StyledInput } from "../styles";

export const FormInput = ({
  input: { name, onChange, value },
  meta: { touched, error },
  className,
  ...rest
}) => (
  <Wrapper>
    <StyledInput
      name={name}
      onChange={onChange}
      value={value}
      className={className}
      {...rest}
    />

    {touched && error && <Error>{error}</Error>}
  </Wrapper>
);

const Wrapper = styled.div`
  position: relative;
`;

const Error = styled.span`
  position: absolute;
  left: 0;
  bottom: -14px;
  font-size: 12px;
  color: #ff6f57;
`;
