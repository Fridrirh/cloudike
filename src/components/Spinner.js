import React from "react";
import styled, { keyframes } from "styled-components/macro";

export const Spinner = ({ variant }) => {
  return (
    <Item>
      <Loader circleLength={50.2}>
        <svg
          className="spinnerItem"
          width="20px"
          height="20px"
          viewBox="0 0 20 20"
        >
          <circle
            className="path"
            fill="none"
            strokeWidth="2px"
            strokeLinecap="round"
            stroke="#4394ea"
            cx={10}
            cy={10}
            r={8}
          />
        </svg>
      </Loader>
    </Item>
  );
};

const rotator = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(270deg); }
`;

const dash = (circleLength) => keyframes`
  0% { stroke-dashoffset: ${circleLength}; }
  50% {
    stroke-dashoffset: ${circleLength / 4};
    transform:rotate(135deg);
  }
  100% {
    stroke-dashoffset: ${circleLength};
    transform:rotate(450deg);
  }
`;

const Item = styled.div`
  margin: auto;
`;

const Loader = styled.div`
  .spinnerItem {
    animation: ${rotator} 2s linear infinite;
  }

  .path {
    stroke-dasharray: ${(p) => p.circleLength};
    stroke-dashoffset: 0;
    transform-origin: center;
    animation: ${(p) => dash(p.circleLength)} 2s ease-in-out infinite;
  }
`;
