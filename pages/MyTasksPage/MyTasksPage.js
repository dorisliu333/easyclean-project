import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Link, withRouter } from 'react-router-dom';
import TaskCard from '../../components/TaskCard';
import TaskDetails from '../../components/TaskDetails';
import MapView from '../../components/MapView';
import fetchTasks from '../../api/fetchDetails';

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
  flex-direction: row-reverse;
  height: calc(100vh - 60px);
  top: 60px;
  transition: left 0.5s ease-in-out;
`;

const LeftListView = styled.div`
  border-right: 0;
  width: 380px;
  overflow-y: scroll;
`;

const CardState = styled.div`
  -webkit-font-smoothing: antialiased;
  background-color: transparent;
  border: 0;
  font-size: 11px;
  font-weight: 700;
  margin: 10px 0 0 0;
  padding: 0;
  text-transform: uppercase;
`;

const CardList = styled.div`
  height: calc(100vh - 60px);
`;

const RightView = styled.div`
  height: 100%;
  width: 100%;
  flex: 1;
  position: relative;
  transition: left 0.5s ease-in;
`;

const getTasks = () => fetchTasks.get(`/tasks`).then((res) => res.data);
class MyTasksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: undefined,
      showDetails: false,
    };
  }

  componentDidMount() {
    getTasks().then(this.handleLoadTasks);
  }

  handleLoadTasks = (myTaskList) => {
    this.setState({
      taskList: myTaskList,
    });
  };

  getTaskId = (taskId) => {
    this.setState({
      showDetails: true,
    });
    // eslint-disable-next-line react/destructuring-assignment
    this.props.match.params.taskId = taskId;
    return taskId;
  };

  render() {
    const { taskList, showDetails } = this.state;
    const { user } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    const { taskId } = this.props.match.params;
    // eslint-disable-next-line react/destructuring-assignment
    const userId = user.id;

    if (!taskList) {
      return 'Loading...';
    }
    return (
      <Router>
        <AppContainer>
          <Content>
            <RightView>
              <MapView />
              {taskId && (
                <TaskDetails
                  user={user}
                  taskId={taskId}
                  className="task-details"
                  showDetails={showDetails}
                />
              )}
            </RightView>
            <LeftListView>
              <CardState>OPEN TASKS</CardState>
              <CardList>
                {taskList
                  .filter((taskItem) => taskItem.clientId === userId)
                  .map((taskItem) => (
                    // eslint-disable-next-line no-underscore-dangle
                    <Link to={`/mytasks/${taskItem._id}`} key={taskItem._id}>
                      <TaskCard taskInfo={taskItem} getTaskId={this.getTaskId} />
                    </Link>
                  ))}
              </CardList>
            </LeftListView>
          </Content>
        </AppContainer>
      </Router>
    );
  }
}

export default withRouter(MyTasksPage);
