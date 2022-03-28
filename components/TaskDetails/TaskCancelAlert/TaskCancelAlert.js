import React from 'react';
import styled from 'styled-components';
import Button from '../../Button';

const AlertTaskInfoWrap = styled.div`
  display: block;
`;
const AlertTaskInfoContent = styled.div`
  background-color: rgb(229, 240, 217);
  padding: 12px;
  display: flex;
  flex-flow: row wrap;
  -webkit-box-pack: justify;
  justify-content: space-between;
`;

const TaskCancelInfoLeft = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 0 1 auto;
  flex-flow: row;
  -webkit-box-pack: start;
  justify-content: flex-start;
  align-content: unset;
  align-items: flex-start;
  align-self: unset;
  margin: 0px;
  padding: 0px;
  border-radius: 0px;
  border-width: 0px;
  border-color: rgb(41, 43, 50);
`;
const IconContainer = styled.div`
  margin-top: 4px;
  margin-right: 8px;
`;
const IconAlert = styled.svg`
  fill: rgb(125, 179, 67);
  width: 32px;
  height: 32px;
`;

const AlertInfo = styled.p`
  color: rgb(41, 43, 50);
  font-family: museo-regular, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
  font-size: 14px;
  font-weight: initial;
  line-height: 20px;
  letter-spacing: 0.25px;
  overflow-wrap: break-word;
  word-break: break-word;
  text-decoration: initial;
  text-align: initial;
  vertical-align: initial;
  font-style: initial;
  white-space: initial;
  margin: 0px;
  padding: 10px 0px 8px;
`;

const TaskAlertRight = styled.div`
  margin-left: auto;
`;

const TaskAlertButtonContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 0 1 auto;
  flex-flow: row wrap;
  -webkit-box-pack: start;
  justify-content: flex-start;
  align-content: unset;
  -webkit-box-align: center;
  align-items: center;
  align-self: unset;
  margin: 0px;
  padding: 0px;
  border-radius: 0px;
  border-width: 0px;
  border-color: rgb(41, 43, 50);
`;

export default function TaskCancelAlert({ rePostTask }) {
  return (
    <AlertTaskInfoWrap>
      <AlertTaskInfoContent>
        <TaskCancelInfoLeft>
          <IconContainer>
            <IconAlert>
              <path
                d="M12 1.25A10.75 10.75 0 1022.75 
                    12 10.76 10.76 0 0012 1.25zm4.53 8.48L11 
                    15.33a.75.75 0 01-.53.22.74.74 0 01-.54-.26l-2.49-2.78a.75.75 0 
                    111.12-1l1.91 2.18 5-5a.75.75 0 011.06 1.06z"
              />
            </IconAlert>
          </IconContainer>
          <AlertInfo>This task has been cancelled.</AlertInfo>
        </TaskCancelInfoLeft>
        <TaskAlertRight>
          <TaskAlertButtonContainer>
            <Button size="sm" variant="green" onClick={rePostTask}>
              Repost this task
            </Button>
          </TaskAlertButtonContainer>
        </TaskAlertRight>
      </AlertTaskInfoContent>
    </AlertTaskInfoWrap>
  );
}
