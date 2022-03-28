import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  outline: 0;
  border: 0;
  padding: 0;
  height: ${(props) => props.height};
  width: 100%;
  background-color: rgb(210, 210, 210);
  border-radius: 50px;
`;

const Filler = styled.div`
  outline: 0;
  border: 0;
  padding: 0 0 0 0;
  height: 100%;
  border-radius: inherit;
  text-align: right;

  margin: 0;
  padding: 0;
  width: ${(props) => props.completed};
  background-color: ${(props) => props.bgcolor};
  transition: width 0.2s ease-in;
`;
const SpanLabel = styled.span`
  padding: 0px;
  color: white;
  margin: 0px;
`;
const ProgressBar = ({ bgcolor, completed, height }) => (
  <Container height={height}>
    <Filler bgcolor={bgcolor} completed={completed}>
      <SpanLabel>{}</SpanLabel>
    </Filler>
  </Container>
);

export default ProgressBar;
