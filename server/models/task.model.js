const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const credentials = require('../credentials');

const connectionString = process.env.NODE_ENV === "production" ? credentials.mlab.production : credentials.mlab.development;
const dbConnection = mongoose.createConnection(connectionString);
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

Task.getTaskList = (filter) => {
  const query = {};
  if (filter.status) {
    query["$or"] = filter.status.map(p => {
      return {
        status: p
      };
    });
  }
  return Task.find(query);
};

module.exports = Task;