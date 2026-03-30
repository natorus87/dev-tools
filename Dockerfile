# build stage
FROM node:lts-alpine AS build-stage

RUN apk update && apk upgrade && apk add --no-cache git

# Set environment variables for non-interactive npm installs
ENV NPM_CONFIG_LOGLEVEL warn
ENV CI true
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm i --no-frozen-lockfile
COPY . .
RUN pnpm build

# production stage
FROM nginx:stable-alpine AS production-stage

RUN apk update && apk upgrade

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Support running as non-root user
RUN touch /var/run/nginx.pid && \
  chown -R nginx:nginx /var/run/nginx.pid /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

USER nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
