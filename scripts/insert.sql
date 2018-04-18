-- INSERT INTO `FOLDERS` (`id`,`name`) VALUES (1,'HOME');

INSERT INTO `FREQUENCY` (`id`,`name`) VALUES (1,'JAMAIS');
INSERT INTO `FREQUENCY` (`id`,`name`) VALUES (2,'UNE FOIS');
INSERT INTO `FREQUENCY` (`id`,`name`) VALUES (3,'1x / JOUR');
INSERT INTO `FREQUENCY` (`id`,`name`) VALUES (4,'1x / SEMAINE');
INSERT INTO `FREQUENCY` (`id`,`name`) VALUES (5,'1x / MOIS');
INSERT INTO `FREQUENCY` (`id`,`name`) VALUES (6,'1x / AN');

INSERT INTO `PRIORITIES` (`id`,`name`,`color`) VALUES (1,'NORMALE',NULL);
INSERT INTO `PRIORITIES` (`id`,`name`,`color`) VALUES (2,'IMPORTANTE','yellow');
INSERT INTO `PRIORITIES` (`id`,`name`,`color`) VALUES (3,'URGENTE','orange');
INSERT INTO `PRIORITIES` (`id`,`name`,`color`) VALUES (4,'CRITIQUE','red');

INSERT INTO `STATES` (`id`,`name`) VALUES (1,'EN CONCEPTION');
INSERT INTO `STATES` (`id`,`name`) VALUES (2,'A FAIRE');
INSERT INTO `STATES` (`id`,`name`) VALUES (3,'EN COURS');
INSERT INTO `STATES` (`id`,`name`) VALUES (4,'EN PAUSE');
INSERT INTO `STATES` (`id`,`name`) VALUES (5,'ANNULE');
INSERT INTO `STATES` (`id`,`name`) VALUES (6,'FINI');

INSERT INTO `STATUS` (`id`,`name`) VALUES (1,'EN LIGNE');
INSERT INTO `STATUS` (`id`,`name`) VALUES (2,'OCCUPE');
INSERT INTO `STATUS` (`id`,`name`) VALUES (3,'ABSENT');
INSERT INTO `STATUS` (`id`,`name`) VALUES (4,'INVISIBLE');
INSERT INTO `STATUS` (`id`,`name`) VALUES (5,'HORS-LIGNE');

INSERT INTO `TAGS` (`id`,`name`) VALUES (1,'COURSE');
INSERT INTO `TAGS` (`id`,`name`) VALUES (2,'FAMILLE');
INSERT INTO `TAGS` (`id`,`name`) VALUES (3,'TRAVAIL');
INSERT INTO `TAGS` (`id`,`name`) VALUES (4,'URGENT');
INSERT INTO `TAGS` (`id`,`name`) VALUES (5,'RDV');
INSERT INTO `TAGS` (`id`,`name`) VALUES (6,'VACANCE');

INSERT INTO `TYPES` (`id`,`name`) VALUES (1,'USER');
INSERT INTO `TYPES` (`id`,`name`) VALUES (777,'ADMIN');

INSERT INTO `ADRESS` (`id`,`pathway_number`,`pathway_type`,`pathway_name`,`complement`,`code`,`city`,`country`) VALUES (1,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO `ADRESS` (`id`,`pathway_number`,`pathway_type`,`pathway_name`,`complement`,`code`,`city`,`country`) VALUES (2,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO `ADRESS` (`id`,`pathway_number`,`pathway_type`,`pathway_name`,`complement`,`code`,`city`,`country`) VALUES (3,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO `ADRESS` (`id`,`pathway_number`,`pathway_type`,`pathway_name`,`complement`,`code`,`city`,`country`) VALUES (4,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO `ADRESS` (`id`,`pathway_number`,`pathway_type`,`pathway_name`,`complement`,`code`,`city`,`country`) VALUES (5,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO `ADRESS` (`id`,`pathway_number`,`pathway_type`,`pathway_name`,`complement`,`code`,`city`,`country`) VALUES (6,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO `ADRESS` (`id`,`pathway_number`,`pathway_type`,`pathway_name`,`complement`,`code`,`city`,`country`) VALUES (7,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO `ADRESS` (`id`,`pathway_number`,`pathway_type`,`pathway_name`,`complement`,`code`,`city`,`country`) VALUES (8,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO `ADRESS` (`id`,`pathway_number`,`pathway_type`,`pathway_name`,`complement`,`code`,`city`,`country`) VALUES (9,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO `ADRESS` (`id`,`pathway_number`,`pathway_type`,`pathway_name`,`complement`,`code`,`city`,`country`) VALUES (10,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO `ADRESS` (`id`,`pathway_number`,`pathway_type`,`pathway_name`,`complement`,`code`,`city`,`country`) VALUES (11,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO `ADRESS` (`id`,`pathway_number`,`pathway_type`,`pathway_name`,`complement`,`code`,`city`,`country`) VALUES (12,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO `ADRESS` (`id`,`pathway_number`,`pathway_type`,`pathway_name`,`complement`,`code`,`city`,`country`) VALUES (13,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO `ADRESS` (`id`,`pathway_number`,`pathway_type`,`pathway_name`,`complement`,`code`,`city`,`country`) VALUES (14,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO `ADRESS` (`id`,`pathway_number`,`pathway_type`,`pathway_name`,`complement`,`code`,`city`,`country`) VALUES (15,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO `ADRESS` (`id`,`pathway_number`,`pathway_type`,`pathway_name`,`complement`,`code`,`city`,`country`) VALUES (16,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO `ADRESS` (`id`,`pathway_number`,`pathway_type`,`pathway_name`,`complement`,`code`,`city`,`country`) VALUES (17,NULL,NULL,NULL,NULL,NULL,NULL,NULL);

INSERT INTO `PEOPLE` (`id`,`ADRESS_id`,`name`,`surname`,`birth`,`phone`,`image`) VALUES (1,1,'Mohamed','BENNOUR',NULL,NULL,NULL);
INSERT INTO `PEOPLE` (`id`,`ADRESS_id`,`name`,`surname`,`birth`,`phone`,`image`) VALUES (2,2,'Laétitia','TRAN',NULL,NULL,NULL);
INSERT INTO `PEOPLE` (`id`,`ADRESS_id`,`name`,`surname`,`birth`,`phone`,`image`) VALUES (3,3,'Stéphane','GAUDEFROY',NULL,NULL,NULL);
INSERT INTO `PEOPLE` (`id`,`ADRESS_id`,`name`,`surname`,`birth`,`phone`,`image`) VALUES (4,4,'Simon','BONHOURE',NULL,NULL,NULL);
INSERT INTO `PEOPLE` (`id`,`ADRESS_id`,`name`,`surname`,`birth`,`phone`,`image`) VALUES (5,5,'Victor','ANTON',NULL,NULL,NULL);
INSERT INTO `PEOPLE` (`id`,`ADRESS_id`,`name`,`surname`,`birth`,`phone`,`image`) VALUES (6,6,'Lucie','JOSEPH',NULL,NULL,NULL);
INSERT INTO `PEOPLE` (`id`,`ADRESS_id`,`name`,`surname`,`birth`,`phone`,`image`) VALUES (7,7,'Pierre-Edouard','DE BREVAND',NULL,NULL,NULL);
INSERT INTO `PEOPLE` (`id`,`ADRESS_id`,`name`,`surname`,`birth`,`phone`,`image`) VALUES (8,8,'Anthony','CORROT',NULL,NULL,NULL);
INSERT INTO `PEOPLE` (`id`,`ADRESS_id`,`name`,`surname`,`birth`,`phone`,`image`) VALUES (9,9,'Fabien','CRESCENT',NULL,NULL,NULL);
INSERT INTO `PEOPLE` (`id`,`ADRESS_id`,`name`,`surname`,`birth`,`phone`,`image`) VALUES (10,10,'Morgan','CORROYER',NULL,NULL,NULL);
INSERT INTO `PEOPLE` (`id`,`ADRESS_id`,`name`,`surname`,`birth`,`phone`,`image`) VALUES (11,11,'Olivier','CHERICA',NULL,NULL,NULL);
INSERT INTO `PEOPLE` (`id`,`ADRESS_id`,`name`,`surname`,`birth`,`phone`,`image`) VALUES (12,12,'Maxime','DELAPORTE',NULL,NULL,NULL);
INSERT INTO `PEOPLE` (`id`,`ADRESS_id`,`name`,`surname`,`birth`,`phone`,`image`) VALUES (13,13,'Adrien','FEVRE',NULL,NULL,NULL);
INSERT INTO `PEOPLE` (`id`,`ADRESS_id`,`name`,`surname`,`birth`,`phone`,`image`) VALUES (14,14,'Guillaume','MOURLON',NULL,NULL,NULL);
INSERT INTO `PEOPLE` (`id`,`ADRESS_id`,`name`,`surname`,`birth`,`phone`,`image`) VALUES (15,15,'Jérémie','SOFFICHITI',NULL,NULL,NULL);
INSERT INTO `PEOPLE` (`id`,`ADRESS_id`,`name`,`surname`,`birth`,`phone`,`image`) VALUES (16,16,'Quentin','ANSION',NULL,NULL,NULL);
INSERT INTO `PEOPLE` (`id`,`ADRESS_id`,`name`,`surname`,`birth`,`phone`,`image`) VALUES (17,17,'Vincent','THOMAS',NULL,NULL,NULL);

INSERT INTO `USERS` (`id`,`PEOPLE_id`,`STATUS_id`,`TYPES_id`,`email`,`password`,`date_creation`,`date_update`,`token`) VALUES (1,1,5,1,'m.bennour@it-akademy.fr','$2y$10$zjKaZOp/DWW2rdDNzCyfoua1htnBptMAs4N2g4h0OSPDDZl9zkEZy',NULL,NULL,NULL);
INSERT INTO `USERS` (`id`,`PEOPLE_id`,`STATUS_id`,`TYPES_id`,`email`,`password`,`date_creation`,`date_update`,`token`) VALUES (2,2,5,1,'l.tran@it-akademy.fr','$2y$10$FJaS57sIpalngOPWxmmZMuQsCtIpV49ysXS0CmefPhFMx0Zzo40x6',NULL,NULL,NULL);
INSERT INTO `USERS` (`id`,`PEOPLE_id`,`STATUS_id`,`TYPES_id`,`email`,`password`,`date_creation`,`date_update`,`token`) VALUES (3,3,5,1,'s.gaudefroy@it-akademy.fr','$2y$10$FaUUMilUVqTEwkHw8psD0.kXOSuxQiNVgb4AXjj1RQmxbOFEkRZui',NULL,NULL,NULL);
INSERT INTO `USERS` (`id`,`PEOPLE_id`,`STATUS_id`,`TYPES_id`,`email`,`password`,`date_creation`,`date_update`,`token`) VALUES (4,4,5,1,'s.bonhoure@it-akademy.fr','$2y$10$4zZgWKok4h9fTACl53ovies7efrFnB0bF5tDbwO/6k0nmDMOhv6Uy',NULL,NULL,NULL);
INSERT INTO `USERS` (`id`,`PEOPLE_id`,`STATUS_id`,`TYPES_id`,`email`,`password`,`date_creation`,`date_update`,`token`) VALUES (5,5,5,1,'v.anton@it-akademy.fr','$2y$10$XvVqqJUKQ8/7WFStNuh.rOGm0gkoqf55Lb364MYqw0spfADGbrFqq',NULL,NULL,NULL);
INSERT INTO `USERS` (`id`,`PEOPLE_id`,`STATUS_id`,`TYPES_id`,`email`,`password`,`date_creation`,`date_update`,`token`) VALUES (6,6,5,1,'l.joseph@it-akademy.fr','$2y$10$BCXNKOAcIeepUum7kn1IiOJF8KxRjkPHTL6H/h6NUjUjJyyGU7QxC',NULL,NULL,NULL);
INSERT INTO `USERS` (`id`,`PEOPLE_id`,`STATUS_id`,`TYPES_id`,`email`,`password`,`date_creation`,`date_update`,`token`) VALUES (7,7,5,1,'pe.debrevand@it-akademy.fr','$2y$10$lkx4MD5II6/4KeKb8TM/EOowO7NnxfvW9LNyYbUi0dXCxQ8noCvI2',NULL,NULL,NULL);
INSERT INTO `USERS` (`id`,`PEOPLE_id`,`STATUS_id`,`TYPES_id`,`email`,`password`,`date_creation`,`date_update`,`token`) VALUES (8,8,5,1,'a.corrot@it-akademy.fr','$2y$10$Ag117vBPDgb24cLHSdRQ8./5zahyror7WJydHR/rwWgu5YIxqu/PG',NULL,NULL,NULL);
INSERT INTO `USERS` (`id`,`PEOPLE_id`,`STATUS_id`,`TYPES_id`,`email`,`password`,`date_creation`,`date_update`,`token`) VALUES (9,9,5,1,'f.crescent@it-akademy.fr','$2y$10$b2tNy.SPlQOXoftgzPbDyeBk57UvvMRAPDR/IoMWJvA9PPQLuXbbO',NULL,NULL,NULL);
INSERT INTO `USERS` (`id`,`PEOPLE_id`,`STATUS_id`,`TYPES_id`,`email`,`password`,`date_creation`,`date_update`,`token`) VALUES (10,10,5,1,'m.corroyer@it-akademy.fr','$2y$10$/Ev1tet6513WFinmqe00XO/223hB61yA1GwQLs..RI3p8DWPKFNCC',NULL,NULL,NULL);
INSERT INTO `USERS` (`id`,`PEOPLE_id`,`STATUS_id`,`TYPES_id`,`email`,`password`,`date_creation`,`date_update`,`token`) VALUES (11,11,5,1,'o.cherica@it-akademy.fr','$2y$10$a.iGLdumWaLi5ESfK4RhxuNnjy53DH7DDfxXbnYSRtlj5ji7gHO6.',NULL,NULL,NULL);
INSERT INTO `USERS` (`id`,`PEOPLE_id`,`STATUS_id`,`TYPES_id`,`email`,`password`,`date_creation`,`date_update`,`token`) VALUES (12,12,5,1,'m.delaporte@it-akademy.fr','$2y$10$FMFUw9Ee1yLcqon7RouPBejf2U/5bWcWBBPLDR0i3XbaKsUboaM4a',NULL,NULL,NULL);
INSERT INTO `USERS` (`id`,`PEOPLE_id`,`STATUS_id`,`TYPES_id`,`email`,`password`,`date_creation`,`date_update`,`token`) VALUES (13,13,5,1,'a.fevre@it-akademy.fr','$2y$10$tJADab31AbDDYdTDBdiS9e5MQs2KUOipS9dlwbjTXnBdyv7aYdX.m',NULL,NULL,NULL);
INSERT INTO `USERS` (`id`,`PEOPLE_id`,`STATUS_id`,`TYPES_id`,`email`,`password`,`date_creation`,`date_update`,`token`) VALUES (14,14,5,1,'g.mourlon@it-akademy.fr','$2y$10$iSFWZh7Fn9O/5sP5PwTBDuC5TU3DyybCWDQtaRXBPG4s6orLzo8cq',NULL,NULL,NULL);
INSERT INTO `USERS` (`id`,`PEOPLE_id`,`STATUS_id`,`TYPES_id`,`email`,`password`,`date_creation`,`date_update`,`token`) VALUES (15,15,5,1,'j.soffichiti@it-akademy.fr','$2y$10$bGHG7JcTHZarMHnaTY3rueV1RpEoooZzhDaS09nw1Jq9qntCg3yiW',NULL,NULL,NULL);
INSERT INTO `USERS` (`id`,`PEOPLE_id`,`STATUS_id`,`TYPES_id`,`email`,`password`,`date_creation`,`date_update`,`token`) VALUES (16,16,5,1,'q.andries@it-akademy.fr','$2y$10$5JZA0PJ0zi5C5divMU2r0OyMfEcFSDXaTIV9.pA6kU/L/pbZE5xM2',NULL,NULL,NULL);
INSERT INTO `USERS` (`id`,`PEOPLE_id`,`STATUS_id`,`TYPES_id`,`email`,`password`,`date_creation`,`date_update`,`token`) VALUES (17,17,5,1,'v.thomas@it-akademy.fr','$2y$10$EPjKAH5eL7coEY5LtrmvX.WB8CX58k8XBjRH4QtesNEFt8UeRh3je',NULL,NULL,NULL);
