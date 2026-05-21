# Lab 7 — Infrastructure as Code avec Pulumi

## Prise en main

Projet initialisé avec :
```
pulumi new azure-typescript -s teachingiac/vue2048-ss/preprod -n vue2048-ss
```

Le template génère `Pulumi.yaml`, `Pulumi.preprod.yaml` et un `index.ts` avec un exemple storage account. J'ai remplacé ça par une StaticSite.

## Ce que j'ai implémenté

Création d'un resource group `rg-vue2048-preprod` et d'une Static Web App `stapp-vue2048-preprod`. Les deux ont le tag `Class=EI8IT213`.

Pour le deployment token j'ai utilisé `listStaticSiteSecretsOutput` puis `pulumi.secret()` sur l'output — sans ça le token apparaît en clair dans l'état Pulumi, ce qui n'est pas acceptable pour un token de déploiement.

```
pulumi stack output --show-secrets
```

Permet de vérifier que la valeur est bien là.

Deux choses à ne pas confondre dans Pulumi :
- `ResourceGroup.get()` → référencer un resource group existant
- `new ResourceGroup()` → en créer un nouveau

J'ai utilisé `new` ici pour créer l'environnement preprod from scratch.

## Ce que ça change par rapport aux scripts CLI

Au lab 6 j'écrivais des scripts Azure CLI : "crée ce resource group, puis crée cette SWA". C'est impératif — on liste des commandes. Pulumi c'est déclaratif : on décrit l'état voulu et Pulumi calcule ce qui doit changer.

Concrètement : si je relance `pulumi up` sans modifier le code, il ne fait rien (état déjà correct). Avec un script CLI, il faudrait gérer les cas "existe déjà" à la main.

Le state Pulumi c'est ce qui rend ça possible. Pulumi compare l'état actuel des ressources Azure avec ce que le code décrit, et ne touche que ce qui diverge. L'onglet Activity dans Pulumi Cloud montre l'historique complet avec les logs de chaque déploiement.

Ce qui m'a surpris c'est que TypeScript fonctionne vraiment bien pour écrire de l'infra. L'autocomplétion sur les types Pulumi permet de découvrir les propriétés disponibles directement dans l'IDE — j'ai trouvé `defaultHostname` comme ça sans chercher dans la doc.

## Bilan rapide

CLI Azure → bien pour explorer et opérations ponctuelles.
Pulumi → mieux pour l'infra reproductible, versionnable, rejouable.

Les deux se complètent. En pratique on explore avec la CLI puis on formalise en IaC une fois qu'on sait ce qu'on veut.
