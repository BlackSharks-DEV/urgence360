# Urgence360

Urgence360 est une application composée d'une API Symfony 7.4 et d'une interface front-end React/Vite.

## Structure du dépôt

- `urgence360-api/` : backend Symfony avec Doctrine ORM et API.
- `urgence360-front/` : application front-end React utilisant Vite et Leaflet.
- `docker-compose.yml` : configuration Docker pour le serveur PHP, MySQL et phpMyAdmin.

## Prérequis

- Docker et Docker Compose
- PHP 8.2+ (pour un lancement local sans Docker)
- Composer
- Node.js 18+ et npm/yarn

## Installation

### Avec Docker

Depuis la racine du projet :

```bash
docker compose up -d
```

Cela démarre :

- API PHP/Apache sur `http://localhost:8000`
- Base de données MySQL sur `localhost:3306`
- phpMyAdmin sur `http://localhost:8080`

Identifiants MySQL par défaut :

- Hôte : `db`
- Base : `urgence360`
- Root password : `root`

### Local (sans Docker)

#### Backend

```bash
cd urgence360-api
composer install
```

Puis configurez votre base de données et exécutez les migrations si nécessaire.

#### Frontend

```bash
cd urgence360-front
npm install
```

## Démarrage

### API Symfony

Si vous utilisez Docker, l'API est déjà disponible sur `http://localhost:8000`.

Sinon, depuis `urgence360-api/` :

```bash
symfony server:start --no-tls
```

### Frontend React

Depuis `urgence360-front/` :

```bash
npm run dev
```

Par défaut, Vite servira l'application sur un port comme `5173`.

## Scripts utiles

### Backend

- `composer install` : installe les dépendances PHP
- `composer update` : met à jour les dépendances PHP
- `php bin/console doctrine:migrations:migrate` : exécute les migrations

### Frontend

- `npm run dev` : démarre le serveur de développement
- `npm run build` : génère le build de production
- `npm run preview` : prévisualise le build de production
- `npm run lint` : exécute ESLint

## Notes

- Le backend utilise Symfony 7.4 et Doctrine ORM.
- Le front est une application React moderne basée sur Vite, avec Leaflet pour la cartographie.
- `urgence360-api/composer.json` contient les dépendances principales de l'API.
- `urgence360-front/package.json` contient la configuration du front-end.

## Contacts

Pour toute question, consultez les fichiers de configuration ou contactez l'équipe de développement.
