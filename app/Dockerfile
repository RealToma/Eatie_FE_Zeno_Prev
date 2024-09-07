FROM node:16-alpine as builder

ARG ENV_FILE

RUN echo $ENV_FILE

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.22-alpine as nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html 

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]