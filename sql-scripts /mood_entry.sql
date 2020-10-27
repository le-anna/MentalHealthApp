CREATE DATABASE IF NOT EXISTS mentalHealthApp;
USE mentalHealthApp;
DROP TABLE IF EXISTS mood_entry;
CREATE TABLE mood_entry (
	mood_entry_id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    PRIMARY KEY(mood_entry_id),
    CONSTRAINT FK_MoodEntry_UserInfo FOREIGN KEY (user_id) REFERENCES user_info(user_id)
)ENGINE=InnoDB;
