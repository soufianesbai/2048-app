Lab 4 — CI avancée (GitHub Actions + GitLab CI)

Objectif
Mettre en place une pipeline CI avancée avec:
- triggers conditionnels
- jobs parallèles
- cache
- artifacts avec rétention
- paramètres manuels et déploiement simulé
Puis reproduire l’équivalent sur GitLab CI.

Étapes réalisées (résumé bref)
1) Partie 1 — Triggers
- Configuration des déclenchements sur push, PR et manuel.
- Adaptation de la branche cible à lab4 à la place de main.
- Vérification du comportement attendu selon les événements.

2) Partie 2 — Organisation du pipeline
- Mise en place d’un job build.
- Exécution des jobs lint, typecheck et test après build.
- Mise en parallèle des jobs de qualité.
- Ajout du cache pnpm pour accélérer les installations.

3) Partie 3 — Variables et artifacts
- Centralisation de la version Node via variable globale.
- Upload des artifacts de build.
- Mise en place de la logique de rétention (puis simplification côté GitLab à cause de contrainte technique).

4) Partie 4 — Exécution manuelle + déploiement simulé
- Ajout de paramètres manuels:
  - lancer ou non les checks
  - choisir l’environnement (QA / PROD)
- Ajout d’un job de déploiement simulé avec message d’environnement cible.

5) Pour aller plus loin — GitLab CI
- Création du fichier .gitlab-ci.yml équivalent.
- Traduction des conditions GitHub Actions vers rules GitLab.
- Validation et correction de problèmes réels rencontrés (lint, expire_in, règles de déclenchement).

Ce que j’ai appris (le plus important)
- Une CI fiable dépend surtout de la reproductibilité: versions fixées, lockfile, setup identique sur chaque job.
- Les jobs étant isolés, il faut raisonner en pipeline (cache, needs, artifacts), pas comme un script local.
- Les paramètres manuels sont utiles pour piloter le coût/temps de pipeline (ex: checks activés ou non).
- Les outils semblent similaires entre plateformes, mais les détails de syntaxe/limites changent beaucoup la maintenabilité.

Comparaison GitHub Actions vs GitLab CI

1) Lisibilité / expressivité
- GitHub Actions: très lisible pour les cas standards (on:, jobs:, steps:, if:).
- GitLab CI: syntaxe souvent plus compacte/allégée sur certains blocs (rules, before_script, default), ce qui peut être rapide à écrire.

2) Setup machine / environnement
- GitLab CI: configuration machine simple et directe via image: node:... au niveau global.
- GitHub Actions: setup souvent explicite dans chaque job (runs-on + actions/setup-node), plus verbeux mais très clair.

3) Triggers et filtres de chemins
- Avantage GitHub Actions: paths-ignore natif et pratique.
- Limite GitLab CI: pas d’équivalent direct aussi simple pour ce cas.
  - Résultat: on passe par rules/changes, plus verbeux.
  - Impact: maintenabilité plus difficile quand l’arborescence évolue.

4) Artifacts et rétention
- GitHub Actions: retention-days avec expressions conditionnelles est pratique.
- GitLab CI: expire_in attend une durée valide; l’usage dynamique via variable peut poser problème selon la validation.
  - Problème rencontré dans le TP: “artifacts expire in should be a duration”.

Bilan personnel
Les deux plateformes sont solides. Pour ce lab:
- GitHub Actions m’a paru plus direct sur les fonctionnalités demandées (notamment paths-ignore et rétention conditionnelle).
- GitLab CI reste très puissant et parfois plus compact, mais certaines exigences demandent plus d’adaptation et peuvent coûter en maintenabilité.

Conclusion
Le TP m’a appris à ne pas seulement “faire passer un YAML”, mais à concevoir une CI robuste, testable, maintenable, et adaptée aux contraintes de la plateforme choisie.
