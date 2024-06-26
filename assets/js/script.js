// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

const employeesArray = [];

// Collect employee data
const collectEmployees = function () {
  // TODO: Get user input to create and return an array of employee objects
  let isContinue = true;

  while (isContinue) {
    // create new employee
    var employee = new Object();

    const firstName = "first name";
    const lastName = "last name";

    employee.firstName = checkName(firstName, prompt("Enter first name:"));
    // check cancel
    if (employee.firstName === null) {
      break;
    }

    employee.lastName = checkName(lastName, prompt("Enter last name:"));
    // check cancel
    if (employee.lastName === null) {
      break;
    }

    // make string to number
    employee.salary = parseFloat(Number(prompt("Enter salary:")).toFixed(2));

    // make first char toUpperCase and after toLowerCase
    capitalizeEmployeeName(employee);

    if (isNaN(employee.salary)) {
      employee.salary = 0;
    }

    employeesArray.push(employee);

    isContinue = confirm("Do you want to add another employes?")
  }

  return employeesArray;
}

// if user send empty prompt or cancel prompt or check validate name
function checkName(lastOrFirst, employeeName) {
  while (employeeName === `` || employeeName === null || !validateName(employeeName)) {
    if (employeeName === null) {
      return null;
    }
    alert(`${lastOrFirst} is empty or contains invalid characters. Please enter letters only.`);
    employeeName = prompt(`Enter ${lastOrFirst}:`);
  }
  return employeeName;
}

// correct case
const capitalizeEmployeeName = function (employee) {
  employee.firstName = employee.firstName.charAt(0).toUpperCase() + employee.firstName.toLowerCase().slice(1);
  employee.lastName = employee.lastName.charAt(0).toUpperCase() + employee.lastName.toLowerCase().slice(1);
}

function validateName(firstOrLastName) {
  // check validate name, must only ABC or abc
  var regex = /^[a-zA-Z]+$/;

  // return boolean regex
  return regex.test(firstOrLastName);
}


// Display the average salary
const displayAverageSalary = function (employeesArray) {
  // TODO: Calculate and display the average salary

  // check is empty array
  if (employeesArray.length === 0) {
    return console.log(`The company does not list any employees. 
    \nAt least 1 employee is required to calculate the average salary.
    \nempplyeesArray count: ${employeesArray.length}`)
  }
  let averageSalary = 0;

  for (let i = 0; i < employeesArray.length; i++) {
    averageSalary = averageSalary + employeesArray[i].salary;
  }

  averageSalary = averageSalary / employeesArray.length;
  console.log(`Average salary: ${averageSalary.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  })}\nEmployee count: ${employeesArray.length}`);
}

// Select a random employee
const getRandomEmployee = function (employeesArray) {
  // TODO: Select and display a random employee

  // check is empty array
  if (employeesArray.length === 0) {
    return console.log(`The company does not list any employees.
    \nAt least 1 employee is required for random selection.
    \nempplyeesArray count: ${employeesArray.length}`)
  }

  const randomEmployee = employeesArray[Math.floor(Math.random() * employeesArray.length)];
  console.log(randomEmployee);
  console.log(`Random employee:\nfirst name: ${randomEmployee.firstName}\nlast name: ${randomEmployee.lastName}`)
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function () {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
