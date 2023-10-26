CREATE TABLE Game (
id SERIAL PRIMARY KEY,
NickName VARCHAR(255) UNIQUE,
Score INTEGER,
Lives INTEGER,
StartDateTime TIMESTAMP
);

CREATE TABLE Question (
  id SERIAL PRIMARY KEY,
  GameID INTEGER NULL,
Question VARCHAR(255),
RoundNumber INTEGER,
Hint VARCHAR(255),
OptionA VARCHAR(255),
OptionB VARCHAR(255),
OptionC VARCHAR(255),
OptionD VARCHAR(255),
Correct_Option VARCHAR(1),
Created_At TIMESTAMP,
FOREIGN KEY (GameID) REFERENCES Game(id)
);