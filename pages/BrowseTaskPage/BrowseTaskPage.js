import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Link, withRouter } from 'react-router-dom';
import TaskCard from '../../components/TaskCard';
import TaskDetails from '../../components/TaskDetails';
import MapView from '../../components/MapView';
import fetchTasks from '../../api/fetchDetails';
import Button from '../../components/Button';

const AppContainer = styled.div`
  height: 100%;
  background-color: #f6f8fd;
  color: #545a77;
  font-family: museo_sans, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
  font-size: 14px;
  font-weight: 300;
  line-height: 1.4;
  margin: 0 auto;
  padding: 0;
  height: 100vh;
  position: relative;
`;
const Content = styled.div`
  max-width: 1024px;
  box-sizing: content-box;
  margin: 0 auto;
  position: relative;
  display: flex;
  height: calc(100vh - 60px);
  top: 60px;
  transition: left 0.5s ease-in-out;
  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

const LeftListView = styled.div`
  border-right: 0;
  @media screen and (max-width: 900px) {
    width: 90%;
    margin: 0 auto;
    z-index: 0;
  }
`;
const CardContainer = styled.div`
  border-right: 0;
  @media screen and (max-width: 400px) {
    width: 100vw;
  }
`;
const CardList = styled.div`
  height: calc(100vh - 94px);
  overflow-y: scroll;
`;
const RightView = styled.div`
  height: 100%;
  width: 100%;
  flex: 1;
  position: relative;
  transition: left 0.5s ease-in;
  z-index: 0;
  @media screen and (max-width: 400px) {
    display: none;
  }
`;

const getTasks = () => fetchTasks.get(`/tasks`).then((res) => res.data);
class BrowseTaskPage extends React.Component {
  constructor(props) {
    // eslint-disable-next-line no-console
    console.log(props);
    super(props);
    this.state = {
      taskList: undefined,
      showDetails: true,
    };
  }

  componentDidMount() {
    getTasks().then(this.handleLoadTasks);
  }

  getTaskId = (taskId) => {
    this.setState({
      showDetails: true,
    });
    // eslint-disable-next-line react/destructuring-assignment
    this.props.match.params.taskId = taskId;
    return taskId;
  };

  handleLoadTasks = (newTaskList) => {
    this.setState({
      taskList: newTaskList,
    });
  };

  render() {
    const { taskList, showDetails } = this.state;
    const { isLogIn, user } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    const { taskId } = this.props.match.params;
    if (!taskList) {
      return 'Loading...';
    }
    return (
      <Router>
        <AppContainer>
          <Content>
            <LeftListView>
              {/* <Button
                size="md"
                variant="square"
                style={{ left: "190px", zIndex: "0" }}
              >
                {" "}
                NEW TASKS
              </Button> */}
              <CardContainer>
                <Button size="md" variant="left">
                  NEW TASKS
                </Button>
                <CardList>
                  {taskList.map((taskItem) => (
                    /* eslint-disable-next-line no-underscore-dangle */
                    <Link to={`/browse-tasks/${taskItem._id}`} key={taskItem._id}>
                      <TaskCard taskInfo={taskItem} getTaskId={this.getTaskId} />
                    </Link>
                  ))}
                </CardList>
              </CardContainer>
            </LeftListView>
            <RightView>
              <MapView getTaskId={this.getTaskId} />
              {
                /* logInUser={logInUser}
                    isLogIn={isLogIn}
                    handleLoginState={handleLoginState} */
                taskId && (
                  <TaskDetails
                    loginStatus={isLogIn}
                    user={user}
                    taskId={taskId}
                    className="task-details"
                    showDetails={showDetails}
                  />
                ) // 根据点击card，拿到params里的taskId，assign到taskdetails中
              }
            </RightView>
          </Content>
        </AppContainer>
      </Router>
    );
  }
}

export default withRouter(BrowseTaskPage);
