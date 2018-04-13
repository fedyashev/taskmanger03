import React from "react";
import * as S from "../../lib/taskstatus";

const TasklistFilter = ({filter, onApplyFilter = f => f}) => {
  const status = filter.status;
  let _form;

  const submit = e => {
    e.preventDefault();
    let checkboxes = _form.getElementsByClassName("form-check-input");
    checkboxes = [...checkboxes].map(({value, checked}) => {
      return { value, checked };
    });
    const newFilter = {
      status: {
        waiting: checkboxes[0],
        atwork: checkboxes[1],
        success: checkboxes[2],
        failed: checkboxes[3],
        deleted: checkboxes[4]
      }
    };
    //console.log(newFilter);
    onApplyFilter(newFilter);
  };

  return (
    <div className="btn-group">
      <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuFilter" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Filter
      </button>
      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuFilter">
        <form ref={obj => _form = obj} className="px-2 py-0" onSubmit={submit}>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="chbWaiting" name="waiting" value={S.WAITING} defaultChecked={status.waiting.checked}/>
            <label className="form-check-label" forhtml="chbWaiting">{"В ожидании"}</label>
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="chbAtwork" name="atwork" value={S.ATWORK} defaultChecked={status.atwork.checked}/>
            <label className="form-check-label" forhtml="chbAtwork">{"В работе"}</label>
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="chbSuccess" name="success" value={S.SUCCESS} defaultChecked={status.success.checked}/>
            <label className="form-check-label" forhtml="chbSuccess">{"Выполнено"}</label>
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="chbFailed" name="failed" value={S.FAILED} defaultChecked={status.failed.checked}/>
            <label className="form-check-label" forhtml="chbFailed">{"Не выполнено"}</label>
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="chbDeleted" name="deleted" value={S.DELETED} defaultChecked={status.deleted.checked}/>
            <label className="form-check-label" forhtml="chbDeleted">{"Удалено"}</label>
          </div>
          <button type="submit" className="btn btn-primary btn-sm btn-block">Применить</button>
        </form>
      </div>
    </div>
  );
};

export default TasklistFilter;