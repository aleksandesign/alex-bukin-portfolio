#!/bin/bash
set -e

cd "$(dirname "$0")"

MSG="${1:-Update site}"

if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
  echo "Нечего публиковать — изменений нет."
  exit 0
fi

git add .
git commit -m "$MSG"
git push

echo ""
echo "Готово! Сайт обновится через 1–2 минуты:"
echo "https://aleksandesign.github.io/alex-bukin-portfolio/"
