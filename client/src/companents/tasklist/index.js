import React from "react";

import Task from "../task";
import TasklistFilter from "../tasklist-filter";

const TaskList = ({
  onAddTask = f => f,
  onClickCancelEditTask = f => f,
  onChangeTaskStatus = f => f,
  onClickEditTask = f => f,
  onClickSaveUpdateBodyTask = f => f,
  onApplyFilter = f => f,
  tasks,
  filter }) => {
  let _body;

  const handlerOnClick = () => {
    if (_body.checkValidity() === true) {
      onAddTask(_body.value);
      _body.value = "";
    }
  };

  return (
    <section>
      <div className="card mb-2">
        <div className="card-header p-2">
          <span className="h5 mr-2">Задачи</span>
          {
            tasks.length && <span className="badge badge-primary">{tasks.length}</span>
          }
          <div className="float-right">
            <TasklistFilter filter={filter} onApplyFilter={onApplyFilter}/>
          </div>
        </div>
        <div className="card-body p-2">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Task description" ref={input => _body = input} required/>
            <div className="input-group-append">
              <button className="btn btn-success" type="button" onClick={handlerOnClick}>Add</button>
            </div>
          </div>
        </div>
      </div>

      {
        tasks.length > 0 && tasks.map(task => <Task key={task.id}
                                                    onChangeTaskStatus={onChangeTaskStatus(task.id)}
                                                    onClickEditTask={() => onClickEditTask(task.id)}
                                                    onClickCancelEditTask={() => onClickCancelEditTask(task.id)}
                                                    onClickSaveUpdateBodyTask={onClickSaveUpdateBodyTask(task.id)}
                                                    {...task}/>)
      }

    </section>
  );
}

export default TaskList;