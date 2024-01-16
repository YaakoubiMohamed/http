// function somme(a){
//   return ++a;
// }
// console.log(somme()); // NaN not a number
a=5
b=3
c= a+b;
console.log(c);



const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000; // Utilisation d'une variable d'environnement pour le port

app.use(bodyParser.json());

// Utilisation d'une fonction pour générer les options HTTP
const generateOptions = (path, method, data = null) => {
  return {
    hostname: 'jsonplaceholder.typicode.com',
    path: path,// 'users'
    method: method, // 'GET'
    headers: {
      'Content-Type': 'application/json',
    },
    // Ajout du corps de la requête si nécessaire
    ...(data && { body: JSON.stringify(data) }),
  };
};

// Utilisation d'une fonction utilitaire pour effectuer des requêtes HTTP
const makeRequest = (options) => {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (data) => {
        responseData += data;
      });
      console.log(responseData);
      res.on('end', () => {
        // Utilisation de try-catch pour la conversion JSON
        try {
          resolve(JSON.parse(responseData));
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    // Utilisation de req.end() pour envoyer la requête
    req.end();
  });
};
()=>{

}

// Endpoint pour récupérer tous les utilisateurs
app.get('/todos', async (req, res) => {
  const options = generateOptions('/todos', 'GET');

  try {
    const response = await makeRequest(options);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint pour récupérer un utilisateur par ID
app.get('/todos/:id', async (req, res) => {
  const userId = req.params.id;
  const options = generateOptions(`/todos/${userId}`, 'GET');
  try {
    const response = await makeRequest(options);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint pour créer un nouvel utilisateur
app.post('/todos', async (req, res) => {
  const newUser = req.body;
  const options = generateOptions('/todos', 'POST', newUser);

  try {
    const response = await makeRequest(options);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint pour mettre à jour un utilisateur par ID
app.put('/todos/:id', async (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  const options = generateOptions(`/todos/${userId}`, 'PUT', updatedUser);

  try {
    const response = await makeRequest(options);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint pour supprimer un utilisateur par ID
app.delete('/todos/:id', async (req, res) => {
  const userId = req.params.id;
  const options = generateOptions(`/todos/${userId}`, 'DELETE');

  try {
    await makeRequest(options);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Utilisation de process.env.PORT pour le port, affichage d'une notification au démarrage
app.listen(PORT, () => {
  console.log(`Le serveur écoute sur http://localhost:${PORT}`);
});
