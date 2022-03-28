import React from 'react';
import styled from 'styled-components';
import Button from '../../Button';
import requestApi from '../../../api/fetchDetails';

const OfferContent = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 0 1 auto;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-content: unset;
  align-items: center;
  align-self: unset;
  padding: 16px;
  background-color: rgb(246, 248, 253);
  border-radius: 0px;
  border-width: 0px;
  border-color: rgb(41, 43, 50);
  width: 100%;
`;

const User = styled.div`
  font-size: 1rem;
  font-weight: 550;
`;
const Comment = styled.div`
  margin-top: 5px;
`;

const Price = styled.div`
  font-size: 20px;
  padding-left: 50px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
`;
const ConfirmButton = styled(Button)`
  margin: 10px 20px;
  width: 80%;
`;
class AcceptOffer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onClose: props.onClose,
    };
  }

  handleConfirm = () => {
    const { offerId, task, userId, priceOffer, assigned, priceAssigned, offerComment } = this.props;
    const { onClose: closeModal } = this.state;
    const acceptedOffer = {
      // eslint-disable-next-line object-shorthand
      task: task,
      user: userId,
      // eslint-disable-next-line object-shorthand
      priceOffer: priceOffer,
      // eslint-disable-next-line object-shorthand
      assigned: assigned,
      // eslint-disable-next-line object-shorthand
      priceAssigned: priceAssigned,
      // eslint-disable-next-line object-shorthand
      offerComment: offerComment,
    };
    const promise1 = requestApi.put(`/tasks/${task}/status/assigned`);
    const promise2 = requestApi.put(`/offers/${offerId}`, acceptedOffer);
    Promise.all([promise1, promise2])
      .then(() => {
        closeModal();
      })
      .catch(() => {});
  };

  render() {
    const { userName, offerComment, priceOffer } = this.props;
    return (
      <div>
        <OfferContent>
          <div>
            <User>{userName}</User>
            <Comment>{offerComment}</Comment>
          </div>
          <Price>${priceOffer}</Price>
        </OfferContent>
        <ButtonWrapper>
          <ConfirmButton size="md" variant="green" type="Submit" onClick={this.handleConfirm}>
            Submit
          </ConfirmButton>
        </ButtonWrapper>
      </div>
    );
  }
}

export default AcceptOffer;
