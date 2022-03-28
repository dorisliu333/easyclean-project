import React from 'react';
import styled from 'styled-components';
import './button.css';

const Wrapper = styled.div`
  margin-top: 40px;
  @media screen and (max-width: 900px) {
    max-width: 100vw;
  }
`;

const Category = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 160px;
  margin-bottom: 15px;
`;
const Title = styled.div`
  color: rgb(41, 43, 50);
  font-family: museo-regular, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
  font-size: 12px;
  font-weight: initial;
  line-height: 16px;
  letter-spacing: 0.25px;
  overflow-wrap: break-word;
  word-break: break-word;
  text-decoration: initial;
  text-align: center;
  vertical-align: initial;
  font-style: initial;
  white-space: initial;
  margin: 0px;
  padding: 0px;
  margin-left: 56px;
  width: 70px;
`;

const Circle = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  webkit-box-pack: center;
  justify-content: center;
  webkit-box-align: center;
  align-items: center;
  border-radius: 100%;
  background-color: rgb(84, 90, 119);
  transition: transform 0.25s ease 0s;
  position: relative;
  cursor: pointer;
  margin-bottom: 8px;
  fill: rgb(255, 255, 255);
  margin-left: 56px;

  &:hover {
    background-color: rgb(224, 68, 109);
    transform: scale(1.05);
  }
`;

const Needed = () => (
  <Wrapper>
    <div className="Text">What do you need done?</div>
    <div className="container" style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Category>
        <Circle>
          <svg width="32px" height="32px" viewBox="0 0 24 24">
            {/* eslint-disable-next-line max-len */}
            <path d="M15.777887818 10.9l-.38-.47a.76.76 0 00-.58-.28h-1.46v-2h.71a3.63 3.63 0 003.8-3.44 3.64 3.64 0 00-3.79-3.45H6.55A.76.76 0 005.8 2v1.66a1.87 1.87 0 001.93 1.79A1.37 1.37 0 019.2 6.67v.73a.75.75 0 00.75.75h1.31v2H9.78a.76.76 0 00-.58.28l-.38.47a14.28 14.28 0 00-3.12 8.89 3 3 0 003 3h6.66a3 3 0 003-3 14.28 14.28 0 00-3.18-8.89zM7.73 4c-.25 0-.43-.15-.43-.29v-.96h6.18a2.15 2.15 0 012.29 2 2.14 2.14 0 01-2.3 1.94H10.7A2.86 2.86 0 007.73 4zm7.6 17.3H8.67a1.47 1.47 0 01-1.47-1.51 12.74 12.74 0 012.8-7.95l.15-.19h1.12v4a1.13 1.13 0 01-.33.79l-.75.75a.75.75 0 000 1.06.75.75 0 001.06 0l.75-.75a2.61 2.61 0 00.77-1.85v-4h1.1l.15.19a12.74 12.74 0 012.79 8 1.47 1.47 0 01-1.48 1.41z" />
          </svg>
        </Circle>
        <Title>Home Cleaning</Title>
      </Category>
      <Category>
        <Circle>
          <svg width="32px" height="32px" viewBox="0 0 24 24">
            {/* eslint-disable-next-line max-len */}
            <path d="M18 9.6h-1.25V8.35A2.75 2.75 0 0014 5.6H4a2.75 2.75 0 00-2.75 2.75v8.51a.75.75 0 00.75.75h1.56a2.72 2.72 0 00-.31 1.25 2.75 2.75 0 005.5 0 2.61 2.61 0 00-.32-1.25h8.13a2.72 2.72 0 00-.31 1.25 2.75 2.75 0 005.5 0 2.61 2.61 0 00-.32-1.25H22a.76.76 0 00.75-.75v-2.51A4.75 4.75 0 0018 9.6zm0 1.5a3.26 3.26 0 013.25 3.25v1.76h-4.5v-5zm-14-4h10a1.25 1.25 0 011.25 1.25v4.76H2.75V8.35A1.25 1.25 0 014 7.1zm-1.25 7.51h12.5v1.5H2.75zm4.5 4.25A1.25 1.25 0 116 17.61a1.25 1.25 0 011.25 1.25zm13 0A1.25 1.25 0 1119 17.61a1.25 1.25 0 011.25 1.25z" />
          </svg>
        </Circle>
        <Title>Full House Removals</Title>
      </Category>
      <Category>
        <Circle>
          <svg width="32px" height="32px" viewBox="0 0 24 24">
            {/* eslint-disable-next-line max-len */}
            <path d="M22 3.27H2a.75.75 0 00-.75.73v4a.76.76 0 00.75.77h.25V19A2.78 2.78 0 005 21.77h14A2.78 2.78 0 0021.75 19V8.77H22a.76.76 0 00.75-.77V4a.75.75 0 00-.75-.73zM2.75 4.77h18.5v2.5H2.75zM20.25 19A1.27 1.27 0 0119 20.27H5A1.27 1.27 0 013.75 19V8.77h16.5z" />
          </svg>
        </Circle>
        <Title>Few Items Removals</Title>
      </Category>

      <Category>
        <Circle>
          <svg width="32px" height="32px" viewBox="0 0 24 24">
            {/* eslint-disable-next-line max-len */}
            <path d="M22.74 9.16a5.08 5.08 0 00-5.07-5.08h-7.42a5.08 5.08 0 00-5 4.33h-3.2a.75.75 0 100 1.5h3.19a5.08 5.08 0 005 4.33h3.57v4.4a3.23 3.23 0 006.45 0V13.5a5 5 0 002.48-4.34zm-4 9.48a1.73 1.73 0 01-3.45 0v-4.4h2.35a5 5 0 001.1-.13zm-1.1-5.9h-7.39a3.58 3.58 0 010-7.16h7.42a3.58 3.58 0 010 7.16z" />
          </svg>
        </Circle>
        <Title>Furnlture Assembly</Title>
      </Category>
    </div>
  </Wrapper>
);

export default Needed;
