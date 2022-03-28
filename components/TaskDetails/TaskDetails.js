/* eslint-disable no-fallthrough */
/* eslint-disable object-shorthand */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-children-prop */
import React from 'react';
import styled from 'styled-components';
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaFlag,
  FaClock,
} from 'react-icons/fa';
import AvatarIcon from '../AvatarIcon';
import Button from '../Button';
import breakpoint from '../breakpoint';
import Modal from '../Modal';
import MakeOffer from '../MakeOffer';
import OfferDetails from '../OfferDetails';
import requestApi from '../../api/fetchDetails';
import TimeAgo from '../../helper/TimeAgo';
import Dropdown from '../Dropdown';
import PostTask from '../PostTask';
import TaskCancelAlert from './TaskCancelAlert';
import TaskCancelConfirmModal from './TaskCancelConfirmModal';
import taskCancelApi from '../../api/cancelTaskApi';
import ButtonControl from './ButtonControl/ButtonControl';
import CompleteTaskModal from './CompleteTaskModal/CompleteTaskModal';
import ReviewOffer from './ReviewOffer';
import getTimeString from '../../helper/workingTime';
import findLocation from '../../helper/findLocation';

const TaskDetail = styled.div`
  //overflow-x: hidden;
  overflow-y: scroll;
  position: absolute;
  transition-delay: 0.1s;
  transition: left 0.5s ease-out;
  bottom: 0;
  left: ${(props) => (props.showDetails ? '0vw' : '100vw')};
  z-index: 0;
  width: 100%;
  height: calc(100vh - 60px);
  background-color: white;
  @media screen and (max-width: 900px) {
    position: fixed;
    width: 100vw;
    height: calc(100vh - 60px);
    top: 60px;
    bottom: 0;
    z-index: 1;
  }
`;

const TaskDetailHeader = styled.div`
  display: flex;
  margin: 10px 20px;
  @media screen and (${breakpoint.device.xs}) {
    flex-direction: column;
  }
  flex-direction: row;
`;

const DetailsPanel = styled.div`
  margin-top: 20px;
  position: relative;
  flex: 70%;
`;

const StatusBar = styled.div`
  height: 20px;
  margin-bottom: 20px;
  flex: 30%;
`;

const PostDetail = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;
const PostItem = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 10px;
  &::before {
    background-color: #f6f8fd;
    content: '';
    display: block;
    height: 1.5px;
    left: 40px;
    position: absolute;
    right: 5px;
    bottom: 0;
  }
`;

const User = styled.a`
  color: #008fb4;
  cursor: pointer;
  text-decoration: none;
`;
const Avatar = styled.div`
  padding-right: 8px;
`;
const PostTime = styled.div`
  position: absolute;
  bottom: 15px;
  position: absolute;
  right: 5px;
  color: #292b32;
`;
const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  margin: 10px 10px;
  width: 220px;
`;
const PaymentPanel = styled.div`
  border-color: rgb(187, 194, 220);
  border-width: 1px;
  border-style: solid;
  border-radius: 8px;
  text-align: center;
  padding: 10px;
`;
const PaymentPrice = styled.h2`
  padding: 14px 0px;
  //font-weight: 600;
  font-size: 2rem;
`;

const TaskShare = styled.div`
  border-radius: 6px;
  border: 1px solid rgb(231, 235, 251);
  margin-top: 20px;
  position: relative;
  text-align: center;
  padding: 10px;
  p {
    position: absolute;
    top: -10px;
    left: 35%;
  }
`;

const FlagContent = styled.div`
  text-align: center;
  color: #bbc2dc;
  cursor: pointer;
  font-size: 12px;
  margin-top: 10px;
  span {
    margin-left: 10px;
  }
  &:hover {
    color: #545a77;
  }
`;

const Disclaimer = styled.div`
  margin: 10px;
  font-size: 14px;
  a {
    color: rgb(0, 143, 180);
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;
const TaskDetailBody = styled.div`
  line-height: 1.4;
`;
const Details = styled.div`
  max-height: 253px;
  overflow-y: hidden;
  transition: max-height 0.3s ease-out 0s;
  position: relative;
  overflow-wrap: break-word;
  word-break: break-word;
  margin: 35px 20px;
  div {
    padding: 5px;
  }
`;

const OfferContent = styled.div`
  position: relative;
  margin: 0 20px;
  padding-bottom: 15px;
`;

const moreOptionsList = [
  {
    key: 'taskEdit',
    value: 'Edit task',
  },
  {
    key: 'taskCancel',
    value: 'Cancel task',
  },
  {
    key: 'similarTaskPost',
    value: 'Post a similar task',
  },
];

class TaskDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskDetail: undefined,
      showModal: undefined,
      // eslint-disable-next-line react/no-unused-state
      showUserPermission: true,
      cancelTask: false,
      // eslint-disable-next-line react/no-unused-state
      offerMade: undefined,
      offerData: undefined,
      moreOptions: undefined,
    };
    this.completeTask = this.completeTask.bind(this);
  }

  componentDidMount() {
    const { taskId } = this.props;
    const userInfo = localStorage.getItem('oor-jwt');
    if (userInfo == null) {
      this.handleUserStatus();
    }
    requestApi
      .get(`/tasks/${taskId}`)
      .then((res) => res.data)
      .then(this.handleTaskChange);
  }

  componentDidUpdate(prevProps) {
    const { taskId } = this.props;
    const getTaskDetails = () => {
      const userInfo = localStorage.getItem('oor-jwt');

      if (userInfo == null) {
        this.handleUserStatus();
      }
      return requestApi.get(`/tasks/${taskId}`).then((res) => res.data);
    };
    if (prevProps.taskId !== taskId) {
      getTaskDetails().then(this.handleTaskChange);
    }
  }

  handleUserStatus = () => {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      showUserPermission: false,
    });
  };

  reviewOffer = () => {
    this.closeModal();
  };

  completeTask = () => {
    const { offerData, taskDetail } = this.state;
    const offerId = offerData._id;
    const taskId = taskDetail._id;
    const newOfferData = { ...offerData, completed: true };
    const promise1 = requestApi.put(`/tasks/${taskId}/status/completed`);
    const promise2 = requestApi.put(`/offers/${offerId}`, newOfferData);
    Promise.all([promise1, promise2]).then(() => {
      this.closeModal();
    });
  };

  handleMoreOptions = (item) => {
    this.setState({
      showModal: item.key,
    });
  };

  closeModal = () => {
    this.showModal(undefined);
  };

  // Check the
  cancelTaskSuccess = () => {
    this.setState({
      cancelTask: true,
      showModal: undefined,
    });
  };

  cancelTaskError = (err) => {
    if (err) {
      this.setState({
        cancelTask: false,
        showModal: 'cancelTaskFail',
      });
    }
  };

  monitorMoreOptions = () => {
    const { user } = this.props;
    const { taskDetail } = this.state;

    if (
      user.id === taskDetail.clientId._id &&
      (taskDetail.status === '' || taskDetail.status === 'open')
    ) {
      this.setState({
        moreOptions: moreOptionsList,
      });
    } else {
      this.setState({
        moreOptions: [
          {
            key: 'similarTaskPost',
            value: 'Post a similar task',
          },
        ],
      });
    }
  };

  handleTaskCancelConfirm = () => {
    const { taskId } = this.props;
    taskCancelApi(taskId, this.cancelTaskSuccess, this.cancelTaskError);
  };

  rePostTask = () => {
    this.setState({
      cancelTask: false,
      showModal: 'rePostTask',
    });
  };

  handleShowModalChange = (newShowModal) => {
    this.setState({
      showModal: newShowModal,
    });
  };

  // 传入res data作为新的taskDetail的state
  handleTaskChange = (newTaskDetail) => {
    this.setState({
      taskDetail: newTaskDetail,
    });
    this.monitorMoreOptions();
    this.checkOfferExist();
  };

  showModal = (e) => {
    this.setState({
      showModal: e,
    });
  };

  offerCreated = (offer) => {
    const { taskDetail } = this.state;
    taskDetail.offers.push(offer);
    this.setState({ taskDetail: taskDetail });
    window.location.reload(false);
  };

  checkOfferExist = () => {
    const { taskDetail } = this.state;
    const { user } = this.props;
    if (taskDetail.offers.some((offerItem) => offerItem.user._id === user.id)) {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ offerMade: true });
    }
  };

  offerUpdated = (offer, offerId) => {
    const { taskDetail } = this.state;
    // eslint-disable-next-line no-shadow
    const offerFind = taskDetail.offers.find((offer) => offer._id === offerId);
    if (offerFind) {
      offerFind.priceOffer = offer.priceOffer;
      offerFind.offerComment = offer.offerComment;
    }
    this.setState({ taskDetail: taskDetail });
  };

  handleButtonClick = (cmd, info) => {
    this.showModal(cmd);
    switch (cmd) {
      case 'acceptOffer':
        this.setState({
          // eslint-disable-next-line react/no-unused-state
          myOwnTask: 'acceptOffer',
        });
        break;
      case 'updateOffer':
      case 'cancelOffer':
      case 'completeTask':
      case 'confirmComplete':
      case 'reviewOffer':
        this.setState({
          offerData: info,
        });
        break;
      default:
        break;
    }
  };

  renderTaskStatus = (status) => {
    const t = 'offerStatusTrue';
    const f = 'offerStatusFalse';
    const buttonStatus = [
      ['', t, f, f],
      ['open', t, f, f],
      ['assigned', f, t, f],
      ['completed', f, f, t],
    ];
    const a = buttonStatus.find((e) => e[0] === status);
    return (
      <StatusBar>
        <Button size="xs" variant={a[1]}>
          OPEN
        </Button>
        <Button size="xs" variant={a[2]}>
          ASSIGNED
        </Button>
        <Button size="xs" variant={a[3]}>
          COMPLETED
        </Button>
      </StatusBar>
    );
  };

  completeTask = () => {
    const { offerData, taskDetail } = this.state;
    const offerId = offerData._id;
    const taskId = taskDetail._id;
    const newOfferData = { ...offerData, completed: true };
    const promise1 = requestApi.put(`/tasks/${taskId}/status/completed`);
    const promise2 = requestApi.put(`/offers/${offerId}`, newOfferData);
    Promise.all([promise1, promise2]).then(() => {
      this.closeModal();
      window.location.reload(false);
    });
  };

  render() {
    const { taskDetail, showModal, cancelTask, offerData, moreOptions } = this.state;
    const { taskId, showDetails, user } = this.props;
    const { id } = user;

    if (!taskDetail) {
      return 'Loading details';
    }

    return (
      <TaskDetail showDetails={showDetails}>
        <div className="TaskDetailScroller">
          {cancelTask && <TaskCancelAlert rePostTask={this.rePostTask} />}
          <TaskDetailHeader>
            <DetailsPanel>
              {this.renderTaskStatus(taskDetail.status)}
              <h1>{taskDetail.title}</h1>
              <PostDetail>
                <PostItem>
                  <Avatar>
                    <AvatarIcon userAvatar={taskDetail.clientId.username} />
                  </Avatar>
                  <div>
                    <div>POSTED BY</div>
                    <User>{taskDetail.clientId.username}</User>
                  </div>
                  <PostTime>{TimeAgo(taskDetail.createdAt)}</PostTime>
                </PostItem>
                <PostItem>
                  <FaMapMarkerAlt className="icon" />
                  <div>
                    <div>LOCATION</div>
                    <div>{findLocation(taskDetail.postCode)}</div>
                  </div>
                </PostItem>
                <PostItem>
                  <FaCalendarAlt className="icon" />
                  <div>
                    <div>DUE DATE</div>
                    <div>{taskDetail.dueDate}</div>
                  </div>
                </PostItem>
                <PostItem>
                  <FaClock className="icon" />
                  <div>
                    <div>{getTimeString(taskDetail.workingTime)}</div>
                  </div>
                </PostItem>
              </PostDetail>
              <Disclaimer>
                <b>GOVERNMENT COVID-19 RESTRICTIONS</b>
                <p>
                  Your task may be impacted. See <a href="/">Safety Centre</a> for info.
                </p>
              </Disclaimer>
            </DetailsPanel>

            <Sidebar>
              <PaymentPanel>
                <div>TASK BUDGET</div>
                <PaymentPrice>${taskDetail.priceBudget}</PaymentPrice>
                {ButtonControl(user, taskDetail, this.handleButtonClick)}
              </PaymentPanel>

              {/** Offer CUD */}
              {showModal === 'makeOffer' && (
                <Modal onClose={this.closeModal} title="Make an Offer">
                  <MakeOffer
                    task={taskId}
                    userId={user.id /* taskDetail.clientId */}
                    onClose={this.closeModal}
                    offerCreated={this.offerCreated}
                  />
                </Modal>
              )}
              {showModal === 'updateOffer' && (
                <Modal onClose={this.closeModal} title="Update the Offer">
                  <MakeOffer
                    task={taskId}
                    userId={user.id /* taskDetail.clientId */}
                    onClose={this.closeModal}
                    updateData={offerData}
                    // eslint-disable-next-line react/jsx-boolean-value
                    edit={true}
                    offerCreated={this.offerUpdated}
                  />
                </Modal>
              )}

              {/** Task CUD */}
              {showModal === 'similarTaskPost' && (
                <Modal onClose={this.closeModal} title="Post A Task">
                  <PostTask taskId={taskId} userId={id} onClose={this.closeModal} />
                </Modal>
              )}
              {showModal === 'taskEdit' && (
                <Modal onClose={this.closeModal} title="Edit this Task">
                  {/* eslint-disable-next-line react/jsx-boolean-value */}
                  <PostTask taskId={taskId} userId={id} onClose={this.closeModal} edit={true} />
                </Modal>
              )}
              {showModal === 'taskCancel' && (
                <Modal onClose={this.closeModal} title="Cancel Task" width="40%">
                  <TaskCancelConfirmModal
                    onClose={this.closeModal}
                    taskCancelConfirm={this.handleTaskCancelConfirm}
                  />
                </Modal>
              )}

              {showModal === 'reviewOffer' && (
                <Modal onClose={this.closeModal} width="40%" title="Review this task">
                  <ReviewOffer onClose={this.closeModal} reviewOffer={this.reviewOffer} />
                </Modal>
              )}

              {showModal === 'completeTask' && (
                <Modal onClose={this.closeModal} width="40%" title="Complete this Task">
                  <CompleteTaskModal onClose={this.closeModal} completeTask={this.completeTask} />
                </Modal>
              )}

              <Dropdown
                items={moreOptions}
                title="More Options"
                handleClick={this.handleMoreOptions}
              />

              <TaskShare>
                <p>SHARE</p>
                <div>
                  <FaFacebookF className="icon-share" />
                  <FaTwitter className="icon-share" />
                  <FaLinkedinIn className="icon-share" />
                </div>
              </TaskShare>
              <FlagContent>
                <FaFlag />
                <span>Report this task</span>
              </FlagContent>
            </Sidebar>
          </TaskDetailHeader>

          <TaskDetailBody>
            <Details>
              <p>DETAILS</p>
              <div>{taskDetail.detail}</div>
            </Details>
          </TaskDetailBody>
          <div className="task-detail-offer">
            <OfferContent>
              <p>OFFERS</p>
              <OfferDetails
                offerUpdated={this.offerUpdated}
                user={user}
                taskDetail={taskDetail}
                offers={taskDetail.offers}
              />
            </OfferContent>
          </div>
        </div>
      </TaskDetail>
    );
  }
}

export default TaskDetails;
