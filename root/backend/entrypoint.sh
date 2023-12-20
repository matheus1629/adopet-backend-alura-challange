#!/bin/sh
set -e           
npm run db:migrate  
npm run build:dev
exec "$@"        