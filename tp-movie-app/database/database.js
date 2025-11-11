import * as SQLite from "expo-sqlite";

// Abrimos (o creamos) la base local
const db = SQLite.openDatabase("app.db");

export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL
      );`
    );
  });
};

export const insertDefaultAdmin = () => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT OR IGNORE INTO users (name, username, password, role)
       VALUES (?, ?, ?, ?);`,
      ["Administrador", "admin", "1234", "admin"]
    );
  });
};

export const validateUser = (username, password, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      "SELECT * FROM users WHERE username = ? AND password = ?;",
      [username, password],
      (_, { rows }) => callback(rows._array[0]),
      (_, error) => console.error(error)
    );
  });
};

export default db;
