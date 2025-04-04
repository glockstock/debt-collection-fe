#!/bin/bash

# Script to manually deploy to GitHub Pages

# Build the project
echo "Building the project..."
npm run build

# Create a temporary directory for the build
echo "Creating temporary directory..."
mkdir -p tmp_deploy

# Copy the build files to the temporary directory
echo "Copying build files..."
cp -r dist/* tmp_deploy/

# Switch to gh-pages branch
echo "Switching to gh-pages branch..."
git checkout gh-pages || git checkout -b gh-pages

# Remove existing files
echo "Removing existing files..."
rm -rf ./*

# Copy the build files from the temporary directory
echo "Copying build files to gh-pages branch..."
cp -r tmp_deploy/* ./

# Remove the temporary directory
echo "Cleaning up..."
rm -rf tmp_deploy

# Add all files
echo "Adding files to git..."
git add .

# Commit
echo "Committing changes..."
git commit -m "Manual deploy to GitHub Pages"

# Push to GitHub
echo "Pushing to GitHub..."
git push origin gh-pages

# Switch back to main branch
echo "Switching back to main branch..."
git checkout main

echo "Deployment complete!" 