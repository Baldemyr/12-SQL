//Import and require inquirer and mysql2;

const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");
let db = null;

//init function to begin the prompts
const init = function () {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Please choose an option:",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee",
          "Exit",
        ],
        name: "option",
      },
    ])
    .then((response) => {
      // Connect to database and create an object to connect.
      if(!db) {
     db = mysql.createConnection(
        {
          host: "localhost",
          user: "root",
          password: "Silversnail12",
          database: "Argus_db",
        },
        console.log(`Connected to the Argus_db database.`)
      );
      }
     if (response.option === "View all departments") {
        viewDepts();
      } else if (response.option === "View all roles") {
        viewRoles();
      } else if (response.option === "View all employees") {
        viewEmps();
      } else if (response.option === "Add a department") {
        addDept();
      } else if (response.option === "Add a role") {
        addRole();
      } else if (response.option === "Add an employee") {
        addEmp();
      } else if (response.option === "Update an employee") {
        updateEmp();
      } else {
        console.log("goodbye");
        process.exit();
      }
    });
};
//function to view the departments
 // Query the department's table
const viewDepts = function () {
  console.log("viewdepartments")
  db.query("SELECT * FROM departments", function (err, results) {
    console.table(results);
    console.log(err)
    init();
  });
};
 // Query the roles' table
const viewRoles = function () {
  db.query(
    "SELECT roles.job_title, roles.role_id, roles.salary, departments.department_name FROM roles JOIN departments ON roles.department_id = departments.department_id;",
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        console.table(results);
        init();
      }
    }
  );
};

// Query the employees table
const viewEmps = function () {
    db.query(
    "SELECT employees.employee_id, employees.first_name, employees.last_name, employees.manager_id, roles.job_title, roles.salary, departments.department_name  FROM employees JOIN roles ON employees.role_id = roles.role_id JOIN departments ON roles.department_id = departments.department_id;",
    function (err, results) {
      console.table(results);
      init();
    }
  );
};

const addDept = function () {
  inquirer
    .prompt([
      {
        type: "input",
        message: "New department name:",
        name: "newDeptName",
      },
    ])
    .then(function (answers) {
      console.log(answers);
      db.query(
        "INSERT INTO departments SET ?",
        {
          department_name: answers.newDeptName,
        },
        function (error) {
          if (error) throw error;
          console.log("New department added");
        }
      );
      viewDepts();
    });
};

const addRole = function () {
  inquirer
    .prompt([
      {
        type: "input",
        message: "New role title:",
        name: "newJobTitle",
      },
      {
        type: "number",
        message:
          "Department ID (Chapter Command Company = 1, First Company = 2, Apothicarium = 3, Second Company = 4, Support Company = 5):",
        name: "DeptID",
      },
      {
        type: "input",
        message: "Salary for this role:",
        name: "newSalary",
      },
    ])
    .then(function (answers) {
      console.log(answers);
      const dept_id = parseInt(answers.DeptID);
      console.log(typeof dept_id, dept_id);
      db.query(
        "INSERT INTO roles SET ?",
        {
          job_title: answers.newJobTitle,
          department_id: dept_id,
          salary: answers.newSalary,
        },
        function (error) {
          if (error) throw error;
          console.log("new role added");
        }
      );
      viewRoles();
    });
};

const addEmp = function () {
  inquirer
    .prompt([
      {
        type: "input",
        message: "First name:",
        name: "firstName",
      },
      {
        type: "input",
        message: "Last name:",
        name: "lastName",
      },
      {
        type: "number",
        message: "Role ID:",
        name: "roleID",
      },
      {
        type: "number",
        message: "Manager ID:",
        name: "managerID",
      },
    ])
    .then(function (answers) {
      console.log(answers);

      db.query(
        "INSERT INTO employees SET ?",
        {
          first_name: answers.firstName,
          last_name: answers.lastName,
          role_id: answers.roleID,
          manager_id: answers.managerID,
        },
        function (error) {
          if (error) throw error;
          console.log("new employee added");
        }
      );
      viewEmps();
    });
};

const updateEmp = function () {
  db.query("SELECT first_name, employee_id FROM employees", (err, results) => {
    if (err) {
      console.log(err);
    }
    let empArray = [];
    for (let i = 0; i < results.length; i++) {
      empArray.push({
        name: results[i].first_name,
        value: results[i].employee_id,
      });
    }

    console.log(empArray);
    inquirer
      .prompt([
        {
          type: "list",
          message: "which employee would you like to update?",
          choices: empArray,
          name: "empChoice",
        },
        {
          type: "input",
          message: "First name:",
          name: "firstName",
        },
        {
          type: "input",
          message: "Last name:",
          name: "lastName",
        },
        {
          type: "number",
          message: "Role ID:",
          name: "roleID",
        },
        {
          type: "number",
          message: "Manager ID:",
          name: "managerID",
        },
      ])
      .then(function (answers) {
        console.log(answers);

        db.query(
          `UPDATE employees SET ? WHERE employee_id=${answers.empChoice}`,
          {
            first_name: answers.firstName,
            last_name: answers.lastName,
            role_id: answers.roleID,
            manager_id: answers.managerID,
          },
          function (error) {
            if (error) throw error;
            console.log("Employee updated");
          }
        );
        viewEmps();
      });
  });
};

init();
