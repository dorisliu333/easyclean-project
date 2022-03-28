import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import FormItem from '../FormItem';
import { Form, Input, Error } from '../Input';
import requestApi from '../../api/fetchDetails';
import errorSimplify from '../../api/errorSimplify';

const ButtonMargin = styled.div`
  padding: 0px;
  margin-top: 20px;
  margin-bottom: 16px;
`;

const ERROR_INFO = {
  email: {
    noInput: 'PLease input your Email',
    wrongEmail: 'Please input a valid email',
  },
  password: {
    noInput: 'Please input the password',
    wrongPassword: 'Please input a valid password with more than 8 letters including number',
  },
  confirmPassword: {
    noInput: 'Please input your confirm password',
    notMatch: 'Confirm password does not match to password',
  },
  name: {
    noInput: 'Please input the name of user',
    default: '',
  },
  postCode: {
    noInput: 'Please input your post code',
    default: '',
  },
  default: '',
};

const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;

const validate = (key, data) => {
  const value = data[key];
  if (!value) {
    return ERROR_INFO[key].noInput;
  }
  return (
    (key === 'email' && !EMAIL_REGEXP.test(value) && ERROR_INFO[key].wrongEmail) ||
    (key === 'confirmPassword' && value !== data.password && ERROR_INFO[key].notMatch)
  );
};

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        postCode: 0,
        userType: 0,
      },
      error: {},
      showModal: '',
      // eslint-disable-next-line react/no-unused-state
      signUp: props.signUpFail,
      // eslint-disable-next-line react/no-unused-state
      signUpSuccess: props.signUpSuccess,
    };

    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleErrorChange = this.handleErrorChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleDataChange(event) {
    const { name, value } = event.target;
    this.setState(
      (prevState) => ({
        data: {
          ...prevState.data,
          [name]: value,
        },
      }),
      () => {
        const { data } = this.state;
        const error = validate(name, data);
        this.handleErrorChange(name, error);
      },
    );
  }

  handleErrorChange(key, error) {
    this.setState((preState) => ({
      error: {
        ...preState.error,
        [key]: error,
      },
    }));
  }

  onSubmit(event) {
    event.preventDefault();
    const { signUp, signUpSuccess } = this.props;
    const { data } = this.state;

    requestApi
      .post(`/users`, {
        email: data.email,
        password: data.password,
        username: data.name,
        postcode: data.postCode,
        userType: 0,
      })
      .then((res) => {
        signUpSuccess(res);
      })
      .catch((err) => {
        const msg = errorSimplify(err);
        signUp(msg);
      });
  }

  closeModal() {
    this.setState({
      showModal: '',
    });
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { data, error, showModal } = this.state;
    const { signUpFail } = this.props;
    return (
      <Form onSubmit={this.onSubmit}>
        <FormItem label="Email" htmlFor="signUp-modal-email">
          <Input
            name="email"
            value={data.email}
            onChange={this.handleDataChange}
            error={error.email}
            id="signUp-modal-email"
            placeholder="Email"
          />
          <Error>{error.email}</Error>
        </FormItem>

        <FormItem label="Password" htmlFor="sign-up-modal-password">
          <Input
            name="password"
            value={data.password}
            onChange={this.handleDataChange}
            type="password"
            error={error.password}
            id="sign-up-modal-password"
            placeholder="Password"
          />
          <Error>{error.password}</Error>
        </FormItem>

        <FormItem label="Confirm password" htmlFor="sign-up-modal-confirm-password">
          <Input
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={this.handleDataChange}
            type="password"
            error={error.confirmPassword}
            id="sign-up-modal-confirm-password"
            placeholder="Confirm Password"
          />
          <Error>{error.confirmPassword}</Error>
        </FormItem>

        <FormItem label="Name" htmlFor="signUp-modal-name">
          <Input
            name="name"
            value={data.name}
            onChange={this.handleDataChange}
            error={error.name}
            id="signUp-modal-name"
            placeholder="Name"
          />
          <Error style={{ textAlign: 'left' }}>{error.name}</Error>
        </FormItem>

        <FormItem label="Post Code" htmlFor="signUp-modal-postCode">
          <Input
            name="postCode"
            value={data.postCode}
            onChange={this.handleDataChange}
            type="text"
            error={error.postCode}
            id="signUp-modal-postCode"
            placeholder="Post Code"
          />

          <Error>{error.postCode}</Error>
        </FormItem>

        {signUpFail !== '' && (
          <Error style={{ textAlign: 'center', fontSize: '20px' }}>{signUpFail}</Error>
        )}
        <ButtonMargin>
          <Button size="lg" variant="green" type="submit">
            Join Easy Cleaner
          </Button>
        </ButtonMargin>
      </Form>
    );
  }
}
