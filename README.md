# TP : Application Web Full Stack (React/Vite, Node.js, MySQL, gRPC, Docker)

## 🎯 Objectif du Projet
Ce projet répond aux exigences du TP Full Stack, mais avec une approche moderne orientée microservices. Au lieu d'utiliser une API REST classique, ce projet implémente une communication **gRPC** entre le frontend et le backend, offrant de meilleures performances et un typage strict via les Protocol Buffers (`.proto`).

## 🏗️ Architecture

L'application est orchestrée via Docker Compose et se compose de **4 services** :

1. **Frontend (React + Vite)** : Interface utilisateur ultra-rapide. Il utilise `grpc-web` pour formater les requêtes.
2. **Proxy (Envoy)** : Les navigateurs web ne supportant pas nativement le protocole HTTP/2 pur requis par gRPC, Envoy agit comme un proxy de traduction. Il intercepte les requêtes HTTP/1.1 du frontend et les traduit en gRPC pour le backend.
3. **Backend (Node.js + ES Modules)** : Serveur gRPC qui traite les requêtes (CRUD) et interagit avec la base de données.
4. **Base de données (MySQL)** : Stockage persistant des données. Initialisée automatiquement avec un script SQL.



## 🚀 Prérequis
- [Docker](https://www.docker.com/) et [Docker Compose](https://docs.docker.com/compose/) installés sur votre machine.
- *Note : Les fichiers JavaScript générés par `protoc` sont déjà inclus dans le code source (`frontend/src/produit_pb.js` etc.), vous n'avez donc pas besoin d'installer le compilateur Protocol Buffers pour exécuter le projet.*

## 🛠️ Instructions d'exécution

1. Clonez ou extrayez ce projet.
2. À la racine du projet, ouvrez un terminal.
3. Exécutez la commande suivante pour construire et démarrer les conteneurs :
   ```bash
   docker-compose up --build
Attendez quelques secondes que la base de données MySQL s'initialise.

Ouvrez votre navigateur et accédez à l'application : http://localhost:5173

📂 Structure du projet
Plaintext
/
├── backend/          # Serveur Node.js (gRPC)
├── db/               # Script d'initialisation SQL (init.sql)
├── envoy/            # Fichier de configuration du proxy Envoy
├── frontend/         # Application React propulsée par Vite
├── proto/            # Le contrat de données (produit.proto)
├── docker-compose.yml# Orchestration des services
└── .env              # Variables d'environnement
✨ Fonctionnalités implémentées
✅ Architecture Full Stack conteneurisée.

✅ Utilisation du nom de service Docker (db) pour la connexion backend -> base de données.

✅ Opérations CRUD complètes via gRPC (GetAll, Create implémentés dans l'UI).

✅ Séparation stricte des responsabilités (Frontend, Proxy, Backend, DB).

✅ Volumes Docker pour la persistance des données MySQL.


With the `.env` file, the `.gitignore`, and this `README.md`, your project goes from "functional" to a completely professional submission. Good luck with your grade!