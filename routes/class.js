const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const ClassController = require('../controller/class');

router.get('/', ClassController.getAll);

router.post('/', checkAuth, ClassController.addStudent);

router.get('/getOne', ClassController.getOne)

module.exports = router;