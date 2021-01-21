
const Employee = require('../models/employee.model');
// importing the model
const EmployeeModel = require('../models/employee.model');

// get all employee list
// this exports getEmployeeList function to outside of this file
exports.getEmployeeList = (req,res) => {
    //console.log('Here all employee list');
    EmployeeModel.getAllEmployees((err, employees) => {
        console.log('We are here');
        if(err)
            res.send(err);
        console.log('Employees', employees);
        res.send(employees);
    })
}

// get employee by ID
exports.getEmployeeByID = (req,res) => {
    //console.log('get employee by id');
    EmployeeModel.getEmployeeByID(req.params.id, (err, employee)=> {
        if(err)
            res.send(err);
        console.log('Single employees data ', employee);
        res.send(employee);
    })
}

// create new employee
exports.createNewEmployee = (req, res) =>{
    const employeeReqData = new EmployeeModel(req.body);
    console.log('employeeReqData', employeeReqData)
    //check null
    if(req.body.constructor == Object && Object.keys(req.body).length == 0){
        res.send(400).send({success: false, message: 'Please fill all data'});
    }
    else{
        console.log('valid data');
        EmployeeModel.createNewEmployee(employeeReqData, (err, employee) => {
            if(err)
                res.send(err);
            res.json({status: true, messsage: 'Employee added successfully', data: employee});
        })
    }
}

// updating employee
exports.updateEmployee = (req, res) => {
    const employeeReqData = new EmployeeModel(req.body);
    console.log('employeeReqData update', employeeReqData);
    //check null
    if(req.body.constructor == Object && Object.keys(req.body).length == 0){
        res.send(400).send({success: false, message: 'Please fill all data'});
    }
    else{
        console.log('valid data');
        EmployeeModel.updateEmployee(req.params.id, employeeReqData, (err, employee) => {
            if(err)
                res.send(err);
            res.json({status: true, messsage: 'Employee updated successfully', data: employee});
        })
    }
}

// delete employee
exports.deleteEmployee = (req, res) =>{
    EmployeeModel.deleteEmployee(req.params.id, (err, employee) => {
        if(err)
            res.send(err);
        res.send({sucess: true, message : 'Message deleted successfully'});
    })
}