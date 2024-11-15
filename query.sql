SELECT role.id,role.title,role.salary, department.department_name 
FROM role
JOIN department ON role.department_id = department.id;

-- SELECT employee.id, employee.first_name, employee.last_name, role.title. department.department_name, role.salary
-- FROM employee
-- JOIN role ON  employee.role_id = role.id;



--  SELECT employee.id employee.first_name, employee.last_name, role.title FROM employee
--  JOIN role on employee.role_id = role.id;

