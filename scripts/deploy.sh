#!/bin/sh
cd "$(dirname "$0")/.."
# cd ..
git pull
pnpm i
pm2 restart app.yml --env production
