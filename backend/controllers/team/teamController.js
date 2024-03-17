import db from "../../db/connect.js";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export const getTeams = async (req, res) => {

  const token = req.headers.authorization.split("Bearer ")[1];

  const user = jwt.verify(token, process.env.JWT_SECRET);

  const { rows } = await db.query("SELECT * from teams where user_id = $1", [
    user.id,
  ]);

  res.status(200).json(rows);
};

export const createTeam = async (req, res) => {
  const { team, token } = req.body;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const { rows } = await db.query(
    "INSERT INTO teams (user_id, name) values ($1, $2) returning *",
    [decoded.id, team]
  );
  res.status(200).send(rows[0]);
};

export const selectTeam = async (req, res) => {
  if (!req.headers.authorization.split("Bearer ")[1]) {
    return res.json([]);
  }
  const token = req.headers.authorization.split("Bearer ")[1];
  const decoded = jwtDecode(token);
  const user_id = decoded.id;

  let selectedTeam;

  if (req.body.id) {
    const { id } = req.body;
    //Delete previous row from openedTeam
    await db.query("DELETE FROM selectedTeam where user_id = $1", [user_id]);

    //Insert new team_id from the request body to openedTeam
    await db.query(
      "INSERT into selectedTeam (team_id, user_id) values($1, $2)",
      [id, user_id]
    );

    //Select team using openedTeam id
    const { rows } = await db.query("SELECT * from teams where id = $1", [id]);

    //Set openedTeam to the team we get from line above
    selectedTeam = rows[0];
  } else {
    //If we dont have the id eg. user just refreshes the page
    const data = await db.query(
      "SELECT * from selectedTeam where user_id = $1",
      [user_id]
    );

    if (data.rows.length == 0) {
      return res.json([]);
    }

    //Select the team using openedTeam team_id
    const { rows } = await db.query("SELECT * from teams where id = $1", [
      data.rows[0].team_id,
    ]);

    //Set openedTeam to the team we get from line above
    selectedTeam = rows[0];
  }
  res.status(200).json(selectedTeam);
};
