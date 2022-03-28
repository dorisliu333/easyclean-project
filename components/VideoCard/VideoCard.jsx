import React from 'react';
import styled from 'styled-components';
import './VideoCard.css';
import logo1 from '../../assets/img/video.png';
import logo2 from '../../assets/img/video2.png';

const Wrapper = styled.div`
  background-color: rgb(255, 255, 255);
  display: block;
  margin-top: -50px;
`;

const Container = styled.div`
  position: relative;
  width: calc(100vw - 16px);
  max-width: 940px;
  margin: 0px auto;
  padding: 24px 0px 20px;
`;

const Heading = styled.div`
  display: flex;
  max-width: 1216px;
  margin: 16px auto;
  align-content: center;
  flex-wrap: wrap;
`;

const Mid = styled.div`
  display: flex;
`;
const Bot = styled.div`
  display: flex;
  margin-top: 30px;
`;

const VideoCard = () => (
  <Wrapper>
    <Container>
      <Heading>
        <div className="HText">
          <h3 className="h31">How does EasyCleaner work?</h3>
          <h5 className="h51">
            Check out the video below to see exactly how EasyClean can help you get those to-dos
            done once and for all.
          </h5>
        </div>
      </Heading>

      <Mid>
        <img src={logo1} className="img1" alt="" />
      </Mid>

      <Bot>
        <img src={logo2} className="img1" alt="" />
      </Bot>
    </Container>
  </Wrapper>
);

export default VideoCard;
