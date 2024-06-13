# Build stage
FROM node:alpine AS build-stage
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Nginx stage
FROM nginx:alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
