# Explication du Projet 2048-App

## 📖 Vue d'ensemble du projet

Ce projet est une **application web moderne** qui implémente le célèbre jeu de puzzle **2048**. Il a été créé dans un contexte **éducatif** pour apprendre le développement web moderne avec des technologies de pointe.

### Qu'est-ce que le jeu 2048 ?

Le 2048 est un jeu de puzzle où vous devez :
- Déplacer des tuiles numérotées sur une grille 4×4
- Fusionner des tuiles ayant le même nombre (2+2=4, 4+4=8, etc.)
- Atteindre la tuile **2048** pour gagner
- Continuer à jouer pour obtenir le meilleur score possible

## 🛠️ Technologies utilisées

Le projet utilise une **stack technologique moderne** :

| Technologie | Rôle | Description |
|-------------|------|-------------|
| **Nuxt 4** | Framework principal | Framework Vue.js avec rendu côté serveur et génération de sites statiques |
| **Vue 3** | Framework UI | Framework JavaScript réactif pour créer des interfaces utilisateur |
| **TypeScript** | Langage | Sur-ensemble typé de JavaScript pour un code plus robuste |
| **Nuxt UI** | Composants UI | Bibliothèque de composants préfabriqués |
| **Tailwind CSS** | Styles | Framework CSS utilitaire pour un styling rapide et responsive |
| **pnpm** | Gestionnaire de packages | Alternative rapide et efficace à npm |

## 📁 Structure du projet

```
2048-app/
├── app/
│   ├── components/game/    # Composants du jeu (grille, tuiles, en-tête)
│   ├── composables/        # Logique métier réutilisable (game logic)
│   ├── pages/              # Pages de l'application (index.vue)
│   └── assets/css/         # Styles Tailwind personnalisés
├── public/                 # Fichiers statiques (images, robots.txt)
├── labs/                   # Instructions des travaux pratiques
│   ├── lab01.md           # TP 1: Mise en place de l'environnement
│   └── lab02.md           # TP 2: Script d'intégration continue
├── deliverables/          # Livrables des TPs
├── nuxt.config.ts         # Configuration de Nuxt
├── package.json           # Dépendances et scripts npm
└── tsconfig.json          # Configuration TypeScript
```

## 🎯 Fonctionnalités de l'application

1. **Gameplay classique 2048**
   - Grille 4×4 avec des tuiles numérotées
   - Fusion des tuiles identiques
   - Objectif : atteindre 2048

2. **Contrôles multiples**
   - Clavier : flèches directionnelles ou WASD
   - Tactile : glissement sur mobile/tablette

3. **Interface responsive**
   - Optimisée pour desktop et mobile
   - Design moderne avec Tailwind CSS

4. **Persistance du meilleur score**
   - Sauvegarde locale dans le navigateur (localStorage)
   - Affichage du record personnel

5. **100% côté client**
   - Aucun serveur backend nécessaire
   - Peut être déployé comme site statique

---

# 📚 Lab 1 : Mise en place de l'environnement et implémentation

## 🎯 Objectif

Le Lab 1 vise à :
1. **Configurer l'environnement de développement complet**
2. **Implémenter l'application 2048 avec GitHub Copilot**
3. **Apprendre à utiliser l'IA pour générer du code**

## 🔧 Pré-requis à installer

### 1. Outils de base
- **Git** : Système de contrôle de version
- **Git Credential Manager** : Gestion sécurisée des identifiants GitHub
- **VS Code** : Éditeur de code recommandé

### 2. Environnement Node.js
- **pnpm** : Gestionnaire de packages (plus rapide que npm)
- **Node.js LTS** : Version stable de Node.js
  - Installation via pnpm : `pnpm env use --global lts`

### 3. Extensions VS Code
- **Vue (Official)** : Support Vue 3 et TypeScript
- **GitHub Copilot** : Assistant IA pour générer du code
  - Disponible gratuitement avec le [GitHub Student Developer Pack](https://education.github.com/pack)

## 📝 Instructions principales

### Étape 1 : Créer l'application avec GitHub Copilot
- Utiliser GitHub Copilot pour générer le code de l'application
- Technologies imposées : **Nuxt + TypeScript + Tailwind CSS**
- Copilot aide à :
  - Générer les composants Vue
  - Implémenter la logique du jeu
  - Créer les styles avec Tailwind

### Étape 2 : Implémenter les fonctionnalités
- Grille de jeu 4×4
- Logique de fusion des tuiles
- Gestion des déplacements (haut, bas, gauche, droite)
- Détection de victoire/défaite
- Système de score

## 📦 Livrables du Lab 1

1. **Dépôt GitHub** contenant :
   - Code source complet de l'application
   - Configuration Nuxt et TypeScript
   - Composants Vue
   - Styles Tailwind

2. **Fichier de notes** incluant :
   - Ce que vous avez appris
   - Méthode adoptée pour développer l'application
   - Comment vous avez utilisé GitHub Copilot
   - Difficultés rencontrées et solutions trouvées

## 💡 Conseils

- **Exploitez Copilot** : Écrivez des commentaires clairs pour guider l'IA
- **Testez régulièrement** : Lancez `pnpm dev` pour voir vos changements
- **Commitez souvent** : Utilisez Git pour sauvegarder votre progression
- **Demandez de l'aide** : Si Copilot génère du code incorrect, reformulez votre demande

---

# 🔄 Lab 2 : Script d'intégration continue (CI)

## 🎯 Objectif

Le Lab 2 vise à créer un **script d'automatisation** qui exécute toutes les vérifications nécessaires avant de déployer le code, simulant un pipeline CI/CD.

## 🚀 Processus du script

Le script doit automatiser ces étapes dans l'ordre :

```
1. Installation des dépendances
   ↓
2. Vérification du typage TypeScript
   ↓
3. Analyse statique du code (linting)
   ↓
4. Construction du package de production
   ↓
5. Exécution des tests
```

## 📋 Détail des étapes

### 1. 📦 Récupération des dépendances

**Objectif** : Installer rapidement les dépendances du projet

**Commande** : `pnpm install`

**Apprentissages** :
- pnpm utilise un cache global pour éviter de re-télécharger les packages
- Si vous supprimez `node_modules` et réinstallez, c'est beaucoup plus rapide la 2ème fois
- pnpm peut exécuter des binaires locaux : `pnpm nomdupackage`

### 2. ✅ Vérification du typage statique

**Objectif** : Détecter les erreurs de typage TypeScript

**Outil** : [vue-tsc](https://github.com/vuejs/language-tools/tree/master/packages/tsc)

**Commande** : `vue-tsc --noEmit` ou `nuxt typecheck`

**Test** :
1. Vérifier qu'aucune erreur n'est remontée
2. Faire une faute de frappe volontaire sur une prop d'un composant
3. Constater que l'erreur est détectée par l'IDE et la commande
4. Corriger l'erreur

**Pourquoi c'est important** :
- TypeScript détecte les bugs avant l'exécution
- Autocomplétion et IntelliSense améliorés
- Code plus maintenable

### 3. 🔍 Analyse statique du code

**Objectif** : Vérifier la qualité et les conventions du code

**Outil** : [ESLint](https://eslint.org/)

**Commande** : `eslint .` (analyser tous les fichiers)

**Test** :
1. Vérifier qu'aucune erreur n'est remontée
2. Introduire volontairement une erreur (ex: variable inutilisée)
3. Constater que l'erreur est détectée
4. Corriger l'erreur

**Règles vérifiées** :
- Conventions de nommage
- Code mort (dead code)
- Imports inutilisés
- Complexité du code
- Bonnes pratiques Vue/TypeScript

### 4. 📦 Construction du package

**Objectif** : Compiler le code pour la production

**Outil** : [Vite](https://vitejs.dev/) (intégré à Nuxt)

**Commandes** :
- Build : `nuxt build` ou `vite build`
- Preview : `nuxt preview` ou `vite preview`

**Étapes** :
1. Construire le package → créé dans `.output/` (Nuxt) ou `dist/` (Vite)
2. Optionnel : Changer le répertoire de sortie avec `--outDir publish`
3. Ajouter le répertoire de build à `.gitignore`
4. Tester le build avec `nuxt preview`

**Avantages de Vite** :
- Build ultra-rapide
- Optimisation automatique (minification, tree-shaking)
- Support TypeScript natif

### 5. 🧪 Exécution des tests

**Objectif** : Valider que le code fonctionne correctement

**Outil** : [Vitest](https://vitest.dev/) (framework de tests moderne)

**Commande** : `vitest run` (exécution unique) ou `vitest` (mode watch)

**Exemple de test** :
```typescript
// Test pour le composant Tile
describe('Tile', () => {
  it('devrait avoir un fond orange pour la valeur 2', () => {
    // Arrange : créer une tuile avec la valeur 2
    const tile = { value: 2 }
    
    // Act : récupérer la couleur
    const color = getTileColor(tile.value)
    
    // Assert : vérifier que c'est orange
    expect(color).toBe('orange')
  })
})
```

**Workflow de test** :
1. Créer un test unitaire (ex: couleur de la tuile)
2. Exécuter → test vert ✅
3. Modifier le test pour qu'il échoue → test rouge ❌
4. Corriger → test vert ✅

## 🎬 Finalisation du script

### Choix du langage

Vous pouvez choisir :
- **Bash** (Linux/Mac) : `.sh`
- **PowerShell** (Windows/Cross-platform) : `.ps1`

### Structure recommandée

```bash
#!/bin/bash
# Script CI pour 2048-app

echo "🚀 Début du pipeline CI"

# 1. Installation des dépendances
echo "📦 Installation des dépendances..."
pnpm install

# 2. Vérification du typage
echo "✅ Vérification TypeScript..."
pnpm nuxt typecheck

# 3. Analyse statique
echo "🔍 Analyse ESLint..."
pnpm eslint .

# 4. Build
echo "📦 Construction du package..."
pnpm build

# 5. Tests
echo "🧪 Exécution des tests..."
pnpm vitest run

echo "✨ Pipeline CI terminé avec succès!"
```

### Emplacement

Créer le fichier dans : `pipelines/ci.sh` ou `pipelines/ci.ps1`

## 📦 Livrables du Lab 2

1. **Script finalisé** dans le dossier `pipelines/`
   - Commenté et lisible
   - Gestion des erreurs
   - Messages informatifs

2. **Fichier de notes** expliquant :
   - Pourquoi vous avez choisi ce langage de script
   - Comment vous avez structuré le script
   - Notions apprises sur :
     - pnpm et la gestion de dépendances
     - TypeScript et le type-checking
     - ESLint et l'analyse statique
     - Vite et le build process
     - Vitest et les tests unitaires
   - Difficultés rencontrées

## 🎯 Pour aller plus loin

Si vous terminez rapidement, améliorez votre script avec :

### 1. Analyse des dépendances obsolètes
```bash
pnpm outdated --format json > reports/outdated-dependencies.json
```

### 2. Mise à jour des dépendances
```bash
pnpm update
```

### 3. Détection des vulnérabilités
```bash
pnpm audit --json > reports/vulnerable-dependencies.json
```

### 4. Test avec lodash vulnérable
- Installer `lodash@4.17.20` (version avec vulnérabilités connues)
- Relancer l'audit
- Utiliser `pnpm audit --fix` pour corriger automatiquement

## 💡 Conseils pour réussir

1. **Testez chaque étape individuellement** avant de l'ajouter au script
2. **Documentez votre code** avec des commentaires clairs
3. **Gérez les erreurs** : le script doit s'arrêter si une étape échoue
4. **Utilisez Git** : commitez régulièrement sur la branche `lab2`
5. **Apprenez des erreurs** : chaque erreur est une opportunité d'apprendre

---

## 🎓 Compétences développées

À travers ces deux labs, vous allez maîtriser :

### Lab 1
- ✅ Configuration d'un environnement de développement moderne
- ✅ Utilisation de GitHub Copilot pour accélérer le développement
- ✅ Création d'une application web avec Nuxt 4 + Vue 3 + TypeScript
- ✅ Styling avec Tailwind CSS
- ✅ Gestion de l'état avec les composables Vue

### Lab 2
- ✅ Automatisation avec des scripts shell
- ✅ Intégration continue (CI/CD)
- ✅ Type-checking avec TypeScript
- ✅ Analyse statique avec ESLint
- ✅ Build et bundling avec Vite
- ✅ Tests unitaires avec Vitest
- ✅ Gestion des dépendances avec pnpm
- ✅ Détection et correction de vulnérabilités

## 📚 Ressources additionnelles

- [Documentation Nuxt 4](https://nuxt.com/)
- [Documentation Vue 3](https://vuejs.org/)
- [Documentation TypeScript](https://www.typescriptlang.org/)
- [Documentation Tailwind CSS](https://tailwindcss.com/)
- [Documentation pnpm](https://pnpm.io/fr/)
- [Documentation Vitest](https://vitest.dev/)
- [Documentation ESLint](https://eslint.org/)
- [Documentation Vite](https://vitejs.dev/)

---

## ❓ Questions fréquentes

**Q: Pourquoi pnpm plutôt que npm ?**  
R: pnpm est plus rapide, utilise moins d'espace disque grâce à son système de cache global, et évite les problèmes de dépendances fantômes.

**Q: Qu'est-ce qu'un composable dans Vue 3 ?**  
R: Un composable est une fonction qui utilise la Composition API de Vue pour encapsuler et réutiliser de la logique avec état (stateful logic).

**Q: Pourquoi TypeScript ?**  
R: TypeScript ajoute des types statiques à JavaScript, ce qui permet de détecter les bugs plus tôt, améliore l'autocomplétion et rend le code plus maintenable.

**Q: C'est quoi la différence entre build et dev ?**  
R: En mode dev, le code n'est pas optimisé et le serveur recharge automatiquement. En build, le code est minifié, optimisé et prêt pour la production.

**Q: Pourquoi ne pas commiter node_modules ?**  
R: node_modules peut contenir des milliers de fichiers et plusieurs GB de données. On commit seulement package.json et pnpm-lock.yaml, puis on fait `pnpm install` pour recréer node_modules.

---

**Bon courage pour vos travaux pratiques ! 🚀**
