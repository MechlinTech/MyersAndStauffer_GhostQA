# Use official Node.js image as base for building
FROM node:18-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./seleniumreact_app/package.json ./
COPY ./seleniumreact_app/package-lock.json ./

# Install dependencies
RUN npm install --force

# Copy the entire project directory to the working directory
COPY ./seleniumreact_app ./

# Build the React app
RUN npm run build

# Use nginx to serve the production build
FROM nginx:alpine

# Copy the build files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx configuration file
COPY ./seleniumreact_app/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80

# Default command to run nginx
CMD ["nginx", "-g", "daemon off;"]
