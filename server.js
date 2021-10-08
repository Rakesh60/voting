import express from "express";
import mysql from "mysql";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "voting_detail",
});
db.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
  if (error) {
    console.log(`connection Failed.`);
    console.log(error);
  } else {
    console.log(`Database connection has been established.`);
  }
});

const app = express();
const PORT = 6001;
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Backend is running at Port ${PORT}`);
});

app.get("/cand", (req, res) => {
  const { body } = req.body;
  let query = `SELECT * FROM voting_detail.candidate`;
  db.query(query, async (err, response) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(response);
    }
  });
});

app.post("/vote", (req, res) => {
  const { voter_name, voter_age } = req.body;
  let query = `INSERT INTO voting_detail.voter (voter_name,voter_age) VALUES ('${voter_name}',${voter_age});
    `;
  db.query(query, async (err, response) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(response);
    }
  });
});
app.post("/cast", (req, res) => {
  const { voter_id, can_id } = req.body;
  let query = `INSERT INTO voting_detail.castin_list (voter_id,can_id) VALUES ('${voter_id}', '${can_id}');
      `;
  db.query(query, async (err, response) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(response);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Backend is running at Port ${PORT}`);
});
