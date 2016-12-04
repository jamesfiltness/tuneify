#!/bin/sh 
# Ensure all javascript files staged for commit pass standard code style
ESLINT="npm run eslint"

STAGED_FILES=($(git diff --cached --name-only --diff-filter=ACM | grep ".js"))

echo "Linting ${#STAGED_FILES[@]} files"

if [[ "$STAGED_FILES" = "" ]]; then
  exit 0
fi

$ESLINT "${STAGED_FILES[@]}"
