\c postgres;

DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;

\c tracker_db;

CREATE TABLE department (
id SERIAL PRIMARY KEY,
department_name VarCHAR(100) NOT NULL
);

CREATE TABLE role (
id SERIAL PRIMARY KEY,
title VARCHAR(100) NOT NULL,
salary INTEGER NOT NULL,
department_id INTEGER NOT NULL,
FOREIGN KEY (department_id)
REFERENCES department(id)
ON DELETE SET NULL
);

CREATE TABLE employee (
id SERIAL PRIMARY KEY,
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100) NOT NULL,
role_id INTEGER,
department_id VARCHAR(100),
manager_id INTEGER,
FOREIGN KEY(role_id)
REFERENCES role (id)
ON DELETE SET NULL
); 