FROM node:18.17.1
WORKDIR /src
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8000
ENTRYPOINT ["./entrypoint.sh"]
CMD [ "npm", "run", "start:dev" ]

