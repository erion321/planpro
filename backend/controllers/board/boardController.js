import db from "../../db/connect.js";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export const getBoards = async (req, res) => {
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
  const { id } = req.headers.authorization;
  const { board, selectedTeam } = req.body;

  const { rows } = await db.query(
    "INSERT INTO boards (team_id, name) values ($1, $2) returning *",
    [selectedTeam.id, board]
  );
  await db.query(
    "DELETE FROM selectedBoard where user_id = $1 and team_id = $2",
    [id, selectedTeam.id]
  );

  //Insert new team_id from the request body to openedTeam
  await db.query(
    "INSERT into selectedBoard (user_id, team_id, board_id ) values($1, $2, $3)",
    [id, selectedTeam.id, rows[0].id]
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

  const { boardId, selectedTeam } = req.body;
  console.log(selectedTeam);
  let selectedBoard;

  if (req.body.boardId) {
    console.log("first");
    //Delete previous row from openedTeam
    await db.query(
      "DELETE FROM selectedBoard where user_id = $1 and team_id = $2",
      [user_id, selectedTeam.id]
    );

    //Insert new team_id from the request body to openedTeam
    await db.query(
      "INSERT into selectedBoard (user_id, team_id, board_id ) values($1, $2, $3)",
      [user_id, selectedTeam.id, boardId]
    );

    //Select team using openedTeam id
    const { rows } = await db.query(
      "SELECT * from boards where id = $1 and team_id = $2",
      [boardId, selectedTeam.id]
    );

    console.log(rows);

    //Set openedTeam to the team we get from line above
    selectedBoard = rows[0];
  } else {
    //If we dont have the id eg. user just refreshes the page
    const data = await db.query(
      "SELECT * from selectedBoard where user_id = $1 and team_id = $2",
      [user_id, selectedTeam.id]
    );

    if (data.rows.length == 0) {
      console.log("second");
      return res.json([]);
    }

    //Select the team using openedTeam team_id
    const { rows } = await db.query(
      "SELECT * from boards where id = $1 and team_id = $2",
      [data.rows[0].board_id, selectedTeam.id]
    );

    //Set selectedBoard to the team we get from line above
    selectedBoard = rows[0];
  }
  res.status(200).json(selectedBoard);
};
