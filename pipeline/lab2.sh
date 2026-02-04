#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Install dependencies using pnpm
pnpm install

# Run Nuxt type checking
pnpm nuxt typecheck

# Run ESLint static analysis
pnpm eslint "app/**/*.vue" "app/**/*.ts"

# Run tests with Vitest
pnpm vitest run

# Check for outdated dependencies
mkdir -p reports
pnpm outdated --format json > reports/outdated-dependencies.json || true

# Audit for vulnerabilities
pnpm audit --json > reports/vulnerable-dependencies.json || true

# Build the production package
pnpm nuxt build