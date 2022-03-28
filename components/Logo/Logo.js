/* eslint-disable object-shorthand */
import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/img/logo.png';

const LogoContainer = styled.div`
  display: flex;
`;
const LogoIcon = styled.div`
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  margin-top: 6px;
`;
const LogoText = styled.div`
  color: rgb(0, 162, 167);
  font-size: 38px;
  font-weight: 800;
`;

export default class Logo extends React.PureComponent {
  render() {
    const { onClick } = this.props;
    return (
      <LogoContainer onClick={onClick}>
        <LogoIcon />
        <LogoText>asyClean</LogoText>
      </LogoContainer>
    );
  }
}
