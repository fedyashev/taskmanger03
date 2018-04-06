import React, { Component } from 'react';

import Layout from "./companents/layout";
import Header from "./companents/header";
import TaskList from "./companents/tasklist";

import * as S from "./lib/taskstatus";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  };

  handlerAddTask = body => {
    const maxId = this.state.tasks.reduce((max, el) => el.id > max ? el.id : max, 0);
    const tasks = [
      ...this.state.tasks,
      {
        id: maxId + 1,
        body: body,
        createDate: Date.now(),
        status: S.WAITING
      }
    ];
    this.setState({
      tasks
    });
  };

  handlerChangeTaskStatus = id => status => {
    const tasks = [...this.state.tasks];
    const task = tasks.find(p => p.id === id);
    task.status = status;
    this.setState({
      tasks
    });
  };

  render() {
    //console.log(this.state.tasks);
    return (
      <Layout>
        <Header title="Task"/>
        <TaskList onAddTask={this.handlerAddTask} onChangeTaskStatus={this.handlerChangeTaskStatus} {...this.state} />
      </Layout>
    );
  }
}

export default App;
