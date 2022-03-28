import React from 'react';
import styled from 'styled-components';
import logo7 from '../../assets/img/partnerships.png';

const Wrapper = styled.div`
  width: 100vw;
  margin: 50px auto 0;
  max-width: 1140px;
  background-image: URL(${logo7});
  background-position-x: center;
  background-position-y: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 440px;
  @media screen and (max-width: 400px) {
    display: none;
  }
`;

const Partnerships = () => <Wrapper />;

export default Partnerships;
