import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CloseButton from '../../CloseButton';
import Button from '../../Button';

const Wrapper = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100vw;
  display: none;
  flex-direction: column;
  background-color: white;
  @media screen and (max-width: 900px) {
    display: flex;
  }
`;

const FirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60px;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid rgb(246, 248, 253);
`;

const ItemRow = styled(Link)`
  display: block;
  height: 60px;
  font-size: 14px;
  padding-left: 20px;
  border-bottom: 1px solid rgb(246, 248, 253);
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  flex-direction: column;
  text-align: left;
  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: black;
  }
  &:hover {
    background-color: rgb(245, 247, 253);
  }
`;

export default class Menu extends PureComponent {
  render() {
    const { onClose, openSignUP, openLogIn, logOut, openPostTask, isLogIn, logInUser } = this.props;
    const { userName } = logInUser;
    return (
      <Wrapper>
        <FirstRow>
          <CloseButton onClick={onClose} />
          {/* eslint-disable-next-line react/no-children-prop */}
          <Button size="sm" children="Post a task" onClick={openPostTask} />
        </FirstRow>
        {!isLogIn && (
          <div>
            <ItemRow onClick={openSignUP}>Sign Up</ItemRow>
            <ItemRow onClick={openLogIn}>Log In</ItemRow>
          </div>
        )}
        {isLogIn && (
          <div>
            <ItemRow to="/profile">
              <div>{userName}</div>
              <div>Profile</div>
            </ItemRow>
            <ItemRow to="/browse-tasks">Browser tasks</ItemRow>
            <ItemRow to="/my-tasks">My Tasks</ItemRow>
            <ItemRow onClick={logOut}>Log out</ItemRow>
          </div>
        )}
      </Wrapper>
    );
  }
}
