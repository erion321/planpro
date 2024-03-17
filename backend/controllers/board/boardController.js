import db from "../../db/connect.js";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export const getBoards = async (req, res) => {
  console.log("first");
  const token = req.headers.authorization.split("Bearer ")[1];

  if (!token) {
    return res.json([]);
  }
  const decoded = jwtDecode(token);
  const user_id = decoded.id;

  const selectedTeam = await db.query(
    "SELECT * from selectedTeam where user_id = $1",
    [user_id]
  );

  if (selectedTeam.rows.length == 0) {
    return res.json([]);
  }

  const { rows } = await db.query("SELECT * from boards where team_id = $1", [
    selectedTeam.rows[0].team_id,
  ]);

  res.status(200).json(rows);
};

export const createBoard = async (req, res) => {
  const { rows } = await db.query(
    "INSERT INTO boards (team_id, name) values ($1, $2) returning *",
    [req.body.team_id, req.body.name]
  );

  res.status(200).json(rows[0]);
};

export const selectBoard = async (req, res) => {
  if (!req.headers.authorization.split("Bearer ")[1]) {
    return res.json([]);
  }
  const token = req.headers.authorization.split("Bearer ")[1];
  const decoded = jwtDecode(token);
  const user_id = decoded.id;

  let selectedBoard;

  if (req.body.id) {
    const { id } = req.body;
    //Delete previous row from openedTeam
    await db.query("DELETE FROM selectedBoard where user_id = $1", [user_id]);

    //Insert new team_id from the request body to openedTeam
    await db.query(
      "INSERT into selectedBoard (board_id, user_id) values($1, $2)",
      [id, user_id]
    );

    //Select team using openedTeam id
    const { rows } = await db.query("SELECT * from boards where id = $1", [id]);

    //Set openedTeam to the team we get from line above
    selectedBoard = rows[0];
  } else {
    //If we dont have the id eg. user just refreshes the page
    const data = await db.query(
      "SELECT * from selectedBoard where user_id = $1",
      [user_id]
    );

    if (data.rows.length == 0) {
      return res.json([]);
    }

    //Select the team using openedTeam team_id
    const { rows } = await db.query("SELECT * from boards where id = $1", [
      data.rows[0].team_id,
    ]);

    //Set selectedBoard to the team we get from line above
    selectedBoard = rows[0];
  }
  res.status(200).json(selectedBoard);
};
