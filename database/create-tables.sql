-- NOTES:
-- Some id's are going to be created with uuid-v4 or nanoid
CREATE TABLE words (
    id serial PRIMARY KEY,
    word varchar(5) NOT NULL,
    used bool DEFAULT FALSE NOT NULL
);

CREATE TABLE players (
    id varchar(23) PRIMARY KEY,
    username varchar(255) UNIQUE,
    guest bool DEFAULT TRUE NOT NULL
);

CREATE TABLE games (
    id serial PRIMARY KEY,
    word int NOT NULL,
    player varchar(23) NOT NULL,
    won bool DEFAULT false,
    FOREIGN KEY (word) REFERENCES words(id),
    FOREIGN KEY (player) REFERENCES players(id)
);

-- WITH THIS TABLE A PLAYER CAN SAVE ITS PROGRESS AND THE SYSTEM CAN COUNT THE TRIES
CREATE TABLE tries (
    id serial PRIMARY KEY,
    try varchar(5) NOT NULL,
    game int NOT NULL,
    FOREIGN KEY (game) REFERENCES games(id)
);

-- WHEN A PLAYER RE-JOINS TO GAME:
-- SELECT t.try FROM tries t INNER JOIN games g on g.id = t.game WHERE g.player = ? AND g.word = ? LIMIT 5;
