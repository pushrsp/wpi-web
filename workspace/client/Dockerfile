FROM node:16.13.2

WORKDIR /usr/app
COPY package.json .
RUN npm install
COPY . .
RUN npm install -g serve
RUN npm run build

ENTRYPOINT ["serve","-l", "3000","-s","build"]