const express = require('express');

const port = 5000;

const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/post', { useNewUrlParser: true, useUnifiedTopology: true });

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