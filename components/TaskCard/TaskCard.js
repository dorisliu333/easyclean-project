import React from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';
import breakpoint from '../breakpoint';
import AvatarIcon from '../AvatarIcon';
import './icon.css';
import getTimeString from '../../helper/workingTime';
import findLocation from '../../helper/findLocation';

const CardContainer = styled.div`
  box-shadow: 0 1px rgb(187 194 220 / 60%);
  display: block;
  opacity: 1;
  padding: 0 12px;
  overflow: hidden;
  background: #fff;
  //position: relative;
  border-radius: 4px;
  margin: 10px 7px 10px 0;
  box-sizing: border-box;
  transition: box-shadow 0.1s ease-out;
  cursor: pointer;
  border: 1px solid transparent;
  border-left: ${(props) => (props.status === 'assigned' ? '4px solid grey' : '4px solid #7db343')};

  z-index: 0;
  &:hover {
    box-shadow: 3px 5px 8px rgb(187 194 220 / 60%);
  }
  @media screen and (${breakpoint.device.sm}) and (${breakpoint.device.ml}) {
    margin: 10px auto;
    max-width: 500px;
  }
`;

const TaskHeader = styled.div`
  display: flex;
  margin: 10px 0 5px;
`;

const TaskTitle = styled.span`
  font-weight: 300;
  flex-grow: 1;
  font-size: 17px;
  line-height: 20px;
  color: #292b32;
  word-break: break-word;
`;

const TaskPrice = styled.div`
  font-weight: 500;
  float: right;
  font-size: 24px;
  margin-left: 10px;
  line-height: 24px;
  color: #292b32;
`;

const TaskBody = styled.div`
  margin: 5px 0 10px;
  min-height: 34px;
`;

/* Could use same components */
const TaskFooter = styled.div`
  height: 32px;
  font-size: 11px;
  line-height: 32px;
  box-sizing: border-box;
  border-top: 1px solid #e7ebfb;
`;

const TaskStatus = styled.span`
  font-weight: 700;
  text-transform: uppercase;
`;

const TaskBids = styled.span`
  color: #545a77;
  margin-left: 10px;
  position: relative;
  &::before {
    content: ' ';
    position: absolute;
    width: 2px;
    height: 2px;
    background-color: #545a77;
    border-radius: 50%;
    left: -6px;
    top: 50%;
    margin-top: -1px;
  }
`;
class TaskCard extends React.PureComponent {
  render() {
    const { taskInfo, getTaskId } = this.props;
    // const {status} = taskInfo;
    return (
      <CardContainer
        // eslint-disable-next-line no-underscore-dangle
        taskId={taskInfo._id}
        // eslint-disable-next-line no-underscore-dangle
        onClick={() => getTaskId(taskInfo._id)}
        status={taskInfo.status}
      >
        <TaskHeader>
          <TaskTitle>{taskInfo.title}</TaskTitle>
          <TaskPrice>
            <span>$ {taskInfo.priceBudget}</span>
          </TaskPrice>
        </TaskHeader>
        <TaskBody className="card-content">
          <div className="Avaicon">
            <div>
              <div>
                <FaMapMarkerAlt className="icon" />
                <span>{findLocation(taskInfo.postCode)}</span>
              </div>
              <div>
                <FaCalendarAlt className="icon" />
                <span>{taskInfo.dueDate}</span>
              </div>
              <div>
                <FaClock className="icon" />
                <span>{getTimeString(taskInfo.workingTime)}</span>
              </div>
            </div>
            <div>
              <AvatarIcon />
            </div>
          </div>
          <TaskFooter>
            <TaskStatus>{taskInfo.status}</TaskStatus>
            <TaskBids>{taskInfo.offers.length} offers</TaskBids>
          </TaskFooter>
        </TaskBody>
      </CardContainer>
    );
  }
}

export default TaskCard;
