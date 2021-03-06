import React, { Component } from 'react';

import Layout from "./companents/layout";
import Header from "./companents/header";
import TaskList from "./companents/tasklist";
import Modal from "./companents/modal";
import Loading from "./companents/loading";

import * as S from "./lib/taskstatus";
import { getTaskList, createNewTask, updateTask } from "./lib/api-fetch-helpers";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: "",
      isLoading: false,
      filter: {
        status: [S.WAITING, S.ATWORK],
        sort: -1
      },
      tasks: []
    };
  };

  componentWillMount() {
    this.setState({isLoading: true});
    getTaskList(this.state.filter)
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

  sortTaskByIdAsc = (a, b) => a.id - b.id;
  sortTaskByIdDesc = (a, b) => b.id - a.id;

  handlerAddTask = body => {
    createNewTask(body)
      .then(newTask => {
        const task = {...newTask, editing: false};
        task.editing = false;
        const { filter } = this.state;
        if (filter.status.includes(task.status)) {
          const tasks = [...this.state.tasks, task];
          this.setState({tasks});
        }
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
    //let isStatusInFilter = false;
    const { filter } = this.state;

    // for (let i in filter.status) {
    //   //console.log(i, filter.status[i].value, status);
    //   if ((filter.status[i].value === status) && filter.status[i].checked === true) {
    //     isStatusInFilter = true;
    //     break;
    //   }
    // }

    const task = tasks.find(p => p.id === id);

    if (task) {
      task.status = status;
      updateTask(task)
        .then(newTask => {
          const newTasks = filter.status.includes(newTask.status) ? tasks : tasks.filter(p => p.id !== id);
          this.setState({tasks: newTasks});
        })
        .catch(error => {
          this.setState({
            error: error.message
          });
        });
    }
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

  handlerApplyFilter = filter => {
    //console.log("Apply", filter);
    if (filter) {
      this.setState({filter, isLoading: true});
      getTaskList(filter)
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
    }
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
            <Loading /> :
            <TaskList onAddTask={this.handlerAddTask}
                      onChangeTaskStatus={this.handlerChangeTaskStatus}
                      onClickEditTask={this.handlerClickEditTask}
                      onClickCancelEditTask={this.handlerClickCancelEditTask}
                      onClickSaveUpdateBodyTask={this.handlerClickSaveUpdateBodyTask}
                      onApplyFilter={this.handlerApplyFilter}
                      tasks={[...this.state.tasks].sort(this.state.filter.sort === 1 ? this.sortTaskByIdAsc : this.sortTaskByIdDesc)}
                      filter={this.state.filter}/>
        }
      </Layout>
    );
  }
}

export default App;