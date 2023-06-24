DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);


INSERT INTO department (department_name)
    VALUES ("Sales"),
           ("Engineering"),
           ("Finance"),
           ("Legal");

INSERT INTO role (title, salary, department_id)
    VALUES ("Sales Lead", 100000, 1),
           ("Salesperson", 80000, 1),
           ("Lead Engineer", 150000, 2),
           ("Software Engineer", 120000, 2),
           ("Account Manager", 160000, 3),
           ("Accountant", 125000, 3),
           ("Legal Team Lead", 250000, 4),
           ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ("Bob", "Smith", 1, NULL),
           ("Tom", "Gains", 2, 1),
           ("Jamie", "Barnet", 3, NULL),
           ("Ally", "Miller", 4, 3),
           ("John", "Smith", 5, NULL),
           ("Apple", "Rainbow", 6, 5),
           ("April", "Showers", 7, NULL),
           ("Annabel", "Lee", 8, 7);


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;