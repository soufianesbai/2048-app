# Lab 5 — Du build au déploiement : Vercel et la livraison continue

## Résumé rapide
Pipeline en trois jobs : `build` → `deploy-preview` (sur PR) / `deploy-production` (sur push ou manuel). Les deux jobs de déploiement réutilisent l'artifact du build plutôt que de relancer `pnpm generate`.

## Ce qui m'a bloqué

### generate vs build
J'ai passé un moment à utiliser `pnpm build` au lieu de `pnpm generate`. Les deux compilent Nuxt, mais :
- `pnpm build` → serveur Node.js dans `.output/`
- `pnpm generate` → site statique dans `.output/public/`

Pour Vercel en hébergement statique il faut `generate`, et l'artifact doit pointer sur `.output/public/`. Mon premier déploiement uploadait `.output/` entier — ça ne fonctionnait pas.

### CLI Vercel en CI
Sans `--yes`, la CLI Vercel attend une confirmation interactive. En CI il n'y a personne pour répondre, le job reste bloqué jusqu'au timeout. `--yes` court-circuite ça.

## Ce que j'ai mis en place

Trois secrets GitHub : `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` — récupérés depuis le dashboard Vercel et via `vercel link` en local.

**Preview** : déclenché sur les PRs, déploie sur une URL temporaire générée automatiquement par Vercel. Pour tester, j'ai créé une branche depuis `lab05`, remplacé "Score" par "My Score" dans `Header.vue`, ouvert une PR — l'URL de preview était visible dans les détails du workflow avec la modification.

**Production** : utilise un GitHub environment `production` avec une règle de protection. Le job se met en pause et attend une approbation avant de s'exécuter. Plus propre que simuler ça avec des conditions `if`.

L'intérêt de réutiliser l'artifact : ce qui part en prod c'est exactement ce qui a été validé en preview, pas un rebuild potentiellement différent.

## Blue-green

La promotion preview → production depuis l'UI Vercel ne re-déploie rien : elle change juste à quel déploiement l'URL de production pointe. Zéro downtime, rollback en un clic. C'est la première fois que j'ai compris concrètement ce que "blue-green" veut dire au-delà du concept.

## Ce que j'ai retenu
- CI vérifie, CD livre — la différence est maintenant claire en pratique pas juste en théorie.
- Artifact partagé entre les jobs de déploiement : c'est la règle, pas une optimisation.
- GitHub environments pour la protection de la prod : simple et lisible dans l'UI.
