import db from "../../db/connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);

    const duplicateEmail = await db.query(
      "SELECT * from users WHERE email = $1",
      [email]
    );

    if (duplicateEmail.rows.length > 0) {
      return res.status(400).json({ message: "This email already exist" });
    }

    const { rows } = await db.query(
      "INSERT INTO users (name, email, password) values ($1, $2, $3) returning *",
      [name, email, hashPassword]
    );
    const token = jwt.sign(
      {
        id: rows[0].id,
        name: rows[0].name,
        email: rows[0].email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.send(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { rows } = await db.query("SELECT * from users WHERE email = $1", [
      email,
    ]);

    if (rows.length < 1) {
      return res.status(400).json({ message: "This user does not exist" });
    }

    if (!bcrypt.compareSync(password, rows[0].password)) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      {
        id: rows[0].id,
        name: rows[0].name,
        email: rows[0].email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.send(error);
  }
};
