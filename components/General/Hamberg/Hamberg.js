import styled from 'styled-components';
import hamberg from '../../../assets/images/hamberg.svg';

const Hamberg = styled.div`
  background-image: url(${hamberg});
  width: 20px;
  height: 20px;
  display: none;
  margin-left: 20px;
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 900px) {
    display: flex;
  }
`;

export default Hamberg;
