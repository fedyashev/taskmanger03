import React from "react";
import PropTypes from "prop-types";

import * as S from "../../lib/taskstatus";

// const TaskMenuItem = ({itemName, status, onChangeTaskStatus = f => f}) => (
//   <span className="dropdown-item small px-auto" onClick={() => onChangeTaskStatus(status)}>
//     {
//       status ? <span className={`badge badge-${mapStatusToCssClass(status)} mr-1`}>&nbsp;</span> : ""
//     }
//     <span>{itemName}</span>
//   </span>
// );

// const Task = ({id, body, creationDate, status, onChangeTaskStatus = f => f}) => {
//   return (
//     <div className={`card mb-2`}>
//       <div className="card-header py-1 px-2 border-0">
//         <div className="btn-group mr-2">
//           <span type="button" className={`badge badge-${mapStatusToCssClass(status)} my-1`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//             #{id}
//           </span>
//           <div className="dropdown-menu">
//             <TaskMenuItem itemName={"В ожидании"} status={S.WAITING} onChangeTaskStatus={onChangeTaskStatus}/>
//             <TaskMenuItem itemName={"В работе"} status={S.ATWORK} onChangeTaskStatus={onChangeTaskStatus}/>
//             <TaskMenuItem itemName={"Выполнено"} status={S.SUCCESS} onChangeTaskStatus={onChangeTaskStatus}/>
//             <TaskMenuItem itemName={"Не выполнено"} status={S.FAILED} onChangeTaskStatus={onChangeTaskStatus}/>
//             <TaskMenuItem itemName={"Удалено"} status={S.DELETED} onChangeTaskStatus={onChangeTaskStatus}/>
//             <div className="dropdown-divider"></div>
//             <TaskMenuItem itemName={"Редактировать"}/>
//           </div>
//         </div>
//         {/*<span className="">{(new Date(creationDate)).toLocaleString("ru-RU")}</span>*/}
//         <span className="h6">{body}</span>
//       </div>
//       {/*<div className="card-body p-1">
//         <span className="small">{(new Date(creationDate)).toLocaleString("ru-RU")}</span>
//       </div>*/}
//     </div>
//   );
// };

const TaskMenuItem = (props) => (
  <span className="dropdown-item small px-auto" onClick={() => props.action()}>
    {
      props.status ? <span className={`badge badge-${mapStatusToCssClass(props.status)} mr-1`}>&nbsp;</span> : ""
    }
    <span>{props.itemName}</span>
  </span>
);

const Task = ({id, body, creationDate, status, editing, onChangeTaskStatus = f => f, onClickEditTask = f => f, onClickCancelEditTask = f => f, onClickSaveUpdateBodyTask = f => f}) => {
  
  let _newBody;

  const onClickCancel = e => {
    e.preventDefault();
    onClickCancelEditTask();
  };

  const onClickSave = e => {
    e.preventDefault();
    onClickSaveUpdateBodyTask(_newBody.value);
  };

  return (
    <div className={`card mb-2`}>
      <div className="card-header py-1 px-2 border-0">
        <div className="btn-group mr-2">
          <span type="button" className={`badge badge-${mapStatusToCssClass(status)} my-1`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            #{id}
          </span>
          <div className="dropdown-menu">
            <TaskMenuItem itemName={"В ожидании"} status={S.WAITING} action={() => onChangeTaskStatus(S.WAITING)} />
            <TaskMenuItem itemName={"В работе"} status={S.ATWORK} action={() => onChangeTaskStatus(S.ATWORK)} />
            <TaskMenuItem itemName={"Выполнено"} status={S.SUCCESS} action={() => onChangeTaskStatus(S.SUCCESS)} />
            <TaskMenuItem itemName={"Не выполнено"} status={S.FAILED} action={() => onChangeTaskStatus(S.FAILED)} />
            <TaskMenuItem itemName={"Удалено"} status={S.DELETED} action={() => onChangeTaskStatus(S.DELETED)} />
            <div className="dropdown-divider"></div>
            <TaskMenuItem itemName={"Редактировать"} action={() => onClickEditTask()}/>
          </div>
        </div>
        {/*<span className="">{(new Date(creationDate)).toLocaleString("ru-RU")}</span>*/}
        <span className="h6">{body}</span>
      </div>
      {
        editing ? (
          <div className="card-body p-1">
            <textarea ref={input => _newBody = input} className="form-control mb-1" defaultValue={body} rows="4"></textarea>
            <div className="row">
              <div className="col-6">
                <button type="button" className="btn btn-primary btn-sm btn-block" onClick={onClickSave}>Save</button>
              </div>
              <div className="col-6">
                <button type="button" className="btn btn-primary btn-sm btn-block" onClick={onClickCancel}>Cancel</button>
              </div>
            </div>
          </div>
        ) : ""
      }

      {/*<div className="card-body p-1">
        <span className="small">{(new Date(creationDate)).toLocaleString("ru-RU")}</span>
      </div>*/}
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

/////////////////////


// const Task = ({id, body, creationDate, status, onChangeTaskStatus = f => f}) => {
//   return (
//     <div className={`card mb-2`}>
//       <div className="card-header py-1 px-2">
//         <div className="btn-group mr-2">
//           <span type="button" className={`badge badge-${mapStatusToCssClass(status)}`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//             #{id}
//           </span>
//           <div className="dropdown-menu">
//             <TaskMenuItem itemName={"В ожидании"} status={S.WAITING} onChangeTaskStatus={onChangeTaskStatus}/>
//             <TaskMenuItem itemName={"В работе"} status={S.ATWORK} onChangeTaskStatus={onChangeTaskStatus}/>
//             <TaskMenuItem itemName={"Выполнено"} status={S.SUCCESS} onChangeTaskStatus={onChangeTaskStatus}/>
//             <TaskMenuItem itemName={"Не выполнено"} status={S.FAILED} onChangeTaskStatus={onChangeTaskStatus}/>
//             <TaskMenuItem itemName={"Удалено"} status={S.DELETED} onChangeTaskStatus={onChangeTaskStatus}/>
//           </div>
//         </div>
//         {/*<span className="">{(new Date(creationDate)).toLocaleString("ru-RU")}</span>*/}
//         <span className="h6">{body}</span>
//       </div>
//       {/*<div className="card-body p-2">
//         <span className="h6">{body}</span>
//       </div>*/}
//     </div>
//   );
// };