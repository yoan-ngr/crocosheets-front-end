# Documentation technique

## Installation

Le projet CrocoSheets est divisé en deux parties : le [front-end](https://github.com/yoan-ngr/crocosheets-front-end) et le [back-end](https://github.com/yoan-ngr/crocosheets-back-end).  
Les deux parties sont installées de manière similaire, mais lancées quelque peu différemment.

### Front-end

Pour installer le front-end, commencez par cloner le projet. Pour cela, ouvrez un terminal et rendez-vous à l'endroit où vous souhaitez télécharger le projet, puis exécutez la commande
```bash
git clone git@github.com:yoan-ngr/crocosheets-front-end.git
```

Une fois cette commande effectuée, naviguez dans le dossier à l'aide de la commande 
```bash
cd crocosheets-front-end
```

Puis installez les packages et dépendances avec la commande

```bash
npm install
```

Le projet devrait alors télécharger les dépendances. Une fois fait, vous disposez de tout le nécessaire pour [lancer le front-end](#front-end-1).

### Back-end

Les opérations pour le back-end sont sensiblement les mêmes.
```bash
git clone git@github.com:yoan-ngr/crocosheets-back-end.git
cd crocosheets-back-end
npm install
```

De même, une fois ces commandes effectuées, vous devriez être en mesure de [lancer le back-end](#back-end-1).

## Lancement

Si vous ouvrez les projets avec un éditeur comme WebStorm, il est possible de créer des configurations de lancement qui utilisent les commandes ci-dessous.

### Front-end

Pour lancer le front-end, tapez dans un terminal situé dans le dossier racine du projet la commande
```bash
npm run dev
```

Puis rendez-vous à l'adresse http://localhost:5173 pour tester le front-end. Notez que vous aurez besoin de démarrer le back-end pour tester des fonctionnalités nécessitant un compte, c'est-à-dire la vaste majorité du site.

### Back-end

Le back-end peut être lancé depuis le dossier racine du projet grâce à la commande
```bash
node index.js
```

Il est maintenant possible de faire des requêtes à l'adresse http://localhost:3000/api .  

  

## Routes

Toutes les routes commencent par `http://localhost:3000/api`

### Routes utilisateur

**GET** `/users`
Récupère les informations de tous les utilisateurs

**GET** `/user/[id]`  
Récupère toutes les informations sur l'utilisateur possédant l'identifiant **id**.

**POST** `/user/`
Crée un nouvel utilisateur avec son nom, prénom, email et mot de passe.  
**Champs requis :**
- _password_ : chaîne de caractères
- _email_ : chaîne de caractères
- _first_name_ : chaîne de caractères
- _last_name_ : chaîne de caractères

**DELETE** `/user/[id]`
Supprime l'utilisateur possédant l'identifiant **id**.

### Routes authentification

**POST** `/auth/login`  
Identifie l'utilisateur en lui renvoyant un JWT qui sera enregistré dans la base de données.