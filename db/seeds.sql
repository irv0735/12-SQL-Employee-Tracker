INSERT INTO department (id, department_name)
VALUES  (1, "Finance"),
        (2, "Engineering"),
        (3, "Product Management"),
        (4, "Sales"),
        (5, "Operations");

INSERT INTO duty (id, title, salary, department_id)
VALUES  (1, "Accounts Payable", 45000, 1),
        (2, "Accounts Receivable", 50000, 1),
        (3, "Developer", 75000, 2),
        (4, "Team Lead", 95000, 2),
        (5, "SQA", 70000, 2),
        (6, "Senior Product Manager", 105000, 3),
        (7, "Product Manager", 88000, 3),
        (8, "Area Lead", 120000, 4), 
        (9, "Account Manager", 110000, 4),
        (10, "Project Manager", 97000, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1, "John", "Doe", 4, NULL),
        (2, "Erin", "Davis", 7, NULL),
        (3, "Brad", "Williams", 8, NULL),
        (4, "Jessica", "Young", 9, 3),
        (5, "Phil", "Geller", 10, NULL),
        (6, "Sonya", "Velman", 3, 1);

