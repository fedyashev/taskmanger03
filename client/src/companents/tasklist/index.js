import React from "react";

import Task from "../task";

const TaskList = ({onAddTask = f => f, onChangeTaskStatus = f => f, tasks}) => {
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
        <div className="card-header">
          <span className="h5">Задачи</span>
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
        tasks.length > 0 && tasks.map(task => <Task key={task.id} onChangeTaskStatus={onChangeTaskStatus(task.id)} {...task}/>)
      }

    </section>
  );
}

export default TaskList;