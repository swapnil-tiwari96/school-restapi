const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const StudentsController = require('../controller/students');

router.get('/', StudentsController.getAll);
router.post('/', checkAuth, StudentsController.addStudent);

module.exports = router;