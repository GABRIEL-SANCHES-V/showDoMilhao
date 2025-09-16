USE showDoMilhaoTest;

-- Question Table
CREATE TABLE IF NOT EXISTS question (
    id INT AUTO_INCREMENT PRIMARY KEY,
    statement TEXT NOT NULL,
    questionLevel ENUM('easy', 'medium', 'hard') NOT NULL,
    alternativeA VARCHAR(510) NOT NULL,
    alternativeB VARCHAR(510) NOT NULL,
    alternativeC VARCHAR(510) NOT NULL,
    alternativeD VARCHAR(510) NOT NULL,
    correctAnswer ENUM('a', 'b', 'c', 'd') NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);