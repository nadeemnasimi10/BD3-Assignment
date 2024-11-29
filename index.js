const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

function addTask(taskId, text, priority, tasks) {
  let obj = { taskId: taskId, text: text, priority: priority };
  tasks.push(obj);
  return tasks;
}

function editPriorityOnTask(taskId, priority, tasks) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
    }
  }
  return tasks;
}

function editTextOnTask(taskId, text, tasks) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
    }
  }
  return tasks;
}

app.get('/tasks/add', (req, res) => {
  let taskId = parseFloat(req.query.taskId);
  let text = req.query.text;
  let priority = parseFloat(req.query.priority);
  let result = addTask(taskId, text, priority, tasks);
  res.json(result);
});

app.get('/tasks', (req, res) => {
  let result = { tasks: tasks };
  res.json(result);
});

app.get('/tasks/sort-by-priority', (req, res) => {
  let result = tasks.sort((p1, p2) => p1.priority - p2.priority);
  res.send(result);
});

app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseFloat(req.query.taskId);
  let priority = parseFloat(req.query.priority);
  let result = editPriorityOnTask(taskId, priority, tasks);
  res.json(result);
});

app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseFloat(req.query.taskId);
  let text = req.query.text;
  let result = editTextOnTask(taskId, text, tasks);
  res.json(result);
});

app.get('/tasks/delete', (req, res) => {
  let taskId = parseFloat(req.query.taskId);
  let result = tasks.filter((task) => task.taskId !== taskId);
  res.json(result);
});

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseFloat(req.query.priority);
  let result = tasks.filter((task) => task.priority === priority);
  res.json({ tasks: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
