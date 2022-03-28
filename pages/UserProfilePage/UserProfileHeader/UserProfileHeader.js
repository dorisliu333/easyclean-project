import React from 'react';
import styled from 'styled-components';
import background from '../../../assets/images/slide2.jpg';
import ProfileEdit from '../../../components/ProfileEdit';
import avatarIcon from '../../../assets/images/default_avatar.png';

const HeaderContainer = styled.div`
  position: relative;
  padding-bottom: 15px;
`;
const Background = styled.div`
  /* background-image: url(${background}); */
  background-color: rgb(228, 234, 240);
  background-position: 50% 50%;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 5px 5px 0 0;
  height: 200px;
  position: relative;
  display: block;
`;

const Logo = styled.div`
  position: absolute;
  left: 20px;
  top: 90px;
  border-radius: 50%;
  display: inline-block;
  font-size: 16px;
  > img {
    border: 4px solid #fff;
    border-radius: 50%;
    display: block;
    margin: 0 auto;
    max-height: 100%;
    max-width: 100%;
    width: 128px;
    aspect-ratio: auto 128 / 128;
    height: 128px;
  }
  @media screen and (max-width: 700px) {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, 0);
  }
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  @media screen and (max-width: 700px) {
    flex-direction: column;
    text-align: center;
  }
`;
const NameTageLine = styled.div`
  margin-top: 30px;
`;

export default class UserProfileHead extends React.PureComponent {
  render() {
    const { getUserDataWithId, user } = this.props;
    const { userName, eMail, mobile, postCode, description } = user;
    return (
      <HeaderContainer>
        <Background>
          <Logo>
            <img src={avatarIcon} alt="" />
          </Logo>
        </Background>
        <TextContainer>
          <div>
            <NameTageLine>
              <div className="name">{userName}</div>
            </NameTageLine>

            <div className="infoContainer">
              <div className="lastOnline">
                <span>Last online 24 mins ago</span>
              </div>
              <div className="memberSince">
                <span>Member since 14th Jun 2018</span>
              </div>
              <div className="email">
                <span>Email: {eMail}</span>
              </div>
              <div className="mobile">
                <span>Mobile: {mobile}</span>
              </div>
              <div className="postcode">
                <span>Postcode: {postCode}</span>
              </div>
              <div className="description">
                <span>Description: {description}</span>
              </div>
            </div>
          </div>
          <NameTageLine>
            <ProfileEdit getUserDataWithId={getUserDataWithId} user={user} />
          </NameTageLine>
        </TextContainer>
      </HeaderContainer>
    );
  }
}
