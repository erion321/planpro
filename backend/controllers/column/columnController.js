import db from "../../db/connect.js";

export const getColumns = async (req, res) => {
  const { id } = req.headers.authorization;

  const { selectedTeam } = req.body;
  const selectedBoard = await db.query(
    "SELECT * from selectedBoard where user_id = $1 and team_id = $2",
    [id, selectedTeam.id]
  );
  //console.log(selectedBoard.rows);

  if (selectedBoard.rows.length == 0) {
    return res.json([]);
  }
  console.log(selectedBoard.rows[0].board_id);

  const { rows } = await db.query("SELECT * from columns where board_id = $1", [
    selectedBoard.rows[0].board_id,
  ]);
  res.status(200).json(rows);
};

export const createColumns = async (req, res) => {
  const { id } = req.headers.authorization;
  const { column, selectedTeam } = req.body;
  const data = await db.query(
    "SELECT * from selectedBoard where user_id = $1 and team_id = $2",
    [id, selectedTeam.id]
  );

  const { rows } = await db.query(
    "INSERT INTO columns (board_id, name) values ($1, $2) returning *",
    [data.rows[0].board_id, column]
  );

  res.status(200).json(rows[0]);
};
