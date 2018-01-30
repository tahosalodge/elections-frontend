FROM zzswang/docker-nginx-react:latest
ENV DEBUG=off
COPY build/ /app
