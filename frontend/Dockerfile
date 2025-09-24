# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
# CORRECTED: No "frontend/" prefix
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
# CORRECTED: No "frontend/" prefix
COPY . .

# Build the React app for production
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]