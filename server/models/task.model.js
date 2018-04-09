const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const credentials = require('../credentials');

const dbConnection = mongoose.createConnection(credentials.connectionString.mlab);
autoIncrement.initialize(dbConnection);

const TaskSchema = new Schema({
  body: { type: String, default: "" },
  creationDate: { type: Date, default: Date.now },
  status: { type: String, default: "WAITING" }
});

TaskSchema.plugin(autoIncrement.plugin, {model: 'Task', field: 'id'});
const Task = mongoose.model("Task", TaskSchema);

Task.createNewTask = (body, creationDate) => {
  const status = "WAITING";
  const task = new Task({
    body,
    creationDate,
    status
  });
  return task.save();
};

Task.getTaskList = () => {
  return Task.find();
};

module.exports = Task;