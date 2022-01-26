DROP DATABASE IF EXISTS EmployeeManager_db;
CREATE DATABASE EmployeeManager_db;

USE EmployeeManager_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    FOREIGN KEY (deaprtment_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);


CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
    FOREIGN KEY (deaprtment_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);
