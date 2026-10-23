# Urgence360

Application web permettant de consulter les établissements disposant d'un service d'urgences et de visualiser leur niveau d'occupation sur une carte interactive.

## Technologies utilisées

- **Frontend :** React, Vite, React Leaflet
- **Backend :** Symfony 7.4, PHP 8.2
- **Base de données :** MySQL 8
- **Cartographie :** Leaflet et OpenStreetMap
- **Environnement :** Docker et Docker Compose

## Prérequis

- Docker Desktop installé et démarré
- Git (pour cloner le projet)
- Une connexion Internet pour télécharger les images Docker et les dépendances

Aucune installation locale de PHP, Composer, Node.js ou MySQL n'est nécessaire.

## Installation

### 1. Récupérer le projet

Cloner le dépôt GitHub :

```bash
git clone URL_DU_DEPOT
cd Urgence360
```

Ou copier directement le dossier du projet sur l'ordinateur.

### 2. Démarrer l'application

À la racine du projet :

```bash
docker compose up -d --build
```

Lors du premier lancement, Docker construit les images et initialise la base de données MySQL si son volume est vide.

### 3. Accéder à l'application

| Service | Adresse |
|---|---|
| Application React | http://localhost:5173 |
| API Symfony | http://localhost:8000 |
| Liste des établissements | http://localhost:8000/api/etablissements |

### 4. Fonctionnalités

**Partie publique**
- Affichage des établissements d'urgences sur une carte interactive
- Consultation des niveaux d'occupation
- Recherche et filtrage par ville
- Consultation des informations des établissements

**Administration**
- Connexion administrateur
- Ajout d'établissements
- Modification des établissements
- Suppression des établissements
- Gestion des niveaux d'occupation

## Commandes utiles

Démarrer les conteneurs :

```bash
docker compose up -d
```

Arrêter les conteneurs sans supprimer les données :

```bash
docker compose down
```

Consulter les journaux :

```bash
docker compose logs -f
```

Reconstruire les images après une modification :

```bash
docker compose up -d --build
```

Afficher les conteneurs :

```bash
docker compose ps
```

**Attention :** éviter `docker compose down -v`, car cette commande supprime également les volumes de données.

## Base de données

La base MySQL est initialisée à partir des scripts présents dans `docker/mysql/init/` lors de la création d'un nouveau volume.

Les données sont conservées dans un volume Docker.

Le fichier SQL d'initialisation doit être réservé à des données de démonstration, sans identifiants ni informations sensibles.

## Sécurité

L'accès aux fonctionnalités d'administration est protégé par une authentification Symfony.

Les paramètres de développement et les identifiants de démonstration ne doivent pas être réutilisés pour un déploiement public.

## Auteur

Projet réalisé dans le cadre d'une formation Bachelor Bac+3 en développement informatique.