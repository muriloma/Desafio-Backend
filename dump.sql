CREATE DATABASE desafio_wvblabs;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR (32) UNIQUE NOT NULL,
    password VARCHAR (32) NOT NULL
);