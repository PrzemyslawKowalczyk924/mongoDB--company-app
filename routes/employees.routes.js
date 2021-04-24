const express = require('express');
const router = express.Router();

const EmployeeController = require('../controllers/employees.controller');

router.get('/employees', EmployeeController.getAll);

router.get('/employees/random', EmployeeController.getRandom); 

router.get('/employees/:id', EmployeeController.getId); 

router.post('/employees', EmployeeController.getNew);

router.put('/employees/:id', EmployeeController.getUpdate);

router.delete('/employees/:id', EmployeeController.getDelete);

module.exports = router;
