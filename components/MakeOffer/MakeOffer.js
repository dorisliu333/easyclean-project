import React from 'react';
import FormItem from '../FormItem';
import { Form, Input, Error, validate } from '../Input';
import Button from '../Button';
import requestApi from '../../api/fetchDetails';

const initialData = {
  value: '',
  blurred: false,
  touched: false,
  focused: false,
};

class MakeOffer extends React.Component {
  constructor(props) {
    super(props);

    const { onClose, offerCreated, updateData } = props;
    let priceOffer = '';
    let offerComment = '';
    let offerId = '';
    if (updateData) {
      priceOffer = updateData.priceOffer;
      offerComment = updateData.offerComment;
      /* eslint no-underscore-dangle: 0 */
      offerId = updateData._id;
    }

    this.state = {
      data: {
        offerPrice: { ...initialData, value: priceOffer },
        offerComment: { ...initialData, value: offerComment },
      },
      serviceFee: 10,
      task: props.task,
      userId: props.userId,
      // eslint-disable-next-line object-shorthand
      offerId: offerId,
      isFormSubmit: false,
      // eslint-disable-next-line object-shorthand
      onClose: onClose,
      // eslint-disable-next-line object-shorthand
      offerCreated: offerCreated,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFocusedChange = this.handleFocusedChange.bind(this);
    this.handleBlurredChange = this.handleBlurredChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;

    if (name === 'offerPrice' && Number.isNaN(Number(value))) {
      const { data: prevPrice } = this.state;
      this.setData(name, {
        prevPrice: prevPrice[name].value,
        touched: true,
      });
      return;
    }

    this.setData(name, {
      value,
      touched: true,
    });
  }

  handleFocusedChange(event) {
    const { name } = event.target;

    this.setData(name, {
      focused: true,
    });
  }

  handleBlurredChange(event) {
    const { name } = event.target;

    this.setData(name, {
      blurred: true,
      focused: false,
    });
  }

  handleIsFormSubmitChange(newIsFormSubmit) {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      isFormSubmit: newIsFormSubmit,
    });
  }

  handleSubmit(event, hasError) {
    event.preventDefault();
    const { edit } = this.props;
    this.handleIsFormSubmitChange(true);

    if (hasError) {
      // prevent submit
      return;
    }

    const { task, userId, onClose, offerCreated, offerId, data } = this.state;
    const { offerPrice, offerComment } = data;

    const offer = {
      // eslint-disable-next-line object-shorthand
      task: task,
      user: userId,
      priceOffer: offerPrice.value,
      assigned: false,
      priceAssigned: 5,
      offerComment: offerComment.value,
    };

    if (edit) {
      requestApi
        .put(`/offers/${offerId}`, offer)
        .then(() => {
          onClose();
          offerCreated(offer, offerId);
        })
        .catch(() => {});
    } else {
      requestApi
        .post('/offers', offer)
        .then(() => {
          onClose();
          offerCreated(offer);
        })
        .catch(() => {});
    }
  }

  getErrorMessage(error, name) {
    const { data, isFormSubmit } = this.state;
    const showInputError = data[name].blurred;
    return (showInputError || isFormSubmit) && error[name];
  }

  getError() {
    const { data } = this.state;
    const error = {};
    Object.keys(data).forEach((name) => {
      const errorOfName = validate(name, data);
      if (!errorOfName) {
        return;
      }
      error[name] = errorOfName;
    });

    return error;
  }

  setData(name, newData) {
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        [name]: {
          ...prevState.data[name],
          ...newData,
        },
      },
    }));
  }

  render() {
    const { data, serviceFee } = this.state;
    const error = this.getError(data);
    const hasError = Object.keys(error).length > 0;
    const txtServiceFee = `Service fee: -$${serviceFee.toFixed(2)}`;
    const receiveAmount = (
      data.offerPrice.value - serviceFee > 0 ? data.offerPrice.value - serviceFee : 0
    ).toFixed(2);
    const txtReceive = `You will receive $${receiveAmount}`;

    return (
      <Form width="300px" onSubmit={(e) => this.handleSubmit(e, hasError)}>
        {[
          { key: 'offerPrice', label: 'Your offer price', tag: '', placeholder: '$', length: 4 },
          { key: 'fee', label: txtServiceFee, tag: 'span' },
          { key: 'receive', label: txtReceive, tag: 'b' },
          {
            key: 'offerComment',
            label: 'Enter your offer details',
            tag: 'textarea',
            placeholder: 'Your comment',
            length: 300,
            rows: 4,
            cols: 20,
          },
        ].map(({ key, label, tag, placeholder, length, rows, cols }) =>
          tag === 'span' || tag === 'b' ? (
            <FormItem key={key}>
              <Input as={tag}>{label}</Input>
            </FormItem>
          ) : (
            <FormItem key={key} label={label} htmlFor={`make-offer-modal-${key}`}>
              <Input
                maxLength={length}
                as={tag}
                placeholder={placeholder}
                value={data[key].value}
                id={`make-offer-modal-${key}`}
                rows={rows}
                cols={cols}
                name={key}
                onChange={this.handleInputChange}
                onFocus={this.handleFocusedChange}
                onBlur={this.handleBlurredChange}
                error={this.getErrorMessage(error, key)}
              />
              <Error>{this.getErrorMessage(error, key)}</Error>
            </FormItem>
          ),
        )}
        {/* eslint-disable-next-line react/no-children-prop */}
        <Button size="lg" variant="green" type="Submit">
          Make an offer
        </Button>
      </Form>
    );
  }
}

export default MakeOffer;
