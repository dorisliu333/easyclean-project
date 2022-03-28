import styled from 'styled-components';
import React from 'react';

const StyleButton = styled.button`
  outline: 0;
  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;

  background-color: rgb(224, 68, 109);
  letter-spacing: 0.15px;
  font-size: 18px;
  color: rgb(255, 255, 255);
  border-radius: 160px;
  padding: 16px 24px;
  font-weight: bold;
  margin-top: 20px;
`;

const Button02 = ({ children }) => <StyleButton>{children}</StyleButton>;

export default Button02;