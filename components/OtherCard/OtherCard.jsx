import React from 'react';
import styled from 'styled-components';
import logo3 from '../../assets/img/other1.png';
import logo4 from '../../assets/img/other2.png';
import logo5 from '../../assets/img/other3.png';
import logo6 from '../../assets/img/other4.png';
import './OtherCard.css';

const Wrapper = styled.div`
  padding: 64px 0;
  background-color: rgb(255, 255, 255);
  display: block;
  box-sizing: border-box;
  width: 100vw;
`;

const TextWrapper = styled.div`
  max-width: 940px;
  position: relative;
  width: calc(100% - 16px);
  align-content: center;
  display: flex;
  flex-wrap: wrap;
  margin: 16px auto;
`;
const Text = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const TestTop = styled.div`
  color: rgb(41, 43, 50);
  font-family: museo-bold, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
  font-size: 28px;
  font-weight: initial;
  line-height: 32px;
  letter-spacing: -0.15px;
  overflow-wrap: break-word;
  word-break: break-word;
  text-decoration: initial;
  text-align: center;
  vertical-align: initial;
  font-style: initial;
  white-space: initial;
  margin: 0px 0px 8px;
  padding: 0px;
`;
const TestBot = styled.div`
  color: rgb(84, 90, 119);
  font-family: museo-regular, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
  font-size: 18px;
  font-weight: initial;
  line-height: 24px;
  letter-spacing: 0.15px;
  overflow-wrap: break-word;
  word-break: break-word;
  text-decoration: initial;
  text-align: center;
  vertical-align: initial;
  font-style: initial;
  white-space: initial;
  margin: 0px;
  padding: 0px;
`;
const TopWrapper = styled.div`
  max-width: 860px;
  display: flex;
  align-items: center;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
`;
const PicWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const OtherCard = () => (
  <Wrapper>
    <TextWrapper>
      <Text>
        <TestTop>Things you might also want to know</TestTop>
        <TestBot>
          Whether you’re getting work done or doing tasks on EasyClean, know that we’ve got your
          back every step of the way.
        </TestBot>
      </Text>
    </TextWrapper>
    <PicWrapper>
      <TopWrapper>
        <Container>
          <img src={logo3} className="img1" alt="" />
          <div className="TopText">
            <h4 className="h41">Secure Payments</h4>
            <p className="p2">
              We hold task payments secure with our PCI-DSS compliant EasyClean Pay – so tasks can
              be completed knowing payment is there when you&aposre done.
            </p>
            <a href="/">Read more</a>
          </div>
        </Container>
      </TopWrapper>

      <TopWrapper>
        <Container>
          <div className="TopText">
            <h4 className="h41">Top rated insurance</h4>
            <p className="p2">
              Insurance is there to ease any worries - making sure the Tasker has liability
              insurance from CGU while performing most task activities. T&Cs apply.
            </p>
            <a href="/">Read more</a>
          </div>
          <img src={logo4} className="img1" alt="" />
        </Container>
      </TopWrapper>

      <TopWrapper>
        <Container>
          <img src={logo5} className="img1" alt="" />
          <div className="TopText">
            <h4 className="h41">Verified badges</h4>
            <p className="p2">
              Badges give members a bit more verified info when deciding who to work with on a task.
              Each badge has certain requirements that must be met and verified before they’re shown
              on the members profile.
            </p>
            <a href="/">Read more</a>
          </div>
        </Container>
      </TopWrapper>

      <TopWrapper>
        <Container>
          <div className="TopText">
            <h4 className="h41">Here if you need us</h4>
            <p className="p2">
              Our comprehensive Help Centre and dedicated EasyClean Support are on hand 24/7 to help
              with any questions, queries or issues you might have.
            </p>
            <a href="/">Read more</a>
          </div>
          <img src={logo6} className="img1" alt="" />
        </Container>
      </TopWrapper>
    </PicWrapper>
  </Wrapper>
);

export default OtherCard;
