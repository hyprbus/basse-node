-- create database basse;
create schema basse;

-- create test table
create table tasks (
id INT GENERATED ALWAYS AS identity,
title text,
description text,
completed boolean default false,
created_at TIMESTAMP NOT null default now()
)

-- some test values
insert into tasks(title, description)
values
('Task one', 'Do this'),
('Task two', 'Do that')

-- https://stackoverflow.com/questions/2951875/postgresql-how-do-i-set-the-search-path-at-the-user-level
ALTER ROLE postgres SET search_path = basse;

-- user table
create table basse_user (
id INT GENERATED ALWAYS AS identity,
username text unique not null,
password text not null,
created_at TIMESTAMP NOT null default now()
)
