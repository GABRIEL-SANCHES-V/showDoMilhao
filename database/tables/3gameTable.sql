use showDoMilhao;

-- Game Table
CREATE TABLE IF NOT EXISTS game (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    questionIds JSON NOT NULL,
    score INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES user(id)
);