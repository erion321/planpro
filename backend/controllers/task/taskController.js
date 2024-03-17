import db from "../../db/connect.js";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export const getTasks = async (req, res) => {
  const token = req.headers.authorization.split("Bearer ")[1];

  if (!token) {
    return res.json([]);
  }
  const decoded = jwtDecode(token);
  const user_id = decoded.id;

  /*  const selectedTask = await db.query(
    "SELECT * from selectedTask where user_id = $1",
    [user_id]
  );

  if (selectedTask.rows.length == 0) {
    return res.json([]);
  } */

  const { rows } = await db.query("SELECT * from tasks where user_id = $1", [
    user_id,
  ]);

  console.log(rows);

  res.status(200).json(rows);
};

export const createTask = async (req, res) => {
  const token = req.headers.authorization.split("Bearer ")[1];

  if (!token) {
    return res.json([]);
  }
  const decoded = jwtDecode(token);
  const user_id = decoded.id;

  const { rows } = await db.query(
    "INSERT INTO tasks (column_id, user_id, name) values ($1, $2, $3) returning *",
    [req.body.column_id, user_id, req.body.name]
  );

  res.status(200).json(rows[0]);
};

export const selectTask = async (req, res) => {
  console.log(req.headers.authorization.split("Bearer ")[1]);
  if (!req.headers.authorization.split("Bearer ")[1]) {
    return res.json([]);
  }
  const token = req.headers.authorization.split("Bearer ")[1];
  const decoded = jwtDecode(token);
  const user_id = decoded.id;

  let selectedTask;

  if (req.body.id) {
    const { id } = req.body;
    //Delete previous row from openedTeam
    await db.query("DELETE FROM selectedTask where user_id = $1", [user_id]);

    //Insert new team_id from the request body to openedTeam
    await db.query(
      "INSERT into selectedTask (task_id, user_id) values($1, $2)",
      [id, user_id]
    );

    //Select team using openedTeam id
    const { rows } = await db.query("SELECT * from tasks where id = $1", [id]);

    //Set openedTeam to the team we get from line above
    selectedTask = rows[0];
  } else {
    //If we dont have the id eg. user just refreshes the page
    const data = await db.query(
      "SELECT * from selectedTask where user_id = $1",
      [user_id]
    );

    if (data.rows.length == 0) {
      return res.json([]);
    }

    //Select the team using openedTeam team_id
    const { rows } = await db.query("SELECT * from tasks where id = $1", [
      data.rows[0].team_id,
    ]);

    //Set selectedBoard to the team we get from line above
    selectedTask = rows[0];
  }
  console.log(selectedTask);
  res.status(200).json(selectedTask);
};
