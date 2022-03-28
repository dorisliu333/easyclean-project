import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import Needed from '../../components/Needed';
import BlueCard from '../../components/BlueCard';
import VideoCard from '../../components/VideoCard';
import OtherCard from '../../components/OtherCard';
import Partnerships from '../../components/Partnerships';
import Footer from '../../components/Footer';
import Modal from '../../components/Modal';
import PostTask from '../../components/PostTask';
import backgroundImage from '../../assets/images/global-homepage-hero.jpg';
import './home.css';

const Wrapper = styled.div`
  height: calc(100vh - 120px);
  width: 100vw;
  padding: 0 20px;
  max-height: 650px;
  box-sizing: border-box;
  /* s3-ap-southeast-2.amazonaws.com/global-homepage-hero.jpg?quality=60' */
  background: url(${backgroundImage});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-position-x: center;
  background-repeat: no-repeat;
  background-size: cover;
  @media screen and (max-width: 400px) {
    width: 100vw;
    font-size: 48px;
    justify-content: space-around;
  }
`;
const FillHeader = styled.div`
  display: none;
  width: 100vw;
  height: 60px;
  position: relative;
  top: 0;
  @media screen and (max-width: 900px) {
    display: flex;
  }
`;

const HeadingContainer = styled.div`
  align-items: left;
  @media screen and (max-width: 400px) {
    align-items: center;
  }
`;

const Heading = styled.h1`
  color: rgb(255, 255, 255);
  font-size: 48px;
  line-height: 52px;
`;

const Sub = styled.p`
  color: rgb(255, 255, 255);
  font-size: 34px;
  line-height: 40px;
  margin-top: 20px;
`;

const Ready = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto;
  max-width: 1180px;
  @media screen and (max-width: 700px) {
    flex-direction: column;
    margin-bottom: 25px;
  }
`;

const PT = styled.div`
  color: rgb(41, 43, 50);
  font-family: museo-regular, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
  font-size: 20px;
  font-weight: initial;
  line-height: 28px;
  letter-spacing: 0.15px;
  @media screen and (max-width: 400px) {
    margin-bottom: 20px;
  }
`;

const ButtonResponsive = styled.div`
  margin-top: 20px;
  @media screen and (max-width: 400px) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

export default class HomePageBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: undefined,
    };
    this.handleShowModalChange = this.handleShowModalChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleShowModalChange(newShowModal) {
    this.setState({
      showModal: newShowModal,
    });
  }

  closeModal() {
    this.handleShowModalChange(undefined);
  }

  render() {
    const { showModal } = this.state;
    const { logInUser } = this.props;
    const { id } = logInUser;
    return (
      <div className="wrapper">
        <FillHeader />
        <Wrapper>
          {showModal === 'postATask' && (
            <Modal title="Post a task" onClose={this.closeModal}>
              <PostTask userId={id} />
            </Modal>
          )}
          <HeadingContainer>
            <Heading>Connect with experts to get the job done on EasyClean</Heading>
            <Sub>It’s amazing what you can’t do yourself</Sub>
            <ButtonResponsive>
              <Button
                size="md"
                // eslint-disable-next-line react/no-children-prop
                children="Get start now"
                onClick={() => this.handleShowModalChange('postATask')}
                // onClick={this.handleShowModalChange('postATask')}
                // onClick = {this.setState({showModal:'postATask'})}
              />
            </ButtonResponsive>
          </HeadingContainer>
        </Wrapper>
        <Needed />
        <BlueCard />
        <VideoCard />
        <BlueCard />
        <Ready>
          <PT>
            <p>Ready to get that to-do list done?</p>
            <p>Start by posting a task today!</p>
          </PT>
          <ButtonResponsive>
            <Button>Get started now</Button>
          </ButtonResponsive>
        </Ready>
        <OtherCard />
        <BlueCard />
        <Ready>
          <PT>
            <p>Ready to get that to-do list done?</p>
            <p>Start by posting a task today!</p>
          </PT>
          <div>
            <Button>Get started now</Button>
          </div>
        </Ready>
        <Partnerships />
        <Footer />
      </div>
    );
  }
}
