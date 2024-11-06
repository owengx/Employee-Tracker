INSERT into department (department_name) VALUES
('human Resource'),
('marketing'),
('accoutning'),
('operations');

INSERT INTO role (title, department_id, salary) VALUES
('recruiter', 1, 75000),
('marketing director', 2, 85000),
('CPA', 3, 90000),
('software engineer', 4, 80000);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('Bugs', 'Bunny', 1, 1),
('Willie', 'Coyote', 2, 2),
('Elmer', 'Fudd', 3, 3),
('Yosemite', 'Sam', 4, 4)