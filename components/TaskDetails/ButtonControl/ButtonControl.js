/* eslint-disable no-underscore-dangle */
import React from 'react';
import Button from '../../Button';

const buttonOptions = [
  {
    key: 'Unlogined',
    value: 'Login/Make a Offer',
    btnDisable: false,
  },
  {
    key: 'taskerLogged',
    value: 'Make an Offer',
    btnDisable: false,
  },
  {
    key: 'taskerOffered',
    value: 'Update the Offer',
    btnDisable: false,
  },
  {
    key: 'clientWait',
    value: 'Waiting Offer',
    btnDisable: true,
  },
  {
    key: 'clientReview',
    value: 'Review Offers',
    btnDisable: false,
  },
  {
    key: 'taskCancelled',
    value: 'taskCanceled',
    btnDisable: true,
  },
  {
    key: 'taskAssigned',
    value: 'Await Complete',
    btnDisable: true,
  },
  {
    key: 'taskCompleted',
    value: 'Review',
    btnDisable: true,
  },
  {
    key: 'completeTask',
    value: 'Completed',
    btnDisable: true,
  },
];

export default function ButtonControl(user, taskDetail, handleClick) {
  const { offers } = taskDetail;
  const offerTook = offers.find((offer) => offer.user._id === user.id);
  if (!user.id) {
    return (
      <Button variant="green" size="md">
        {buttonOptions[0].value}
      </Button>
    );
  }

  if (user.id !== '' && user.id !== taskDetail.clientId._id && !offerTook) {
    return (
      <Button
        onClick={() => {
          handleClick('makeOffer');
        }}
        variant="green"
        size="md"
      >
        {buttonOptions[1].value}
      </Button>
    );
  }

  if (user.id !== '' && user.id === taskDetail.clientId._id && taskDetail.offers.length === 0) {
    return (
      // eslint-disable-next-line react/jsx-boolean-value
      <Button variant="grey" size="md" disable={true}>
        {buttonOptions[3].value}
      </Button>
    );
  }

  if (
    user.id !== '' &&
    user.id === taskDetail.clientId._id &&
    taskDetail.offers.length > 0 &&
    (taskDetail.status === 'open' || taskDetail.status === '')
  ) {
    return (
      <Button variant="primary" size="md">
        {buttonOptions[4].value}
      </Button>
    );
  }

  if (
    user.id !== '' &&
    taskDetail.offers.length > 0 &&
    offerTook &&
    taskDetail.status !== 'assigned' &&
    taskDetail.status !== 'completed'
  ) {
    return (
      <Button
        variant="red"
        size="md"
        onClick={() => {
          handleClick('updateOffer', offerTook);
        }}
      >
        {buttonOptions[2].value}
      </Button>
    );
  }

  if (user.id !== '' && user.id === taskDetail.clientId._id && taskDetail.status === 'assigned') {
    return (
      <Button variant="grey" size="md">
        {buttonOptions[6].value}
      </Button>
    );
  }

  if (
    user.id !== '' &&
    taskDetail.offers.length > 0 &&
    offerTook &&
    taskDetail.status === 'assigned' &&
    offerTook.assigned
  ) {
    return (
      <Button
        variant="green"
        size="md"
        onClick={() => {
          handleClick('completeTask', offerTook);
        }}
      >
        {buttonOptions[8].value}
      </Button>
    );
  }

  if (
    user.id !== '' &&
    taskDetail.offers.length > 0 &&
    offerTook &&
    taskDetail.status === 'completed' &&
    offerTook.completed
  ) {
    return (
      <Button variant="grey" size="md">
        {buttonOptions[8].value}
      </Button>
    );
  }

  if (user.id !== '' && user.id === taskDetail.clientId._id && taskDetail.status === 'completed') {
    return (
      <Button
        variant="green"
        size="md"
        onClick={() => {
          handleClick('reviewOffer', offerTook);
        }}
      >
        {buttonOptions[7].value}
      </Button>
    );
  }
}
