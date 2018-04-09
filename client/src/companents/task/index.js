import React from "react";
import PropTypes from "prop-types";

import * as S from "../../lib/taskstatus";

const TaskMenuItem = ({itemName, status, onChangeTaskStatus = f => f}) => (
  <span className="dropdown-item small px-auto" onClick={() => onChangeTaskStatus(status)}>
    <span className={`badge badge-${mapStatusToCssClass(status)} mr-1`}>&nbsp;</span>
    <span>{itemName}</span>
  </span>
);

const Task = ({id, body, creationDate, status, onChangeTaskStatus = f => f}) => {
  return (
    <div className={`card mb-2`}>
      <div className="card-header p-2">
        <div className="btn-group mr-2">
          <button type="button" className={`btn btn-sm btn-${mapStatusToCssClass(status)} dropdown-toggle`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            № {id}
          </button>
          <div className="dropdown-menu">
            <TaskMenuItem itemName={"В ожидании"} status={S.WAITING} onChangeTaskStatus={onChangeTaskStatus}/>
            <TaskMenuItem itemName={"В работе"} status={S.ATWORK} onChangeTaskStatus={onChangeTaskStatus}/>
            <TaskMenuItem itemName={"Выполнено"} status={S.SUCCESS} onChangeTaskStatus={onChangeTaskStatus}/>
            <TaskMenuItem itemName={"Не выполнено"} status={S.FAILED} onChangeTaskStatus={onChangeTaskStatus}/>
            <TaskMenuItem itemName={"Удалено"} status={S.DELETED} onChangeTaskStatus={onChangeTaskStatus}/>
          </div>
        </div>
        <span className="">{(new Date(creationDate)).toLocaleString("ru-RU")}</span>
      </div>
      <div className="card-body p-2">
        <span className="h6">{body}</span>
      </div>
    </div>
  );
};

Task.propsType = {
  id: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  createDate: PropTypes.number.isRequired
};

export default Task;

///////////////////////////////////////////////////////////////////////////////

function mapStatusToCssClass(status) {
  switch (status) {
    case S.WAITING: return "secondary";
    case S.ATWORK: return "info";
    case S.SUCCESS: return "success";
    case S.FAILED: return "danger";
    case S.DELETED: return "dark";
    default: return "light";
  }
}