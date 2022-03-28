import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  z-index: 1001;
  position: sticky;
  top: 60px;
  left: 0px;
  width: 100vw;
  margin: auto;
  height: 48px;
  background-color: white;
  border-bottom: 1px solid rgb(231, 235, 251);
  border-top: 1px solid rgb(231, 235, 251);
  box-shadow: rgb(0 0 0 / 8%) 0px 1px 4px;
`;

const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  max-width: 1023px;
  margin-left: 40px;
  margin-right: auto;
  height: 48px;
`;

const Tab = styled.div`
  background-color: transparent;
  box-sizing: border-box;
  color: #545a77;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  margin-right: 8px;
  outline: none;
  padding: 4px 8px;
  transition: color 0.1s ease;
  &:active {
    color: #008fb4;
  }
`;

export default class MyTaskMenu extends PureComponent {
  render() {
    return (
      <Wrapper>
        <Content>
          <Tab>All my tasks</Tab>
          <Tab>All my offers</Tab>
          <Tab>All my accepted tasks</Tab>
        </Content>
      </Wrapper>
    );
  }
}
