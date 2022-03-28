import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '../Button';
import api from '../../api/fetchDetails';

const ErrorMessage = styled.p`
  color: red;
`;

const FormTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const initialErrorState = {
  passwordError: '',
};
const ResponsiveButton = styled(Button)`
  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;

export default class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeValues = this.onChangeValues.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.validate = this.validate.bind(this);
    this.sendUserInfo = this.sendUserInfo.bind(this);
    this.setValues = this.setValues.bind(this);
    this.getUserDataWithId = props.getUserDataWithId;

    this.state = {
      username: '',
      email: '',
      mobile: '',
      password: '',
      postcode: '',
      description: '',
      confirmedPassword: '',
      passwordError: '',
      id: '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    // const { getUserDataWithId } = this.props;
    const isValid = this.validate();
    if (isValid) {
      this.setState(initialErrorState);
      this.sendUserInfo();
      // getUserDataWithId();
      this.setValues();
      this.handleClose();
    }
  }

  onChangeValues(e) {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  }

  handleClickOpen = async () => {
    await this.setValues();
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  setValues = () => {
    const { user } = this.props;
    const { userName, email, mobile, description, postcode, id } = user;
    this.setState({
      username: userName,
      email,
      mobile,
      description,
      postcode,
      id,
    });
  };

  sendUserInfo = () => {
    const { id } = this.state;
    api.put(`users/${id}`, this.state);
  };

  // eslint-disable-next-line consistent-return
  validate = () => {
    const { password, confirmedPassword } = this.state;
    let passwordError = '';
    if (password !== confirmedPassword) {
      passwordError = 'Passwords do not match.';
      this.setState({ passwordError });
      return false;
    }
    if (password === confirmedPassword) {
      return true;
    }
  };

  render() {
    const {
      open,
      // username,
      password,
      confirmedPassword,
      passwordError,
      // email,
      // postcode,
      mobile,
      description,
    } = this.state;
    const { user } = this.props;
    const { eMail, userName, postCode } = user;

    return (
      <>
        <ResponsiveButton onClick={this.handleClickOpen} size="sm" variant="grey">
          Edit Profile
        </ResponsiveButton>
        <Dialog open={open} onClose={this.handleClose} aria-label="form-dialog-title">
          <form>
            <FormTitleContainer>
              <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
              <IconButton aria-label="close" onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>
            </FormTitleContainer>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="username"
                name="username"
                label="Name"
                type="username"
                value={userName}
                fullWidth
                onChange={this.onChangeValues}
              />
              <TextField
                autoFocus
                margin="dense"
                id="password"
                name="password"
                label="Password"
                type="password"
                value={password}
                fullWidth
                onChange={this.onChangeValues}
              />
              <TextField
                autoFocus
                margin="dense"
                id="confirmedPassword"
                name="confirmedPassword"
                label="Confirmed Password"
                type="password"
                value={confirmedPassword}
                fullWidth
                onChange={this.onChangeValues}
              />
              <ErrorMessage>{passwordError}</ErrorMessage>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                type="email"
                value={eMail}
                fullWidth
                onChange={this.onChangeValues}
                disabled
              />
              <TextField
                autoFocus
                margin="dense"
                id="postcode"
                name="postcode"
                label="Postcode"
                type="postcode"
                value={postCode}
                fullWidth
                onChange={this.onChangeValues}
              />
              <TextField
                autoFocus
                margin="dense"
                id="mobile"
                name="mobile"
                label="Mobile"
                type="mobile"
                value={mobile}
                fullWidth
                onChange={this.onChangeValues}
              />
              <TextField
                autoFocus
                margin="dense"
                id="description"
                name="description"
                label="Description"
                type="description"
                value={description}
                onChange={this.onChangeValues}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button size="md" variant="grey" onClick={this.handleClose}>
                Cancel
              </Button>
              <Button onClick={this.handleSubmit} size="md" variant="green">
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </>
    );
  }
}
