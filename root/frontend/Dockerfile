# Step 1: Build the app in image 'builder'
FROM node:18.17.1 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build:dev

FROM nginx:latest
COPY --from=node /app/dist/frontend /usr/share/nginx/html

