import * as pulumi from "@pulumi/pulumi";
import * as azure_native from "@pulumi/azure-native";

const config = new pulumi.Config();
const pricing = config.require("staticWebAppPricing");
const stackName = pulumi.getStack();

const resourceGroup = new azure_native.resources.ResourceGroup("resourceGroup", {
    resourceGroupName: `rg-vue2048-${stackName}`,
    location: "westeurope",
    tags: {
        Class: "EI8IT213",
    },
});

const staticSite = new azure_native.web.StaticSite("staticSite", {
    name: pulumi.interpolate`stapp-vue2048-${stackName}`,
    resourceGroupName: resourceGroup.name,
    location: resourceGroup.location,
    repositoryUrl: "",
    branch: "main",
    sku: {
        name: pricing,
        tier: pricing,
    },
    tags: {
        Class: "EI8IT213",
    },
});

const secrets = azure_native.web.listStaticSiteSecretsOutput({
    resourceGroupName: resourceGroup.name,
    name: staticSite.name,
});

export const resourceGroupName = resourceGroup.name;
export const hostname = staticSite.defaultHostname;
export const deploymentToken = pulumi.secret(
    secrets.apply(s => s?.properties?.apiKey)
);
