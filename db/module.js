// Importation et configuration de SQLite (verbose pour faciliter debogage avec des messages)
const sqlite3 = require("sqlite3").verbose();
// Création/connexion à la base de données
const db = new sqlite3.Database("./db/database.db");
// Création d'un tableau avec serialize
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL CHECK(LENGTH(description) <= 50),
    content TEXT NOT NULL
    )`);
});
// Exportation de la base de données
module.exports = db;