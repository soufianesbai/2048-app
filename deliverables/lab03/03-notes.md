# Lab 3 — GitHub Actions : de “ça tourne chez moi” à une vraie CI

## Objectif
Mettre en place une intégration continue (CI) sur GitHub Actions pour que le projet soit vérifié automatiquement : installation, typage, lint, tests, build, puis publication d’un artefact.

## Résumé rapide (ce que j’ai mis en place)
1. Un workflow “Hello World” pour valider la prise en main.
2. Un workflow qui exécute le script du lab2.
3. Une CI “réelle” : typecheck + lint + tests + build + artefact.
4. Bonus : déclenchements (push + feature/* + cron) + cache + parallélisation.

## Ce que ce TP m’a vraiment apporté

### 1) Comprendre ce qu’est un job GitHub Actions (et pourquoi ça change tout)
La plus grosse différence avec “un script local”, c’est l’isolation : chaque job tourne sur une machine séparée. Concrètement :
- Installer un outil (ex. pnpm) dans un job ne le rend pas disponible dans les autres.
- Un job n’hérite pas des fichiers générés dans un autre job, sauf si on utilise du cache ou des artefacts.

Ça m’a forcé à raisonner “en environnement propre”, et donc à viser une pipeline reproductible.

### 2) Reproductibilité : la discipline du lockfile
J’ai retenu que `pnpm install --frozen-lockfile` n’est pas juste “une option sympa”, c’est ce qui garantit que la CI installe exactement les mêmes versions que moi. Sans ça, on peut avoir des comportements différents.

### 3) Performance : le cache est plus important que les micro-optimisations
Au début, je voulais surtout “installer pnpm une seule fois”. En pratique, l’installation de pnpm est rapide ; ce qui coûte du temps, c’est la résolution + installation des dépendances.

Le vrai gain est venu de :
- `cache: "pnpm"` (cache du store pnpm via setup-node)
- `actions/cache@v4` sur `node_modules` avec une clé basée sur le `pnpm-lock.yaml`

### 4) Paralléliser intelligemment (sans perdre en lisibilité)
La version “ci0” regroupait les contrôles dans un seul job `quality`. La version finale sépare en jobs indépendants : `typecheck`, `lint`, `test`, `build`.

Ce que j’ai gagné :
- Le temps total se rapproche de la durée du job le plus long
- Quand ça casse, on voit immédiatement si c’est le lint, les tests, ou le build.

### 5) Nuxt : certains fichiers doivent être préparés en CI
Sur GitHub Actions, j’ai eu des erreurs du type “nuxt/eslint/vitest not found” ou des fichiers `.nuxt/*` manquants.
Le point clé : certaines parties (config générée) ont besoin de `nuxt prepare` (via `postinstall`).

Donc dans la CI, les jobs `lint` et `test` exécutent aussi `pnpm run postinstall` pour être sûrs que `.nuxt/` est présent.

## Valeur ajoutée
À la fin du TP, je n’ai pas juste “un YAML qui passe”, j’ai une CI qui me donne confiance avant de merger, qui est reproductible, plus rapide grâce au cache, et plus facile à diagnostiquer grâce au découpage en jobs.

## Bonus “pour aller plus loin”
- Déclenchement sur `main`, `lab3` et `feature/*`
- Planification tous les jours à 8h (`cron`)
- Cache pnpm + cache `node_modules`
- Parallélisation des contrôles (typecheck/lint/test/build)
