DROP DATABASE IF EXISTS EmployeeManager_db;
CREATE DATABASE EmployeeManager_db;
USE EmployeeManager_db;
CREATE TABLE department (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(30) NOT NULL, PRIMARY KEY (id));
CREATE TABLE roles (id INT NOT NULL AUTO_INCREMENT,title VARCHAR(30),salary DECIMAL,department_id INT,PRIMARY KEY (id),FOREIGN KEY (department_id) REFERENCES department(id));
CREATE TABLE employee (id INT NOT NULL AUTO_INCREMENT,first_name VARCHAR(30),last_name VARCHAR(30),roles_id INT,manager_id INT,PRIMARY KEY (id),FOREIGN KEY (roles_id) REFERENCES roles(id) ON DELETE SET NULL,FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL);