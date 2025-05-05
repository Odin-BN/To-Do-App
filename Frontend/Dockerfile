# Use Node.js 18 as the base image
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a lightweight server to serve the build
FROM node:18 AS serve

# Install vite globally for preview
RUN npm install -g vite

# Copy the build artifacts from the previous stage
COPY --from=build /app/dist /app/dist

# Expose port 8080
EXPOSE 8080

# Serve the application
CMD ["vite", "preview", "--port", "8080"]
