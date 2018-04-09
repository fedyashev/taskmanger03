import fetch from "isomorphic-fetch";

export const getTaskList = () => fetch("/api/v1/task", {method: "GET"})
  .then(response => {
    const obj = response.json();
    if (!response.ok) {
      throw new Error(obj.error.message || "Unknow error");
    }
    return obj;
  });

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
      const obj = response.json();
      if (!response.ok) {
        throw new Error(obj.error.message || "Unknow error");
      }
      return obj;
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
      const obj = response.json();
      if (!response.ok) {
        throw new Error(obj.error.message || "Unknow error");
      }
      return obj;
    });
};