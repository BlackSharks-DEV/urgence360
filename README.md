# 🚑 Urgence360

## Présentation

Urgence360 est une application web permettant de visualiser en temps réel le niveau d'occupation des services d'urgence d'un territoire.

L'application est composée de deux parties :

- une interface publique permettant de consulter les établissements sur une carte interactive ;
- une interface d'administration sécurisée permettant de gérer les établissements (CRUD).

Le projet est développé dans le cadre du Bachelor Développeur Web.

---

# Fonctionnalités

## Interface publique

- Affichage des établissements sur une carte Leaflet
- Recherche par ville
- Marqueurs colorés selon le niveau d'occupation
- Popup avec les informations de l'établissement
- Interface responsive (ordinateur, tablette et mobile)

## Interface administrateur

- Authentification
- Consultation des établissements
- Ajout d'un établissement
- Modification d'un établissement
- Suppression d'un établissement
- Déconnexion

---

# Architecture du projet

```
Urgence360
│
├── urgence360-api
│   ├── Symfony 7
│   ├── Doctrine ORM
│   ├── API REST
│   └── MySQL
│
├── urgence360-front
│   ├── React
│   ├── React Router
│   ├── Bootstrap
│   └── React Leaflet
│
└── docker-compose.yml
```

---

# Technologies utilisées

## Backend

- Symfony 7
- PHP 8.2
- Doctrine ORM
- MySQL
- Composer

## Frontend

- React
- React Router
- Bootstrap 5
- Leaflet
- React Leaflet
- Vite

## Déploiement

- Docker
- Docker Compose

---

# Installation

## 1. Cloner le dépôt

```bash
git clone https://github.com/BlackSharks-DEV/urgence360.git

cd urgence360
```

---

## 2. Lancer les conteneurs

```bash
docker compose up --build
```

---

## 3. Installer les dépendances du backend

```bash
cd urgence360-api

composer install
```

---

## 4. Installer les dépendances du frontend

```bash
cd ../urgence360-front

npm install
```

---

## 5. Lancer le frontend

```bash
npm run dev
```

---

# Variables d'environnement

Le backend utilise un fichier :

```
.env.local
```

contenant notamment :

```
DATABASE_URL="mysql://root:root@127.0.0.1:3306/urgence360"
```

En développement, il est également possible d'utiliser une base MySQL locale.

---

# Base de données

Créer la base :

```bash
php bin/console doctrine:database:create
```

Créer les tables :

```bash
php bin/console doctrine:migrations:migrate
```

---

# Compte administrateur

Un compte administrateur est créé dans la base.

Exemple :

```
Email :

admin@urgence360.fr

Mot de passe :

admin123
```

---

# Utilisation

## Partie publique

Ouvrir :

```
http://localhost:5173
```

L'utilisateur peut :

- rechercher une ville ;
- consulter les établissements ;
- visualiser le niveau d'occupation.

---

## Partie administration

Accéder à :

```
http://localhost:5173/login
```

Après authentification il est possible de :

- ajouter un établissement ;
- modifier un établissement ;
- supprimer un établissement.

---

# API REST

## Liste des établissements

```
GET /api/etablissements
```

---

## Détail d'un établissement

```
GET /api/etablissements/{id}
```

---

## Ajouter

```
POST /api/etablissements
```

---

## Modifier

```
PUT /api/etablissements/{id}
```

---

## Supprimer

```
DELETE /api/etablissements/{id}
```

---

## Connexion

```
POST /api/login
```

---

# Déploiement

Le projet peut être lancé via Docker Compose.

Commande :

```bash
docker compose up --build -d
```

Les services démarrés sont :

- Backend Symfony
- Frontend React
- Base MySQL

---

# Environnements

## Développement

```
APP_ENV=dev
```

Debug activé.

---

## Test

```
APP_ENV=test
```

---

## Production

```
APP_ENV=prod
```

Debug désactivé.

---

# Stratégie de mise en production

Le projet est conteneurisé grâce à Docker.

Une nouvelle version peut être déployée en reconstruisant les images Docker :

```bash
docker compose pull

docker compose up -d --build
```

Dans un contexte professionnel, une stratégie de type Blue/Green Deployment ou Rolling Update pourrait être utilisée afin de limiter les interruptions de service.

Pour ce projet pédagogique, un redémarrage contrôlé des conteneurs est suffisant.

---

# Sécurité

Le projet implémente :

- authentification administrateur ;
- mots de passe chiffrés ;
- accès protégé aux fonctionnalités d'administration ;
- validation des données côté serveur ;
- architecture API REST.

---

# Responsive Design

L'application est compatible :

- ordinateur
- tablette
- smartphone

Bootstrap est utilisé pour adapter automatiquement l'interface.

---

# Perspectives d'amélioration

Les évolutions envisageables sont :

- authentification JWT complète ;
- gestion de plusieurs administrateurs ;
- tableau de bord statistique ;
- historique des modifications ;
- notifications en temps réel ;
- géolocalisation automatique de l'utilisateur ;
- consommation d'API hospitalières en temps réel.

---

# Auteur

Projet réalisé par :

**Clément Delamare**

Bachelor Développeur Web

2025-2026

---

# Licence

Projet pédagogique réalisé dans le cadre du Bachelor Développeur Web.