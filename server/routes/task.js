const express = require('express');
const router = express.Router();
const controller = require('../controllers/task');

router.get('/', controller.getTaskList);
router.post('/', controller.createNewTask);
router.put('/:id', controller.updateTask);

module.exports = router;