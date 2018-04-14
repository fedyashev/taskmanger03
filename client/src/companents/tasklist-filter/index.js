import React from "react";
import * as S from "../../lib/taskstatus";

const TasklistFilter = ({filter, onApplyFilter = f => f}) => {
  //console.log("Filter", filter);

  const { status, sort } = filter;
  let _form;

  const submit = e => {
    e.preventDefault();
    let checkboxes = _form.getElementsByClassName("form-check-input");
    let radiobuttons = _form.getElementsByClassName("form-check-input");
    const newSort = Number([...radiobuttons].filter(p => p.type === "radio" && p.checked === true)[0].value);
    const newStatus = [...checkboxes].filter(p => p.type === "checkbox" && p.checked === true).map(({value}) => value);
    const newFilter = { status: newStatus, sort: newSort };
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
            <input type="checkbox" className="form-check-input" id="chbWaiting" name="waiting" value={S.WAITING} defaultChecked={status.includes(S.WAITING)} />
            <label className="form-check-label" forhtml="chbWaiting">{"В ожидании"}</label>
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="chbAtwork" name="atwork" value={S.ATWORK} defaultChecked={status.includes(S.ATWORK)} />
            <label className="form-check-label" forhtml="chbAtwork">{"В работе"}</label>
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="chbSuccess" name="success" value={S.SUCCESS} defaultChecked={status.includes(S.SUCCESS)} />
            <label className="form-check-label" forhtml="chbSuccess">{"Выполнено"}</label>
          </div>
          <div className="form-check">            
            <input type="checkbox" className="form-check-input" id="chbFailed" name="failed" value={S.FAILED} defaultChecked={status.includes(S.FAILED)} />
            <label className="form-check-label" forhtml="chbFailed">{"Не выполнено"}</label>
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="chbDeleted" name="deleted" value={S.DELETED} defaultChecked={status.includes(S.DELETED)} />
            <label className="form-check-label" forhtml="chbDeleted">{"Удалено"}</label>
          </div>
          <div className="dropdown-divider my-0"></div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioIdSort" id="inlineRadioIdAsc" value="1" defaultChecked={sort === 1} />
            <label className="form-check-label" htmlFor="inlineRadioIdAsc">asc</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioIdSort" id="inlineRadioIdDesc" value="-1" defaultChecked={sort === -1} />
            <label className="form-check-label" htmlFor="inlineRadioIdDesc">desc</label>
          </div>
          <div className="dropdown-divider mt-0 mb-2"></div>
          <button type="submit" className="btn btn-primary btn-sm btn-block">Применить</button>
        </form>
      </div>
    </div>
  );
};

export default TasklistFilter;