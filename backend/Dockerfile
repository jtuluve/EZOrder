FROM node:20

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

RUN npm run pure-build

RUN apt-get update && apt-get install -y redis-server && rm -rf /var/lib/apt/lists/*

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
# RUN sudo systemctl enable redis-server
# RUN sudo systemctl start redis-server

EXPOSE 9000

CMD ["/entrypoint.sh"]