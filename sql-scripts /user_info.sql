USE mentalHealthApp;
DROP TABLE IF EXISTS user_info;
CREATE TABLE user_info (
	user_id int NOT NULL AUTO_INCREMENT,
	name varchar(45) DEFAULT NULL,
  	PRIMARY KEY(user_id)
)ENGINE=InnoDB;