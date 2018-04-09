import React, { Component } from 'react';

import Layout from "./companents/layout";
import Header from "./companents/header";
import TaskList from "./companents/tasklist";

import * as S from "./lib/taskstatus";
import { getTaskList, createNewTask, updateTask } from "./lib/api-fetch-helpers";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: "",
      isLoading: false,
      tasks: []
    };
  };

  componentWillMount() {
    this.setState({isLoading: true});
    getTaskList()
      .then(tasks => {
        this.setState({tasks, isLoading: false})
      })
      .catch(error => {
        this.setState({
          error: error.message,
          isLoading: false
        });
      });
  };

  handlerAddTask = body => {
    createNewTask(body)
      .then(task => {
        const tasks = [...this.state.tasks, task];
        this.setState({tasks});
      })
      .catch(error => {
        this.setState({
          error: error.message
        });
      });
  };

  handlerChangeTaskStatus = id => status => {
    const tasks = [...this.state.tasks];
    const task = tasks.find(p => p.id === id);
    task.status = status;
    updateTask(task)
      .then(task => this.setState({tasks}))
      .catch(error => {
        this.setState({
          error: error.message
        });
      });
  };

  render() {
    //console.log(this.state.tasks);
    return (
      <Layout>
        <Header title="Task"/>
        {
          this.state.isLoading ?
            <span>Loaging</span> :
            <TaskList onAddTask={this.handlerAddTask} onChangeTaskStatus={this.handlerChangeTaskStatus} tasks={[...this.state.tasks].reverse()} />
        }
      </Layout>
    );
  }
}

export default App;