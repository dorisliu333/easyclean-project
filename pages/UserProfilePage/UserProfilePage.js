import React from 'react';
import styled from 'styled-components';
import UserProfileHead from './UserProfileHeader';

const Body = styled.div`
  box-sizing: border-box;
  margin: 100px auto;
  max-width: 1024px;
  position: relative;
  width: 100%;
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: subpixel-antialiased;
  background-color: #f6f8fd;
  color: #545a77;
  font-family: museo_sans, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
  font-size: 14px;
  font-weight: 300;
  line-height: 1.4;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 4px rgb(0 0 0 / 30%);
  @media screen and (max-width: 900px) {
    margin-top: 60px;
  }
`;

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.getUserDataWithId = props.getUserDataWithId;
  }

  render() {
    const { user, getUserDataWithId } = this.props;
    return (
      <Body>
        <UserProfileHead user={user} getUserDataWithId={getUserDataWithId} />
      </Body>
    );
  }
}

export default UserProfilePage;
