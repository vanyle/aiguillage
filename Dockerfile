FROM oven/bun:latest AS frontend-builder

WORKDIR /web

COPY /web/package.json         \
     /web/bun.lockb            \
     /web/tsconfig.json        \
     /web/tsconfig.node.json   \
     /web/vite.config.ts       \
     /web/tsconfig.node.json   \
     /web/tailwind.config.js   \
     /web/postcss.config.js    \
     /web/.eslintrc.cjs .


RUN bun install

COPY ./web/src src
COPY ./web/openapi openapi
COPY ./web/aiguillage.svg \
     ./web/index.html .


RUN bun run build

# ---------------------------------------------------
FROM golang:alpine AS backend-builder
# Add gcc for cgo
RUN apk add build-base sqlite-libs sqlite-static

WORKDIR $GOPATH/aiguillage

COPY go.mod go.sum .

RUN go mod download
RUN go mod verify

COPY main.go .
COPY ./internal ./internal

RUN CGO_ENABLED=1 GOOS=linux GOARCH=amd64 go build -ldflags '-linkmode external -w -s -extldflags "-static -lm -ldl -lpthread -lsqlite3"' -o /aiguillage

# ---------------------------------------------------
FROM scratch

ENV GIN_MODE=release
ENV PROD=1
# You can overwrite this to "false" or "or" to ignore the X-Real-Ip header.
ENV PROXY=1

COPY --from=backend-builder /aiguillage /aiguillage
COPY --from=frontend-builder /web/dist /serve
RUN mkdir -p /db

EXPOSE 8080
ENTRYPOINT ["/aiguillage"]
