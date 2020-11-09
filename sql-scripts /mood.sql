USE mentalHealthApp;
DROP TABLE IF EXISTS mood;
CREATE TABLE mood (
	mood_id int NOT NULL AUTO_INCREMENT,
    mood_entry_id int NOT NULL,
	name varchar(45) DEFAULT NULL,
	scale int DEFAULT NULL,
    PRIMARY KEY(mood_id),
	CONSTRAINT FK_Mood_MoodEntry FOREIGN KEY (mood_entry_id) REFERENCES mood_entry(mood_entry_id)
)ENGINE=InnoDB;