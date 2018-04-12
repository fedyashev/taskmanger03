import React, { Component } from 'react';

import Layout from "./companents/layout";
import Header from "./companents/header";
import TaskList from "./companents/tasklist";
import Modal from "./companents/modal";

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
      .then(tasklist => {
        const tasks = tasklist.map(task => {
          return {...task, editing: false};
        });
        this.setState({tasks, isLoading: false})
      })
      .catch(error => {
        console.log("Error", error);
        this.setState({
          error: error.message,
          isLoading: false
        });
      });
  };

  handlerAddTask = body => {
    createNewTask(body)
      .then(newTask => {
        const task = {...newTask, editing: false};
        task.editing = false;
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
    //console.log(id, status);
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

  handlerClickEditTask = id => {
    //console.log(id, "Click Edit");
    const tasks = [...this.state.tasks];
    const task = tasks.find(p => p.id === id);
    task.editing = true;
    this.setState({tasks});
    // updateTask(task)
    //   .then(task => this.setState({tasks}))
    //   .catch(error => {
    //     this.setState({
    //       error: error.message
    //     });
    //   });
  };

  handlerClickCancelEditTask = id => {
    //console.log(id, "Click cancel edit");
    const tasks = [...this.state.tasks];
    const task = tasks.find(p => p.id === id);
    task.editing = false;
    this.setState({tasks});
    // updateTask(task)
    //   .then(task => {})
    //   .catch(error => {
    //     this.setState({
    //       error: error.message
    //     });
    //   });
  }

  handlerClickSaveUpdateBodyTask = id => body => {
    //console.log(id, body, "Click save body");
    const tasks = [...this.state.tasks];
    const task = tasks.find(p => p.id === id);
    task.body = body;
    task.editing = false;
    updateTask(task)
      .then(task => this.setState({tasks}))
      .catch(error => {
        this.setState({
          error: error.message
        });
      });
  };

  handlerCloseModal = () => {
    const error = null;
    this.setState({error});
  };

  render() {
    //console.log(this.state.tasks);
    return (
      <Layout>
        <Header title="Task"/>
        {
          this.state.error ? <Modal title={"Error"} body={this.state.error} onCloseModal={() => this.handlerCloseModal()} /> : ""
        }
        {
          this.state.isLoading ?
            <span>Loaging</span> :
            <TaskList onAddTask={this.handlerAddTask}
                      onChangeTaskStatus={this.handlerChangeTaskStatus}
                      onClickEditTask={this.handlerClickEditTask}
                      onClickCancelEditTask={this.handlerClickCancelEditTask}
                      onClickSaveUpdateBodyTask={this.handlerClickSaveUpdateBodyTask}
                      tasks={[...this.state.tasks].reverse()} />
        }
      </Layout>
    );
  }
}

export default App;