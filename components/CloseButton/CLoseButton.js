import styled from 'styled-components';
import close from '../../assets/images/close.svg';

const CloseButton = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(${close});
  background-size: cover;
  &:hover {
    cursor: pointer;
  }
`;

export default CloseButton;
