/* eslint-disable no-underscore-dangle */
import React from 'react';
import styled from 'styled-components';
import Button from '../Button';
import AvatarIcon from '../AvatarIcon';
import Modal from '../Modal';
import AcceptOffer from './AcceptOffer';
import requestApi from '../../api/fetchDetails';
import CancelOfferModal from './CancelOffer/CancelOfferModal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 0px 8px;
  align-items: stretch;
`;

const TaskerInfo = styled.div`
  margin: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  div {
    font-size: 1.2rem;
  }
`;

const UserInfo = styled.div`
  padding: 15px;
  div {
    color: rgb(0, 143, 180);
    font-family: museo-bold, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
    font-size: 18px;
    font-weight: initial;
    line-height: 24px;
    letter-spacing: 0.15px;
    &:hover {
      cursor: pointer;
    }
  }
`;

const Right = styled.div`
  display: flex;
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: subpixel-antialiased;
  color: #545a77;
  font-family: museo_sans, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
  font-size: 14px;
  font-weight: 300;
  line-height: 1.4;
  margin: 0;
  flex-direction: row;
  -webkit-box-pack: end;
  justify-content: flex-end;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: auto;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-flex: 1;
  flex-grow: 1;
  flex-direction: row;
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 8px;
  width: 100%;
`;

const Price = styled.span`
  min-width: 68px;
  text-align: center;
  margin-left: 18px;
`;
const AcceptOfferBtn = styled(Button)`
  margin: 0 20px;
`;

const OfferComment = styled.div`
  background-color: rgb(246, 248, 253);
  border-radius: 4px;
  margin: 5px 15px;
  padding: 8px;
  p {
    color: rgb(41, 43, 50);
    font-family: museo-regular, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
    font-size: 14px;
    font-weight: initial;
    line-height: 20px;
    letter-spacing: 0.25px;
    overflow-wrap: break-word;
    word-break: break-word;
    text-align: initial;
    vertical-align: initial;
    font-style: initial;
    white-space: pre-wrap;
  }
`;

class OfferDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: undefined,
      offerItem: undefined,
    };
    this.handleShowModal = this.handleShowModal.bind(this);
  }

  showModal = (e) => {
    this.setState({
      showModal: e,
    });
  };

  closeModal = () => {
    this.showModal(undefined);
  };

  handleShowModal = (offerItem, newShowModal) => {
    /* <AcceptOffer> */
    this.setState(
      {
        showModal: newShowModal,
        // eslint-disable-next-line object-shorthand
        offerItem: offerItem,
      },
      () => {},
    );
  };

  handleCancelOffer = (offer, offerItemId) => {
    const { offerUpdated } = this.props;
    requestApi.delete(`offers/${offerItemId}`).then(() => {
      this.closeModal();
      offerUpdated(offer, offerItemId);
      window.location.reload(false);
    });
  };

  render() {
    const { offers, user, taskDetail } = this.props;
    const { showModal, offerItem } = this.state;
    return (
      <div>
        {offers.map((item) => (
          // eslint-disable-next-line no-underscore-dangle
          <Container key={item._id}>
            <TaskerInfo>
              <AvatarIcon />
              <UserInfo>
                <div className="user-name">{item.user.username}</div>
              </UserInfo>
              <Right>
                <Price>${item.priceOffer}</Price>

                {/* eslint-disable-next-line no-underscore-dangle */}
                {user.id === taskDetail.clientId._id &&
                  (taskDetail.status === 'open' || taskDetail.status === '') && (
                    <AcceptOfferBtn
                      variant="green"
                      size="sm"
                      onClick={() => this.handleShowModal(item, 'acceptOffer')}
                    >
                      Accept
                    </AcceptOfferBtn>
                  )}

                {user.id === item.user._id &&
                  (taskDetail.status === '' || taskDetail.status === 'open') && (
                    <Button
                      variant="red"
                      size="sm"
                      onClick={() => this.handleShowModal(item, 'cancelOffer')}
                    >
                      Cancel
                    </Button>
                  )}
              </Right>
            </TaskerInfo>
            <OfferComment>
              <p>{item.offerComment}</p>
            </OfferComment>
          </Container>
        ))}
        {showModal === 'acceptOffer' && (
          <Modal width="40%" onClose={this.closeModal} title="Accept this offer?">
            <AcceptOffer
              onClose={this.closeModal}
              userName={offerItem.user.username}
              offerItem={offerItem}
              offerId={offerItem._id}
              task={offerItem.task}
              userId={offerItem.user._id}
              priceOffer={offerItem.priceOffer}
              assigned
              priceAssigned={offerItem.priceOffer}
              offerComment={offerItem.offerComment}
            />
          </Modal>
        )}
        {showModal === 'cancelOffer' && (
          <Modal width="40%" onClose={this.closeModal} title="Cancel this offer">
            <CancelOfferModal
              onClose={this.closeModal}
              offerItem={offerItem}
              offerId={offerItem._id}
              handleCancelOffer={() => {
                this.handleCancelOffer(offerItem, offerItem._id);
              }}
            />
          </Modal>
        )}
      </div>
    );
  }
}

export default OfferDetails;
