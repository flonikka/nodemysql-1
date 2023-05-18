-- CREATE DATABASE blogsweb_users_app;
-- USE blogsweb_users_app;

CREATE TABLE users (
    id integer PRIMARY KEY AUTO_INCREMENT,
    first_name varchar(45) NOT NULL,
    email varchar(45) NOT NULL,
    phone varchar(45) NOT NULL,
    subject varchar(45) NOT NULL,
    comments varchar(45) NOT NULL,
    created timestamp NOT NULL DEFAULT NOW()
);

INSERT INTO users (first_name, email, phone, subject, comments)
VALUES
("Thomas", "thomas@gmail.com", "23988672", "Management", "Please contact me");