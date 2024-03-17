/* 
- \? list all the commands
- \l list databases
- \conninfo display information about current connection
- \c [DBNAME] connect to new database, e.g., \c template1
- \dt list tables of the public schema
- \dt <schema-name>.* list tables of certain schema, e.g., \dt public.*
- \dt *.* list tables of all schemas
- Then you can run SQL statements, e.g., SELECT * FROM my_table;(Note: a statement must be terminated with semicolon ;)
- \q quit psql 
- \d table name 
- \d public.table_name show data types

*/

CREATE TABLE users (
    id serial primary key not null,
    name varchar(50) not null,
    email varchar(50) not null,
    password varchar(100) not null
);

CREATE TABLE teams (
    id uuid DEFAULT gen_random_uuid(),
    user_id bigint,
    members text[],
    name varchar(50)
);

CREATE TABLE boards (
    id uuid DEFAULT gen_random_uuid(),
    team_id text,
    name varchar(50)
);

CREATE TABLE columns (
    id uuid DEFAULT gen_random_uuid(),
    board_id text,
    name varchar(50)
);

CREATE TABLE tasks (
    id uuid DEFAULT gen_random_uuid(),
    column_id text,
    user_id bigint,
    name varchar(50),
    description varchar(200),
    assignedTo json[]
);

CREATE TABLE selectedTeam (
  user_id text,
  team_id text PRIMARY KEY
);

CREATE TABLE selectedBoard (
  user_id text,
  board_id text PRIMARY KEY
);

CREATE TABLE selectedTask (
  user_id text,
  column_id text PRIMARY KEY
);


