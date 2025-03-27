# Step 1: Build the React App
FROM node:18 AS build
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy dependencies first for better caching
COPY package*.json ./
RUN npm install --only=production


# Copy source files and build
COPY . .
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port and start Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
