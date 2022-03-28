import styled, { css } from 'styled-components';

const Form = styled.form`
  width: ${(props) => props.width};
  margin: auto;
  padding: 10px 20px;
  @media screen and (min-width: 900px) {
    width: 375px;
  }
`;

const Input = styled.input`
  box-sizing: border-box;
  resize: none;
  display: block;
  border: 1px solid rgb(187, 194, 220);
  box-shadow: none;
  animation: 0s ease 0s 1 normal none running none;
  margin: 0px;
  box-sizing: border-box;
  appearance: none;
  width: 100%;
  color: rgb(41, 43, 50);
  font-family: museo-regular, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
  font-size: 14px;
  font-weight: initial;
  line-height: 20px;
  letter-spacing: 0.25px;
  padding: 12px;
  border-radius: 4px;
  min-height: 48px;

  &:hover {
    border-color: rgb(0, 86, 194);
    border-width: 1px;
    border-style: solid;
  }

  &:focus {
    outline: none;
  }

  ${(props) =>
    props.error &&
    css`
      border-color: rgb(231, 82, 69);
    `}
`;

const Error = styled.p`
  display: block;
  color: rgb(231, 82, 69);
  font-family: museo-bold, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.25px;
  margin-top: 8px;
`;

const validate = (key, data) => {
  const { value } = data[key];

  switch (key) {
    case 'email': {
      if (!value) {
        return 'Please input your Email';
      }
      const EMAIL_REGEXP =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;
      if (!EMAIL_REGEXP.test(value)) {
        return 'Please input a valid email';
      }
      return '';
    }

    case 'password': {
      if (!value) {
        return 'Please input the password';
      }
      return '';
    }

    case 'confirmPassword': {
      if (!value) {
        return 'Please input your confirm password';
      }

      if (value !== data.password) {
        return 'Confirm password does not match to password';
      }

      return '';
    }

    case 'name': {
      if (!value) {
        return 'Please input the name of user';
      }
      return '';
    }

    case 'postCode': {
      if (!value) {
        return 'Please input the postcode of user';
      }
      return '';
    }

    case 'taskTitle':
    case 'taskDetail':
    case 'offerPrice':
    case 'offerComment':
    case 'dueDate': {
      if (!value) {
        return 'This field must be filled';
      }
      return '';
    }

    case 'taskCategory':
    case 'workingTime': {
      if (!value) {
        return 'Please select one';
      }
      return '';
    }

    default:
      return '';
  }
};

export { Form, Input, Error, validate };
