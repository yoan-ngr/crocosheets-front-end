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

Toutes les routes commencent par `http://localhost:3000/api`.  
Les noms de paramètres de routes sont écrits en **gras** et les noms d'éléments de corps de requête sont écrits en _italique_.

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
Identifie l'utilisateur à l'aide d'un email et d'un mot de passe en lui renvoyant un JWT qui sera enregistré dans la base de données.
**Champs requis :**
- _email_ : chaîne de caractères
- _password_ : chaîne de caractères

**POST** `/auth/logout`  
Déconnecte l'utilisateur _id_ en supprimant son JWT de la base de données.  
**Champs requis :**
- _id_ : entier

### Routes feuilles de calcul

**GET** `/sheets/[id]`  
Récupère les informations de toutes les feuilles de calcul appartenant à l'utilisateur ayant pour identifiant **id**.

**POST** `/sheet/`  
Crée une nouvelle feuille appartenant à l'utilisateur ayant pour identifiant _proprietaire_.  
**Champs requis :**
- _proprietaire_ : entier

**GET** `/sheet/[id]`  
Récupère les informations relatives à la feuille de calcul ayant pour identifiant **id**.

**GET** `/sheet/[id]/members`  
Récupère la liste des utilisateurs qui sont membres de la feuille de calcul ayant pour identifiant **id**.

**GET** `/sheet/[id]/notmembers`  
Récupère la liste des utilisateurs qui ne sont pas membres de la feuille de calcul ayant pour identifiant **id**.

**POST** `/sheet/adduser/[id]`  
Ajoute un utilisateur ayant pour identifiant _id_ à la feuille de calcul ayant pour identifiant **id**.   
**Champs requis :**
- _id_ : entier

**DELETE** `/sheet/[id]/user/[iduser]`  
Supprime l'utilisateur ayant pour identifiant **iduser** de la feuille de calcul ayant pour identifiant **id**.

**POST** `/sheet/checkuser/[id]`  
Vérifie que l'utilisateur ayant pour identifiant _idUser_ a bien accès à la feuille de calcul ayant pour identifiant **id**.   
**Champs requis :**
- _idUser_ : entier

**DELETE** `/sheet/[id]`  
Supprime la feuille de calcul ayant pour identifiant **id**.

**PATCH** `/sheet/[id]`  
Modifie la feuille de calcul ayant pour identifiant **id**, principalement pour la renommer.   
**Champs requis :**
- _newName_ : chaîne de caractères
