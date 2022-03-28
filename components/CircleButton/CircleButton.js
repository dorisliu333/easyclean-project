import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Circle = styled.button`
  border: 1px solid #000;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  position: relative;
  margin: 4px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 20px;
  background-color: rgb(221, 58, 97);
  border: none;
  display: none;
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 900px) {
    display: flex;
  }
`;
const Plus = styled.span`
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    width: 2px;
    margin: 12px auto;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    margin: auto 12px;
    height: 2px;
  }
`;

export default class CircleButton extends PureComponent {
  render() {
    const { openPostTask } = this.props;
    return (
      <Circle onClick={openPostTask}>
        <Plus />
      </Circle>
    );
  }
}
