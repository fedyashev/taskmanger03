const Task = require('../models/task.model');
var isNumber = require('is-number');

// GET /api/v1/task/
module.exports.getTaskList = (req, res, next) => {
  return Task.getTaskList()
    .then(tasklist => res.status(200).json(tasklist))
    .catch(err => res.status(500).json({
      error: {
        status: 500,
        message: err.message
      }
    }));
}

// POST /api/v1/task/
module.exports.createNewTask = (req, res, next) => {
  const {body, creationDate} = req.body;
  if (!body || !creationDate) {
    return res.status(404).json({
      error: {
        status: 404,
        message: "Incorrect request body"
      }
    });
  }
  return Task.createNewTask(body, creationDate)
    .then(obj => {
      const {id, body, creationDate, status} = obj;
      const task = {id, body, creationDate, status};
      console.log(task);
      return task;
    })
    .then(task => res.status(200).json(task))
    .catch(err => res.status(500).json({
      error: {
        status: 500,
        message: err.message
      }
    }));
};

// PUT /api/v1/task/:id
module.exports.updateTask = (req, res, next) => {
  const id = req.params.id;
  const task = req.body;

  //console.log(task);

  if (!isNumber(id)) {
    return res.status(404).json({
      error: {
        status: 404,
        message: "Incorrect request parameters"
      }
    });
  }

  if (!task || !isNumber(task.id) || !task.body || !task.creationDate || !task.status) {
    return res.status(404).json({
      error: {
        status: 404,
        message: "Incorrect request body"
      }
    });
  }

  return Task.findOneAndUpdate({id: task.id}, task)
    .then(obj => {
      const {id, body, creationDate, status} = obj;
      const task = {id, body, creationDate, status};
      console.log(task);
      return task;
    })
    .then(task => res.status(200).json(task))
    .catch(err => res.status(500).json({
      error: {
        status: 500,
        message: err.message
      }
    }));
}