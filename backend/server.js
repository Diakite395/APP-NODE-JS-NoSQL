/**
 * On importe le module express pour créer notre serveur
 * On importe le module dotenv pour utiliser les variables d'environnement
 * On importe la fonction connectDB de notre fichier config/db.js
 */

// Variables d'environnement
const dotenv = require('dotenv').config();

// Initialisation du serveur Express
const express = require('express');

// importe la fonction connectDB de notre fichier config/db.js
const connectDB = require('./config/db');

const port = 5000;

// Connexion à la base de données
connectDB();

const app = express();

// creer une route pour l'api
// app.get('/api', (req, res) => {
//   res.json({message: 'Hello from Express server!'});
// });

//middlewares d’Express qui permettent de gérer les données envoyées dans les requêtes HTTP
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Utiliser le routeur
app.use("/api", require('./routes/post.routes'));




// // Route GET pour afficher le formulaire
// app.get('/', (req, res) => {
//     res.send(`
//         <form action="/submit" method="post">
//             <label>Nom : <input type="text" name="nom"></label>
//             <label>Âge : <input type="text" name="age"></label>
//             <button type="submit">Envoyer</button>
//         </form>
//     `);
// });

// // Route POST pour traiter les données du formulaire
// app.post('/submit', (req, res) => {
//     const nom = req.body.nom;
//     const age = req.body.age;

//     res.send(`Nom : ${nom}, Âge : ${age}`);
// });


app.listen(port, () => {  
  console.log(`Server listening on the port::${port}`);
});