DROP DATABASE IF EXISTS Argus_db;
CREATE DATABASE Argus_db;

USE Argus_db;

CREATE TABLE departments (
  department_name VARCHAR(50) NOT NULL,
  department_id INT AUTO_INCREMENT PRIMARY KEY

);

CREATE TABLE roles (
  job_title VARCHAR(50) NOT NULL,
  role_id INT AUTO_INCREMENT PRIMARY KEY,
  department_id INT,
  salary DECIMAL NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES departments(department_id)
  ON DELETE SET NULL

);

CREATE TABLE employees (
  employee_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  role_id INT,
  manager_id INT NOT NULL,
  FOREIGN KEY (role_id)
  REFERENCES roles(role_id)
  ON DELETE SET NULL
  );

