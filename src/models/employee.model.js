// importing DB connection
var dbConn = require('../../config/db.config');

// creating variable from table
var Employee = function(employee){
    this.first_name     =   employee.first_name;
    this.last_name      =   employee.last_name;
    this.email          =   employee.email;
    this.phone          =   employee.phone;
    this.organization   =   employee.organization;
    this.designation    =   employee.designation;
    this.salary         =   employee.salary;
    this.status         =   employee.status ? employee.status : 1;
}

// getting all employee from DB
Employee.getAllEmployees = (result) => {
    dbConn.query('SELECT * FROM employees WHERE is_deleted = 0', (err, res) => {
        if(err){
            console.log('Error while fetching emloyees',err);
            result(null,err);
        }
        else{
            console.log('Employees fetched successfully');
            result(null,res);
        }
    })
}

// getting employee by ID
Employee.getEmployeeByID = (id,result) => {
    dbConn.query('SELECT * FROM employees WHERE id =?', id, (err, res) =>{
        if(err){
            console.log('Error while fetching employee by ID');
            result(null,err);
        }
        else{
            result(null,res);
        }
    })
}

// create new employee
Employee.createNewEmployee = (employeeReqData, result) =>{
    dbConn.query('INSERT INTO employees SET ? ', employeeReqData, (err, res) =>{
        if(err){
            console.log('Error while inserting data');
            result(null, err);
        }
        else{
            console.log('Employee created successfully');
            result(null, res);
        }
    })
}
// update employee
Employee.updateEmployee = (id, employeeReqData, result) =>{
    dbConn.query("UPDATE employees SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=?, status=? WHERE id = ?", [employeeReqData.first_name,employeeReqData.last_name,employeeReqData.email,employeeReqData.phone,employeeReqData.organization,employeeReqData.designation,employeeReqData.salary,employeeReqData.status, id], (err, res) =>{
        if(err){
            console.log('Error while upating the record');
            result(null, err);
        }
        else{
            console.log('Employee updated successfully');
            result(null, res);
        }
    })
}

// delete employee
Employee.deleteEmployee = (id, result) =>{

    // Hard delete or removing from DB
    /*dbConn.query('DELETE FROM employees WHERE id=?', id, (err,res) =>{
        if(err){
            console.log('Error while deleting the employee');
            result(null, err);
        }
        else{
            result(null, res);
        }
    })*/

    // soft delete i.e setting is_delete = 1
    dbConn.query("UPDATE employees SET is_deleted=? WHERE id=?",[1, id], (err, res) =>{
        if(err){
            console.log('Error while upating the record');
            result(null, err);
        }
        else{
            console.log('Employee deleted successfully');
            result(null, res);
        }
    })
}

module.exports = Employee;