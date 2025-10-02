# Dockerfile per PocketBase
ARG PB_VERSION=0.22.0
FROM alpine:3.18
RUN apk add --no-cache ca-certificates curl unzip
WORKDIR /app
RUN curl -L -o pocketbase.zip "https://github.com/pocketbase/pocketbase/releases/download/v0.22.0/pocketbase_0.22.0_linux_amd64.zip" \
  && unzip pocketbase.zip \
  && rm pocketbase.zip \
  && chmod +x pocketbase
EXPOSE 8090
VOLUME ["/pb_data"]
CMD ["./pocketbase", "serve", "--http=0.0.0.0:8090", "--dir=/pb_data"]