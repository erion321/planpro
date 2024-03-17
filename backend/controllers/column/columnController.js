import db from "../../db/connect.js";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export const getColumns = async (req, res) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  console.log(token);
  if (!token) {
    return res.json([]);
  }

  const decoded = jwtDecode(token);
  const user_id = decoded.id;

  const selectedBoard = await db.query(
    "SELECT * from selectedBoard where user_id = $1",
    [user_id]
  );

  if (selectedBoard.rows.length == 0) {
    return res.json([]);
  }

  const { rows } = await db.query("SELECT * from columns where board_id = $1", [
    selectedBoard.rows[0].board_id,
  ]);

  res.status(200).json(rows);
};

export const createColumns = async (req, res) => {
  const data = await db.query("SELECT * from selectedBoard");

  const { rows } = await db.query(
    "INSERT INTO columns (board_id, name) values ($1, $2) returning *",
    [data.rows[0].board_id, req.body.column]
  );

  res.status(200).json(rows[0]);
};
