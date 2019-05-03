# base
FROM pagarme/docker-nodejs:8.11 as base
WORKDIR /app
COPY .env.* /app/
COPY package*.json /app/
RUN apk --update add --no-cache python make g++

# development
FROM pagarme/docker-nodejs:8.11 as development
WORKDIR /app
ENV DOTENV_PATH .env.example
COPY --from=base /app .
RUN npm install
ENV NODE_ENV=development
COPY scripts /app/scripts
RUN chmod +x /app/scripts/start_server.sh
COPY src /app/src
COPY tests /app/tests
EXPOSE 3000

# production-s
FROM pagarme/docker-nodejs:8.11 as production-s
WORKDIR /app
COPY scripts /app/scripts
COPY src /app/src
ENV NODE_ENV=production
RUN npm install --production
ENTRYPOINT /app/scripts/start-server.sh
