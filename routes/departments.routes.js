const express = require('express');
const router = express.Router();

const DepartmentController = require('../controllers/departments.controller');

router.get('/departments', DepartmentController.getAll); 

router.get('/departments/random', DepartmentController.getRandom);

router.get('/departments/:id', DepartmentController.getId);

router.post('/departments', DepartmentController.getNew);

router.put('/departments/:id', DepartmentController.getUpdate); 

router.delete('/departments/:id', DepartmentController.getDelete);  

module.exports = router;
