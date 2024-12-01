<<<<<<< HEAD
// Importation des modules nécessaires
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db/module");
const path = require("path");
// Création d'une application Express
const app = express();
// Définition du port
const PORT = 3000;

// Configurer le dossier 'public' comme dossier statique
app.use(express.static("public"));

// Configuration du moteur de rendu EJS pour utiliser ejs sur index
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware pour traiter les données des requêtes HTTP
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Route principale - Affiche la page principale
app.get("/", (req, res) => {
  // S'assurer que la variable 'page' est bien initialisée
  const page = parseInt(req.query.page, 10) || 1; // La page par défaut est 1 si non spécifiée
  const limit = 3; // Nombre d'articles par page
  const offset = (page - 1) * limit; // Calcul de l'offset

  // Exécuter la requête SQL pour récupérer les articles
  db.all(
    "SELECT * FROM articles LIMIT ? OFFSET ?",
    [limit, offset],
    (err, rows) => {
      if (err) {
        console.error("Erreur lors de la récupération des articles :", err);
        res.status(500).send("Erreur /!\\");
      } else {
        // Récupérer le nombre total d'articles pour calculer le nombre total de pages
        db.get("SELECT COUNT(*) AS total FROM articles", (err, countResult) => {
          if (err) {
            console.error("Erreur lors du comptage des articles :", err);
            res.status(500).send("Erreur /!\\");
          } else {
            const totalArticles = countResult.total;
            const totalPages = Math.ceil(totalArticles / limit); // Calcul du nombre total de pages

            // Renvoyer la vue avec les articles et les informations de pagination
            res.render("index", {
              articles: rows,
              currentPage: page,
              totalPages: totalPages,
            });
          }
        });
      }
    }
  );
});
// Pour afficher un article spécifique
app.get("/article/:id", (req, res) => {
  const id = req.params.id;
  db.all("SELECT * FROM articles WHERE id=?", [id], (err, rows) => {
    if (err) {
      console.error("Erreur lors de la récupération des tâches :", err);
      res.status(500).send("Erreur /!\\");
    } else {
      res.render("article", { articles: rows[0] });
    }
  });
});
// Aller à la page admin
app.get("/admin", (req, res) => {
  db.all("SELECT * FROM articles", (err, rows) => {
    if (err) {
      console.error("Erreur lors de la récupération des tâches :", err);
      res.status(500).send("Erreur /!\\");
    } else {
      res.render("admin", { articles: rows });
    }
  });
});
// Ajouter nouvel article
app.post("/add", (req, res) => {
  const { title, type, image, description, content } = req.body;

  if (!title || !type) {
    return res
      .status(400)
      .send("Le titre et le type de l'article sont requis.");
  }

  db.run(
    `INSERT INTO articles (title, type, image, description, content) VALUES (?, ?, ?, ?, ?)`,
    [title, type, image, description, content],
    function (err) {
      if (err) {
        console.error("Erreur lors de l'ajout de la tâche :", err);
        res.status(500).send("Erreur /!\\");
      } else {
        // Récupération des articles mises à jour
        db.all("SELECT * FROM articles", (err, rows) => {
          if (err) {
            console.error("Erreur lors de la récupération des articles :", err);
            res.status(500).send("Erreur /!\\");
          } else {
            res.redirect("/admin");
          }
        });
      }
    }
  );
});

// Modifier un article
app.post("/admin/update/:id", (req, res) => {
  const id = req.params.id;
  const { title, type, image, description, content } = req.body;
  db.run(
    "UPDATE articles SET title = ?, type = ?, image = ?, description = ?, content = ? WHERE id = ?",
    [title, type, image, description, content, id],
    // [id],
    function (err) {
      if (err) {
        console.error(err);
        res.status(500).send("Erreur server!");
      } else {
        // route pour form
        res.redirect("/form");
      }
    }
  );
});
// Supprimer un article
app.post("/admin/delete/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM articles WHERE id= ?", [id], function (err) {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur server!");
    } else {
      res.redirect("/admin");
    }
  });
});
// Démarrage du serveur
app.listen(PORT, () =>
  console.log(`Le serveur tourne sous http://localhost:${PORT}`)
);
=======
// Importation des modules nécessaires
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db/module");
const path = require("path");
// Création d'une application Express
const app = express();
// Définition du port
const PORT = 3000;

// Configurer le dossier 'public' comme dossier statique
app.use(express.static("public"));

// Configuration du moteur de rendu EJS pour utiliser ejs sur index
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware pour traiter les données des requêtes HTTP
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Route principale - Affiche la page principale
app.get("/", (req, res) => {
  // S'assurer que la variable 'page' est bien initialisée
  const page = parseInt(req.query.page, 10) || 1; // La page par défaut est 1 si non spécifiée
  const limit = 3; // Nombre d'articles par page
  const offset = (page - 1) * limit; // Calcul de l'offset

  // Exécuter la requête SQL pour récupérer les articles
  db.all(
    "SELECT * FROM articles LIMIT ? OFFSET ?",
    [limit, offset],
    (err, rows) => {
      if (err) {
        console.error("Erreur lors de la récupération des articles :", err);
        res.status(500).send("Erreur /!\\");
      } else {
        // Récupérer le nombre total d'articles pour calculer le nombre total de pages
        db.get("SELECT COUNT(*) AS total FROM articles", (err, countResult) => {
          if (err) {
            console.error("Erreur lors du comptage des articles :", err);
            res.status(500).send("Erreur /!\\");
          } else {
            const totalArticles = countResult.total;
            const totalPages = Math.ceil(totalArticles / limit); // Calcul du nombre total de pages

            // Renvoyer la vue avec les articles et les informations de pagination
            res.render("index", {
              articles: rows,
              currentPage: page,
              totalPages: totalPages,
            });
          }
        });
      }
    }
  );
});
// Pour afficher un article spécifique
app.get("/article/:id", (req, res) => {
  const id = req.params.id;
  db.all("SELECT * FROM articles WHERE id=?", [id], (err, rows) => {
    if (err) {
      console.error("Erreur lors de la récupération des tâches :", err);
      res.status(500).send("Erreur /!\\");
    } else {
      res.render("article", { articles: rows[0] });
    }
  });
});
// Aller à la page admin
app.get("/admin", (req, res) => {
  db.all("SELECT * FROM articles", (err, rows) => {
    if (err) {
      console.error("Erreur lors de la récupération des tâches :", err);
      res.status(500).send("Erreur /!\\");
    } else {
      res.render("admin", { articles: rows });
    }
  });
});
// Ajouter nouvel article
app.post("/add", (req, res) => {
  const { title, type, image, description, content } = req.body;

  if (!title || !type) {
    return res
      .status(400)
      .send("Le titre et le type de l'article sont requis.");
  }

  db.run(
    `INSERT INTO articles (title, type, image, description, content) VALUES (?, ?, ?, ?, ?)`,
    [title, type, image, description, content],
    function (err) {
      if (err) {
        console.error("Erreur lors de l'ajout de la tâche :", err);
        res.status(500).send("Erreur /!\\");
      } else {
        // Récupération des articles mises à jour
        db.all("SELECT * FROM articles", (err, rows) => {
          if (err) {
            console.error("Erreur lors de la récupération des articles :", err);
            res.status(500).send("Erreur /!\\");
          } else {
            res.redirect("/admin");
          }
        });
      }
    }
  );
});

// Modifier un article
app.post("/admin/update/:id", (req, res) => {
  const id = req.params.id;
  const { title, type, image, description, content } = req.body;
  db.run(
    "UPDATE articles SET title = ?, type = ?, image = ?, description = ?, content = ? WHERE id = ?",
    [title, type, image, description, content, id],
    // [id],
    function (err) {
      if (err) {
        console.error(err);
        res.status(500).send("Erreur server!");
      } else {
        // route pour form
        res.redirect("/form");
      }
    }
  );
});
// Supprimer un article
app.post("/admin/delete/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM articles WHERE id= ?", [id], function (err) {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur server!");
    } else {
      res.redirect("/admin");
    }
  });
});
// Démarrage du serveur
app.listen(PORT, () =>
  console.log(`Le serveur tourne sous http://localhost:${PORT}`)
);
>>>>>>> 14a06b73d1eb15b078b49c4d346829d284aa6b3a
