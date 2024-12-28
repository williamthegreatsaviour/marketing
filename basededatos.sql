CREATE TABLE videos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255),
    descripcion TEXT,
    url_video VARCHAR(255),
    tema VARCHAR(255),
    url_facebook VARCHAR(255),
    url_youtube VARCHAR(255),
    url_instagram VARCHAR(255),
    url_linkedin VARCHAR(255)
);

CREATE TABLE likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    video_id INT NOT NULL,
    user_id INT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (video_id) REFERENCES videos(id)
);

CREATE TABLE dislikes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    video_id INT NOT NULL,
    user_id INT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (video_id) REFERENCES videos(id)
);
