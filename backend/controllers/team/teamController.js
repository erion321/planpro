import db from "../../db/connect.js";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export const getTeams = async (req, res) => {
  const { id, name } = req.headers.authorization;

  const member = { id, name };
  console.log(member);
  const { rows } = await db.query(
    "SELECT * from teams WHERE $1 = ANY (members) OR user_id = $2",
    [member, id]
  );

  res.status(200).json(rows);
};

export const createTeam = async (req, res) => {
  const { team } = req.body;

  const { id } = req.headers.authorization;

  const { rows } = await db.query(
    "INSERT INTO teams (user_id, name) values ($1, $2) returning *",
    [id, team]
  );

  await db.query("DELETE FROM selectedTeam where user_id = $1", [id]);
  console.log(rows[0].id);
  //Insert new team_id from the request body to openedTeam
  await db.query("INSERT into selectedTeam (team_id, user_id) values($1, $2)", [
    rows[0].id,
    id,
  ]);

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

export const joinTeamByInvite = async (req, res) => {
  const { id, name } = req.headers.authorization;

  const { teamId } = req.body;
  /* const { rows } = await db.query("SELECT * from teams where id = $1", [
    teamId,
  ]); */

  const member = { id, name };

  const ifAlreadyMember = await db.query(
    "SELECT members FROM teams WHERE $1 = ANY (members)",
    [member]
  );

  /* if (ifAlreadyMember.rows.length > 0) {
    return res
      .status(400)
      .json({ message: "You are already a member in this team" });
  } */

  const AddMember = await db.query(
    "UPDATE teams set members = ARRAY_APPEND(members, $1) where id = $2",
    [member, teamId]
  );
  console.log(id);
  //Delete previous row from openedTeam
  await db.query("DELETE FROM selectedTeam where user_id = $1", [id]);

  //Insert new team_id from the request body to openedTeam
  await db.query("INSERT into selectedTeam (team_id, user_id) values($1, $2)", [
    teamId,
    id,
  ]);

  //Select team using openedTeam id
  const { rows } = await db.query("SELECT * from teams where id = $1", [
    teamId,
  ]);

  res.status(200).json(rows[0]);
};
