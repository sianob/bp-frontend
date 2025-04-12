# Use Node to build the frontend
FROM node:18 AS builder

WORKDIR /app
COPY . .

RUN npm ci

# Set the environment to production so Vite picks up .env.prod
# ENV NODE_ENV=production
RUN npm run build

# Use Nginx to serve the built app
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
