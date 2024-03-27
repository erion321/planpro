import db from "../../db/connect.js";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export const getUsersToInvite = async (req, res) => {
  const userName = req.params.name;
  const { id, name, email } = req.headers.authorization;
  console.log(id);

  const selectedUsers = await db.query(
    "SELECT * from users where name LIKE $1 AND name != $2",
    [`${userName}%`, name]
  );

  res.status(200).json(selectedUsers.rows);
};

export const inviteUser = async (req, res) => {
  const user = req.headers.authorization;
  const {
    user_id,
    team: { id, members, name },
  } = req.body;

  const invitations = await db.query(
    "SELECT * from invitations where teamid = $1",
    [id]
  );

  if (invitations.rows.length > 0) {
    return res.status(400).json({ message: "Invitation was already sent" });
  }

  //"UPDATE users SET invitations = array_append(invitations, $1) where id = $2 returning *",
  const { rows } = await db.query(
    "INSERT into invitations (userid, invitor, teamId, teamName) values($1, $2, $3, $4) returning *",
    [user_id, user.name, id, name]
  );

  res.status(200).json(rows);
};

export const getInvitations = async (req, res) => {
  const { id } = req.headers.authorization;

  const invitations = await db.query(
    "SELECT * from invitations where userid = $1",
    [id]
  );

  res.json(invitations.rows);
};
