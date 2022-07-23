USE Argus_db
INSERT INTO departments (department_name, department_id)
VALUES 
("Chapter Command Company", 1),
("First Company", 2),
("Apothicarium", 3),
("Second Company", 4),
("Support Company", 5);

INSERT INTO roles (job_title, role_id, department_id, salary)
VALUES 
("Chapter Master", 1, 1, 158000),
("Emperor's Champion", 2, 1, 85000),
("Lieutenant", 3, 1, 78000),
("Captain", 4, 2, 83000),
("Apothecary", 5, 3, 72000),
("Heavy Weapons Marine", 6, 2, 175000),
("Tactical Marine", 7, 4, 65000),
("Assault Marine", 8, 4, 79000),
("Scout", 9, 4, 81000),
("Brother in Arms", 10, 2, 69500),
("Sergeant in Arms", 11, 5, 72000),
("Chapter Thrall", 12, 5, 1)
;
INSERT INTO employees (employee_id, first_name, last_name, role_id, manager_id) VALUES
(503, "Remus", "Ularin", 6,  1),
(458, "Megalla", "Fortis", 7,  1),
(420, "Arminius", "Astalla", 8,  1),
(468, "Alaric", "Corustus", 9,  1),
(473, "Maximus", "Austalus", 10,  1),
(453, "Argentum", "Majoris", 11,  1),
(134, "Bortus", "Necxallus", 5,  1),
(462, "Corvus", "Bellum", 4,  1),
(435, "Dallus", "Marius", 3,  1),
(427, "Ponta", "Dacalles", 2,  1),
(392, "Brutus", "Callumus", 1,  5);
