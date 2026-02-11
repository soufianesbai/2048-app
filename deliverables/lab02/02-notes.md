# Lab 2 - Script d'Intégration Continue

## Objectif
Automatiser la vérification de la qualité du code et la construction du package de déploiement via un script CI.

## Étapes Réalisées

### Initialisation du Script
- Création du dossier `pipeline/` et du fichier `lab2.sh` en Bash
- Ajout de `set -e` pour arrêter à la première erreur
- Rendu du script exécutable avec `chmod +x`

### Récupération des Dépendances
- Ajout de `pnpm install` au script
- Test de la rapidité de réinstallation grâce au cache pnpm
- Compris le rôle du lockfile pour la reproductibilité

### Vérification du Typage Statique
- Installation de `vue-tsc`
- Ajout de `pnpm nuxt typecheck` au script
- Test avec une erreur volontaire sur une prop (exemple de changement volontaire de value en valu) dans `Board.vue`
- Vérification que l'IDE et la CLI détectent l'erreur

### Analyse Statique du Code (ESLint)
- Installation : `eslint`, `eslint-plugin-vue`, `@typescript-eslint/*`, `vue-eslint-parser`
- Création de la config `eslint.config.mjs`
- Configuration Vue + TypeScript avec règle "no-unused-vars"
- Test avec une variable non utilisée dans `Board.vue`
- Ajout de `pnpm eslint "app/**/*.vue" "app/**/*.ts"` au script pour lancer la vérification sur tous les fichiers vue et ts dans le répertoire app et ses sous-répertoires

### Exécution des Tests
- Installation : `vitest`, `@vue/test-utils`, `@vitejs/plugin-vue`, `happy-dom`
- Création de la config `vitest.config.ts`
- Création d'un test unitaire pour le composant `Tile.vue`
- Test réussi/échec en modifiant la valeur attendue
- Ajout de `pnpm vitest run` au script

### Construction du Package
- Exécution de `pnpm nuxt build` → génération de `.output/`
- Ajout de `.output/` est dans `.gitignore`
- Test du build avec `pnpm nuxt preview`
- Ajout de `pnpm nuxt build` au script

### Vérification Finale
- Exécution complète du script : **toutes les étapes passent**
- Validation de l'ordre des commandes

## Pour Aller Plus Loin (Bonus)

### Analyse des Dépendances
- Création du dossier `reports/`
- Identification des packages obsolètes avec `pnpm outdated --format json`
- Export dans `reports/outdated-dependencies.json`
- Résultat : 4 packages à mettre à jour (@nuxt/ui, nuxt, vue-router, @nuxt/fonts)

### Mise à Jour des Dépendances
- Exécution de `pnpm update --latest`
- Mise à jour de tous les packages vers leurs dernières versions

### Audit de Sécurité
- Analyse des vulnérabilités avec `pnpm audit --json`
- Export dans `reports/vulnerable-dependencies.json`
- Résultat initial : 0 vulnérabilité

### Test avec Package Vulnérable
- Installation de lodash@4.17.20 (version vulnérable)
- Relance de l'audit : **3 vulnérabilités détectées** (1 high, 2 moderate)
  - Command Injection (high)
  - ReDoS (moderate)
  - Prototype Pollution (moderate)

### Correction des Vulnérabilités
- Commande : `pnpm audit --fix` ou `pnpm update lodash --latest`
- Mise à jour vers lodash@4.17.23 (version corrigée)
- Vérification : plus aucune vulnérabilité

## Ce Que J'ai Appris

### Intégration Continue (CI)
- Automatiser les vérifications évite les erreurs en production
- L'ordre des étapes est important
- `set -e` garantit qu'on ne continue pas si une étape échoue

### Outils de Qualité du Code

**TypeScript / vue-tsc**
- Détecte les erreurs de typage à la compilation
- Valide les props des composants Vue
- Évite les bugs liés aux types incorrects

**ESLint**
- Analyse statique pour détecter erreurs potentielles
- Uniformise le style de code dans l'équipe
- Configuration adaptée à Vue + TypeScript

**Vitest**
- Framework de test rapide, natif à Vite
- `@vue/test-utils` pour tester les composants Vue
- Environnement `happy-dom` simule le DOM
- Tests unitaires garantissent le comportement attendu

### Gestion des Dépendances (pnpm)
- Cache partagé entre projets = installations rapides
- Liens symboliques au lieu de copies
- Lockfile garantit les mêmes versions partout

### Build et Déploiement
- Vite compile et optimise le code pour la production
- Nuxt génère un serveur Node dans `.output/`
- Importance d'ignorer les fichiers générés dans Git

### Patterns et Bonnes Pratiques
- Glob pattern `**/*.vue` = tous les fichiers à n'importe quelle profondeur
- Auto-imports Nuxt vs imports explicites pour les tests
- Séparer config des outils dans des fichiers dédiés

### Audit et Sécurité des Dépendances
- `pnpm outdated` : identifier les packages à mettre à jour
- `pnpm audit` : détecter les vulnérabilités de sécurité
- `pnpm audit --fix` : corriger automatiquement les vulnérabilités
- Importance de maintenir les dépendances à jour pour la sécurité
- Export JSON pour intégration dans les rapports CI/CD
