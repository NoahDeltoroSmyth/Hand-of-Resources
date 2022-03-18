-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS bikes;
DROP TABLE IF EXISTS concerts;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS guitars;
DROP TABLE IF EXISTS restaurants;

CREATE TABLE bikes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    manufacturer TEXT NOT NULL,
    model TEXT NOT NULL,
    frame_size INT NOT NULL
);

CREATE TABLE concerts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    venue TEXT NOT NULL,
    band TEXT NOT NULL,
    date DATE
);

CREATE TABLE games (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    genre TEXT NOT NULL,
    price SMALLINT
);

CREATE TABLE guitars (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    manufacturer TEXT NOT NULL,
    color TEXT NOT NULL,
    string_count SMALLINT
);

CREATE TABLE restaurants (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    open_at TIME NOT NULL,
    close_at TIME NOT NULL
);