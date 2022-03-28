import React, { Component } from 'react';
import styled from 'styled-components';
import './style.css';
import { Link } from 'react-router-dom';
import Modal from '../../Modal';
import Signup from '../../Signup';
import Button from '../../Button';
import Login from '../../Login';
import PostTask from '../../PostTask';
import Logo from '../../Logo';
import AvatarIcon from '../../AvatarIcon';
import logInApi from '../../../api/logInApi';
import Hamberg from '../Hamberg';
import CircleButton from '../../CircleButton';
import Menu from '../Menu/Menu';
import extractUserData from '../../../api/extractUserData';

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 60px;
  background-color: white;
  position: fixed;
  top: 0;
  white-space: nowrap;
  box-shadow: rgb(0 0 0 / 8%) 0px 1px 4px;
  padding: 0 20px;
  z-index: 1;
  @media screen and (max-width: 900px) {
    padding: 0;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  padding-right: 20px;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const LoginedItems = styled.div`
  display: flex;
  align-items: center;
`;

const UnLoginedItems = styled.div`
  display: flex;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;

  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: black;
  }
  &:hover {
    color: rgb(35, 151, 183);
  }
`;

const Item = styled.div`
  font-size: 14px;
  padding: 12px 0;
  margin: 0 12px;
  font-weight: 400;
  cursor: pointer;
  border: 2px solid transparent;
  &:hover {
    color: rgb(35, 151, 183);
    border-top: 2px solid rgb(35, 151, 183);
  }
`;

const DropDownMenu = styled.div`
  display: none;
  position: absolute;
  right: 0px;
  background-color: #fff;
  min-width: 120px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  right: 5px;
  top: 50px;
`;

const DropDownMenuItem = styled.div`
  height: 44px;
  display: flex;
  padding: 0 10px;
  background-color: rgb(255, 255, 255);
  color: rgb(84, 90, 119);
  text-decoration: none;
  text-align: center;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  overflow: hidden;
  border-bottom: 1px solid rgb(246, 248, 253);
  transition: color 0.1s ease-out 0s, padding 0.3s ease-out 0s, background 0.1s ease-out 0s,
    height 0.3s ease-out 0s, border-bottom 0.2s linear 0s, opacity 0.2s ease-out 0s;
  flex-direction: column;
  justify-content: center;
`;

const AvatarContainer = styled.div`
  margin: 8px;
  &:hover {
    ${DropDownMenu} {
      display: block;
    }
  }
`;

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: undefined,
      showMenu: undefined,
      logInFail: '',
      signUpFail: '',
    };
    this.handleShowModalChange = this.handleShowModalChange.bind(this);
    this.handleShowMenuChange = this.handleShowMenuChange.bind(this);
    this.getLogInData = this.getLogInData.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.logOut = this.logOut.bind(this);
    this.signUpSuccess = this.signUpSuccess.bind(this);
    this.signUpFail = this.signUpFail.bind(this);
    this.logInSuccess = this.logInSuccess.bind(this);
    this.logInFail = this.logInFail.bind(this);
  }

  handleShowModalChange(newShowModal) {
    this.setState(
      {
        showModal: newShowModal,
      },
      () => {},
    );
  }

  handleShowMenuChange(newShowMenu) {
    this.setState({
      showMenu: newShowMenu,
    });
  }

  getLogInData = (eMail, password) => {
    const data = {
      email: eMail,
      // eslint-disable-next-line object-shorthand
      password: password,
    };
    logInApi(data, this.logInSuccess, this.logInFail);
  };

  signUpSuccess(res) {
    const userData = extractUserData(res);
    const { handleLoginState } = this.props;
    handleLoginState(userData);
    this.handleShowModalChange(undefined);
  }

  signUpFail(err) {
    this.setState({
      signUpFail: err,
    });
  }

  logInSuccess(res) {
    const { handleLoginState } = this.props;
    this.setState({
      logInFail: '',
    });
    handleLoginState(res);
    this.handleShowModalChange(undefined);
  }

  logInFail(err) {
    this.setState({
      logInFail: err,
    });
  }

  logOut() {
    const { handleLoginState } = this.props;
    localStorage.removeItem('oor-jwt');
    handleLoginState('', '');
  }

  closeModal() {
    this.handleShowModalChange(undefined);
  }

  render() {
    const { showModal, showMenu, logInFail, signUpFail } = this.state;
    const { logInUser, isLogIn, handleTaskPosted } = this.props;
    const { id, userName } = logInUser;

    return (
      <div>
        <Wrapper>
          <Hamberg onClick={() => this.handleShowMenuChange('menu')} />
          <StyledLink to="/">
            <Logo />
          </StyledLink>
          <CircleButton openPostTask={() => this.handleShowModalChange('postATask')} />
          {showMenu === 'menu' && (
            <Menu
              onClose={() => this.setState({ showMenu: undefined })}
              openSignUP={() => this.handleShowModalChange('signup')}
              openLogIn={() => this.handleShowModalChange('login')}
              openPostTask={() => this.handleShowModalChange('postATask')}
              logInUser={logInUser}
              isLogIn={isLogIn}
              logOut={this.logOut}
            />
          )}

          {showModal === 'postATask' && (
            <Modal title="Post a task" onClose={this.closeModal}>
              <PostTask userId={id} onClose={this.closeModal} handleTaskPosted={handleTaskPosted} />
            </Modal>
          )}
          {showModal === 'login' && (
            <Modal title="Log in" onClose={this.closeModal}>
              <Login logIn={this.getLogInData} logInFail={logInFail} />
            </Modal>
          )}
          {showModal === 'signup' && (
            <Modal title="Join in" onClose={this.closeModal}>
              <Signup
                signUp={this.signUpFail}
                signUpSuccess={this.signUpSuccess}
                signUpFail={signUpFail}
              />
            </Modal>
          )}

          <Left>
            <Button
              size="sm"
              // eslint-disable-next-line react/no-children-prop
              children="Post a task"
              onClick={() => this.handleShowModalChange('postATask')}
            />

            <StyledLink to="/browse-tasks">
              <Item>Browse tasks</Item>
            </StyledLink>

            {isLogIn && (
              <StyledLink to="/my-tasks">
                <Item>My Tasks</Item>
              </StyledLink>
            )}
          </Left>

          <Right>
            {!isLogIn && (
              <UnLoginedItems>
                <Item onClick={() => this.handleShowModalChange('signup')}>Sign up</Item>

                <Item onClick={() => this.handleShowModalChange('login')}>Login</Item>
              </UnLoginedItems>
            )}

            {isLogIn && (
              <LoginedItems>
                <StyledLink to="/">
                  <Item>Help</Item>
                </StyledLink>
                <StyledLink to="/">
                  <Item>Notifications</Item>
                </StyledLink>
                <StyledLink to="/">
                  <Item>Messages</Item>
                </StyledLink>
                <AvatarContainer>
                  <StyledLink to="/profile">
                    <AvatarIcon />
                  </StyledLink>
                  <DropDownMenu>
                    <DropDownMenuItem>
                      <StyledLink to="/profile">{userName}</StyledLink>
                    </DropDownMenuItem>
                    <DropDownMenuItem>
                      <Button variant="transparent" size="xs" onClick={this.logOut}>
                        Log out
                      </Button>
                    </DropDownMenuItem>
                  </DropDownMenu>
                </AvatarContainer>
              </LoginedItems>
            )}
          </Right>
        </Wrapper>
      </div>
    );
  }
}
