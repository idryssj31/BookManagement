# Book Management App

## Prérequis

- Node.js & npm
- Java 21
- Gradle

## Installation et lancement

### 1. Installer les dépendances du frontend

```
npm install
```
2. Lancer le frontend en mode développement
```
npm start
```
3. Construire le frontend pour la production
```
npm run build
```
4. Copier le build React dans le backend Spring Boot
```
npm run copy:all
```
5. Nettoie puis recompile tout le backend en incluant les fichiers statiques copiés
```
./gradlew clean build
```
6. Lancer le backend Spring Boot
   Avec Gradle:
```
./gradlew bootRun
```
7. Lancer l'interface Cypress
```
npx cypress open
```