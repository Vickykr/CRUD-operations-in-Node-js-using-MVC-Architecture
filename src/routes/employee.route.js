// importing libraries to create route
const express = require('express');
const router = express.Router();

// importing controller file
const employeeController = require('../controllers/employee.controller');

// creating route to retrive all employeelist
router.get('/',employeeController.getEmployeeList);

// creating route to retrive employee by ID
router.get('/:id',employeeController.getEmployeeByID);

// create new employee
router.post('/', employeeController.createNewEmployee);

// update employee
router.put('/:id', employeeController.updateEmployee);

// delete employee
router.delete('/:id', employeeController.deleteEmployee);

// making this routes available outside the file
module.exports = router;