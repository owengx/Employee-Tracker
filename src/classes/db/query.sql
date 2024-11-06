SELECT role.id,role.title,role.salary, department.department_name 
FROM role
JOIN department ON role.department_id = department.id;