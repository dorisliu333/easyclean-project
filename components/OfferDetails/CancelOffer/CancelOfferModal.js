import React from 'react';
import styled from 'styled-components';
import Button from '../../Button';

const CancelContent = styled.div`
  padding: 10px 20px;
  overflow: hidden auto;
  color: rgb(41, 43, 50);
  -webkit-box-flex: 1;
  flex-grow: 1;
  display: block;
  font-weight: 500;
`;

const CancelInfo = styled.div`
  position: relative;
  overflow: hidden;
`;

const DetailedInfo = styled.div`
  box-sizing: border-box;
  display: block;
  flex: 0 1 auto;
  flex-flow: column wrap;
  -webkit-box-pack: center;
  justify-content: center;
  align-content: unset;
  -webkit-box-align: center;
  align-items: center;
  align-self: unset;
  margin: 0px 0px 40px;
  padding: 0px;
  border-radius: 0px;
  border-width: 0px;
  border-color: rgb(41, 43, 50);
`;

const ContentInfo = styled.p`
  color: rgb(41, 43, 50);
  font-family: museo-regular, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.15px;
  overflow-wrap: break-word;
  word-break: break-word;
  text-decoration: initial;
  text-align: initial;
  vertical-align: initial;
  font-style: initial;
  white-space: initial;
  margin: 0px;
  padding: 0px;
`;

const CancelFooter = styled.div`
  padding: 0px 20px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  flex-shrink: 0;
  min-height: 60px;
  border-top: 1px solid rgb(246, 248, 253);
`;

const CancelButtonGroup = styled.div`
  width: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
`;

const CancelButtonLeft = styled.div`
  padding-right: 25px;
  width: 100%;
`;

const CancelButtonRight = styled.div`
  padding-left: 25px;
  width: 100%;
`;

export default function CancelOfferModal({ handleCancelOffer, onClose }) {
  return (
    <>
      <CancelContent>
        <CancelInfo>
          <DetailedInfo>
            <ContentInfo>Are you sure you want to cancel your task?</ContentInfo>
          </DetailedInfo>
        </CancelInfo>
      </CancelContent>
      <CancelFooter>
        <CancelButtonGroup>
          <CancelButtonLeft>
            <Button variant="close" onClick={onClose}>
              Close
            </Button>
          </CancelButtonLeft>
          <CancelButtonRight>
            <Button variant="red" onClick={handleCancelOffer}>
              Submit&Cancel offer
            </Button>
          </CancelButtonRight>
        </CancelButtonGroup>
      </CancelFooter>
    </>
  );
}
