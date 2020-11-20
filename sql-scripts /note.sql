USE mentalHealthApp;
DROP TABLE IF EXISTS note;
CREATE TABLE note (
	note_id int NOT NULL AUTO_INCREMENT,
	mood_entry_id int NOT NULL,
	note varchar(300) DEFAULT NULL,
	PRIMARY KEY(note_id),
	CONSTRAINT FK_Note_MoodEntry FOREIGN KEY (mood_entry_id) REFERENCES mood_entry(mood_entry_id)
)ENGINE=InnoDB;

