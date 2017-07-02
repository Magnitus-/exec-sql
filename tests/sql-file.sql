CREATE TABLE tv_shows (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    seasons SMALLINT NOT NULL,
    finished ENUM('true', 'false') NOT NULL,
    PRIMARY KEY (id)
);

CREATE INDEX tv_shows_name_idx ON tv_shows (name(20));
