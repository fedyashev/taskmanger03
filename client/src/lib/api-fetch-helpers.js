import fetch from "isomorphic-fetch";

export const getTaskList = (filter) => {
  let queryString = "";
  if (filter && filter.status.length > 0) {
    // let arr = [];
    // for (let i in filter.status) {
    //   arr.push(filter.status[i]);
    // }
    queryString = filter.status.map(p => `status[]=${p}`).join('&');
    //console.log(queryString);
  }
  const path = "/api/v1/task";
  const url = `${path}${queryString ? "/?" + queryString : ""}`;
  return fetch(url, {method: "GET"})
    .then(response => {
      if (response.status >= 400) {
        console.log(response);
        throw new Error(response.statusText || "Unknow error");
      }
      // const obj = response.json();
      // return obj;
      return response.json();
    });
};


export const createNewTask = body => {
  const data = {
    body: body,
    creationDate: Date.now()
  };
  const opt = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
  return fetch("/api/v1/task", opt)
    .then(response => {
      //const obj = response.json();
      if (!response.ok) {
        throw new Error(response.statusText || "Unknow error");
      }
      return response.json();
    });
};

export const updateTask = task => {
  const opt = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  };
  return fetch(`/api/v1/task/${task.id}`, opt)
    .then(response => {
      //console.log(response);
      //const obj = response.json();
      if (!response.ok) {
        throw new Error(response.statusText || "Unknow error");
      }
      return response.json();
    });
};