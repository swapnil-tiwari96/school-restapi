const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const StudentsController = require('../controller/Students')

router.get('/', StudentsController.getAll);

router.post('/', checkAuth, StudentsController.addStudent);

router.get('/:studentID', StudentsController.getOne);

router.delete('/:studentID', checkAuth, StudentsController.deleteOne);

module.exports = router;