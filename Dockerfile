FROM node:9-alpine
RUN mkdir -p /app
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM zzswang/docker-nginx-react:latest
ENV DEBUG=off
COPY --from=0 /app/build/ /app
