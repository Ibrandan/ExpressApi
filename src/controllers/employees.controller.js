import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * from employees");
    res.json(result);
  } catch (error) {
    return res.sendStatus(500).json({ message: "Something went wrong" });
  }
};

export const getEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT * from employees WHERE id = ?", [
      id,
    ]);
    if (rows.length <= 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    return res.sendStatus(500).json({ message: "Something went wrong" });
  }
};

export const createEmployees = async (req, res) => {
  const { name, salary } = req.body;

  try {
    const [rows] = await pool.query(
      "INSERT INTO employees (name,salary) VALUES (?, ?)",
      [name, salary]
    );
    res.send({ id: rows.insertId, name, salary });
  } catch (error) {
    return res.sendStatus(500).json({ message: "Something went wrong" });
  }
};

export const putEmployees = async (req, res) => {
  const { id } = req.params;
  const { name, salary } = req.body;
  try {
    const result = await pool.query(
      "UPDATE employees SET (name = ?,salary = ?) WHERE id = ?",
      [name, salary, id]
    );
    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    const [rows] = await pool.query("SELECT * from employees WHERE id = ?", [
      id,
    ]);
    res.json(rows[0]);
  } catch (error) {
    return res.sendStatus(500).json({ message: "Something went wrong" });
  }
};

export const patchEmployees = async (req, res) => {
  const { id } = req.params;
  const { name, salary } = req.body;
  try {
    const result = await pool.query(
      "UPDATE employees SET (name = IFNULL(?, name), salary = IFNULL(?, salary)) WHERE id = ?",
      [name, salary, id]
    );
    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    const [rows] = await pool.query("SELECT * from employees WHERE id = ?", [
      id,
    ]);
    res.json(rows[0]);
  } catch (error) {
    return res.sendStatus(500).json({ message: "Something went wrong" });
  }
};

export const deleteEmployees = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM employees WHERE id=?", [id]);
    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500).json({ message: "Something went wrong" });
  }
};
