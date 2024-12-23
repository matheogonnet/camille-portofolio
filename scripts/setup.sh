#!/bin/bash

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages d'étape
print_step() {
    echo -e "${BLUE}[SETUP]${NC} $1"
}

# Fonction pour afficher les succès
print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Fonction pour afficher les erreurs
print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier si Node.js est installé
print_step "Vérification de Node.js..."
if ! command -v node &> /dev/null; then
    print_error "Node.js n'est pas installé. Veuillez l'installer depuis https://nodejs.org"
    exit 1
fi
print_success "Node.js est installé"

# Vérifier si npm est installé
print_step "Vérification de npm..."
if ! command -v npm &> /dev/null; then
    print_error "npm n'est pas installé"
    exit 1
fi
print_success "npm est installé"

# Supprimer node_modules et package-lock.json s'ils existent
print_step "Nettoyage des dépendances existantes..."
rm -rf node_modules package-lock.json
print_success "Nettoyage terminé"

# Installer les dépendances
print_step "Installation des dépendances..."
if npm install; then
    print_success "Dépendances installées avec succès"
else
    print_error "Erreur lors de l'installation des dépendances"
    exit 1
fi

# Vérifier si les fichiers essentiels existent
print_step "Vérification des fichiers essentiels..."
REQUIRED_FILES=("src/app/globals.css" "src/app/layout.tsx" "src/app/page.tsx" "tailwind.config.ts" "next.config.js")

for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        print_error "Fichier manquant: $file"
        exit 1
    fi
done
print_success "Tous les fichiers essentiels sont présents"

# Donner les permissions d'exécution aux scripts npm
print_step "Configuration des permissions..."
chmod +x node_modules/.bin/*
print_success "Permissions configurées"

# Création des dossiers
mkdir -p public/images/projet1
mkdir -p public/images/projet2
mkdir -p public/images/projet3
mkdir -p public/images/logo
mkdir -p public/cv

# Tableau des fichiers à vérifier
REQUIRED_FILES=(
    "public/images/projet1/silmo.jpeg"
    "public/images/projet2/lesJO_2024.jpeg"
    "public/images/logo/cg_logo.png"
    "public/images/fr-flag.svg"
    "public/images/en-flag.svg"
    "public/cv/CV_CamilleGrand_FR.pdf"
    "public/cv/CV_CamilleGrand_EN.pdf"
)

# Vérification des fichiers
print_step "Vérification des fichiers..."

for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo -e "${RED}⚠️  Attention : Le fichier ${file#public/} n'est pas présent${NC}"
        echo -e "${BLUE}➡️  Veuillez placer le fichier à cet emplacement${NC}"
    else
        echo -e "${GREEN}✅ Fichier ${file#public/} trouvé${NC}"
    fi
done

# Permissions
chmod 755 public/images -R

# Message final
echo -e "\n${GREEN}=== Installation terminée avec succès ===${NC}"
echo -e "Vous pouvez maintenant lancer le projet avec ${BLUE}npm run dev${NC}" 