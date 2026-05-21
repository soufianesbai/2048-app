Lab 6 — Déploiement Azure multi-environnements

Objectif
Déployer l'application sur Azure Static Web Apps avec deux environnements distincts (QA et prod) et une validation humaine avant la mise en production.

Ce que j'ai fait

1) Créer les ressources Azure
Deux Static Web Apps via le script `script.azcli` : `stapp-vue2048-qa` et `stapp-vue2048-prod` dans deux resource groups séparés (`rg-vue2048-qa`, `rg-vue2048-prod`). Plan Free, tag `Class=EI8IT213`. J'ai écrit le script en boucle sur les deux envs pour éviter de répéter les mêmes commandes.

2) Pipeline CD
Structure identique au lab 5 : build une fois → QA automatique → prod avec validation.
Commande SWA CLI : `npx @azure/static-web-apps-cli deploy .output/public/ --deployment-token $TOKEN --env default`

Deux GitHub environments (`qa` et `production`), même nom de secret `AZURE_STATIC_WEB_APPS_API_TOKEN` dans les deux, valeurs différentes. GitHub injecte la bonne selon l'environment du job en cours.

Problème rencontré : j'avais mis `.output/` comme chemin d'artifact au lieu de `.output/public/`. Le déploiement SWA ne retournait pas d'erreur mais le site ne s'affichait pas — même cause que le lab 5.

3) Tokens de déploiement
Récupérés avec `az staticwebapp secrets list -n $swaName -g $rgName --query "properties.apiKey" -o tsv`. Un token par env, à stocker dans les secrets GitHub de chaque environment.

Ce que j'ai appris

Azure vs Vercel : Vercel détecte le framework tout seul, la config est minimale. Azure SWA c'est plus explicite (token, resource group, nom de la ressource) mais ça s'intègre dans un écosystème Azure si on en a déjà un. Pas forcément mieux ou moins bien, c'est juste une philosophie différente.

Le pattern "même nom de variable, valeur différente par environment" c'est propre. Un seul nom dans le YAML, chaque environment injecte la bonne valeur. Pas besoin de conditions `if` dans le pipeline pour choisir quel token utiliser selon l'env cible.

Bilan
Le lab reprend les mêmes principes CD que le lab 5 mais sur une plateforme différente. Ce qui change vraiment c'est la gestion des ressources Azure et la SWA CLI — le reste (artifact reuse, environments GitHub, validation prod) c'est exactement la même logique.
