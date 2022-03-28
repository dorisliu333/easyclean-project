import React, { Component } from 'react';
import styled from 'styled-components';
import FormItem from '../FormItem';
import Button from '../Button';
import { Form, Input, Error } from '../Input';

const ButtonMargin = styled.div`
  padding: 0px;
  margin-top: 20px;
  margin-bottom: 16px;
`;

const ERROR_INFO = {
  email: {
    noInput: 'Please input your Email',
    wrongEmail: 'Please input a valid email',
  },
  password: {
    noInput: 'Please input the password',
    default: '',
  },
  default: '',
};

const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;

const validateNew = (key, data) => {
  const value = data[key];
  if (!value) {
    return ERROR_INFO[key].noInput;
  }
  return key === 'email' && !EMAIL_REGEXP.test(value) && ERROR_INFO[key].wrongEmail;
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: '',
        password: '',
      },
      error: {},
      showModal: '',
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
        const error = validateNew(name, data);
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

  onSubmit(e) {
    const { logIn, logInFail } = this.props;
    const { data } = this.state;
    const { email, password } = data;
    e.preventDefault();
    logIn(email, password);
    if (logInFail !== 'Normal') {
      this.setState({
        showModal: 'loginFail',
      });
    }
  }

  closeModal() {
    this.setState({
      showModal: '',
    });
  }

  render() {
    const { logInFail } = this.props;
    const { data, error, showModal } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <FormItem label="Email" htmlFor="logIn-modal-email">
          <Input
            name="email"
            value={data.email}
            onChange={this.handleDataChange}
            error={error.email}
            placeholder="Email"
            id="logIn-modal-email"
          />
          <Error>{error.email}</Error>
        </FormItem>
        <FormItem label="Password" htmlFor="logIn-modal-password">
          <Input
            name="password"
            value={data.password}
            onChange={this.handleDataChange}
            placeholder="Password"
            type="password"
            error={error.password}
            id="logIn-modal-password"
          />
          <Error>{error.password}</Error>
        </FormItem>
        <ButtonMargin>
          <Button type="submit" variant="green" size="lg">
            Log in
          </Button>
        </ButtonMargin>
        {showModal === 'loginFail' && (
          <Error style={{ textAlign: 'center', fontSize: '20px' }}>{logInFail}</Error>
        )}
      </Form>
    );
  }
}
