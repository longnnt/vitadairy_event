FROM node:16-alpine as build


WORKDIR /app

COPY . ./

RUN yarn

RUN yarn build

# ---
FROM fholzer/nginx-brotli:v1.12.2

WORKDIR /etc/nginx
ADD nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html
ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

