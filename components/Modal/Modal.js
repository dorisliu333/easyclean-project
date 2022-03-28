import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  inset: 0px;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
`;

const ModalHeaderWrap = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  margin: 0px;
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  flex-shrink: 0;
  min-height: 60px;
  position: relative;
  border-bottom: 1px solid rgb(246, 248, 253);
`;

const ModalTitle = styled.div`
  -webkit-box-flex: 1;
  flex-grow: 1;
  padding-left: 32px;
  padding-right: 32px;
  color: rgb(41, 43, 50);
  font-family: museo-regular, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
  font-size: 18px;
  font-weight: initial;
  line-height: 24px;
  letter-spacing: 0.15px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ModalContent = styled.div`
  padding: 0px;
  margin: 0px;
  max-height: 450px;
  animation: 0.4s ease 0s 1 normal none running slideIn;
  position: absolute;
  inset: 50% auto auto 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border-radius: 5px;
  width: ${(props) => (props.width ? props.width : 'auto')};
  -webkit-animation: 0.4s ease 0s 1 normal none running slideIn;
  animation: 0.4s ease 0s 1 normal none running slideIn;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  background-color: white;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 10px;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  @media only screen and (max-width: 900px) {
    width: 100vw;
    height: 100%;
    max-height: 100vh;
  }
`;

const Content = styled.div`
  margin: 0px;
  padding: 0px;
  overflow: hidden auto;
  color: rgb(41, 43, 50);
  flex-grow: 1;
`;

const CloseBtn = styled.svg`
  position: absolute;
  cursor: pointer;
  right: 16px;
  width: 24px;
  height: 24px;
  fill: rgb(84, 90, 119);
`;

class Modal extends React.PureComponent {
  render() {
    const { title, children, onClose, width } = this.props;
    return (
      <ModalContainer>
        <ModalContent width={width}>
          <ModalHeaderWrap>
            <ModalTitle>
              {title}
              <CloseBtn onClick={onClose}>
                <path
                  d="M13.17 12l6.41-6.42a.82.82 0 00-1.16-1.16L12 10.83 5.58 4.42a.82.82 0 00-1.16 
              1.16L10.83 12l-6.41 6.42a.8.8 0 000 1.16.8.8 0 001.16 0L12 13.17l6.42 6.41a.8.8 0 001.16 
              0 .8.8 0 000-1.16z"
                />
              </CloseBtn>
            </ModalTitle>
          </ModalHeaderWrap>
          <Content>{children}</Content>
        </ModalContent>
      </ModalContainer>
    );
  }
}

export default Modal;
