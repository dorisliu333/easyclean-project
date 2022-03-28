import React from 'react';
import styled from 'styled-components';
import avatarIcon from '../../assets/images/default_avatar.png';

const ProfileImg = styled.img`
  border-radius: 50%;
  display: inline-block;
  //position: relative;
  width: 40px;
`;

const AvatarIcon = () => (
  <div>
    <ProfileImg src={avatarIcon} alt="" />
  </div>
);

export default AvatarIcon;
