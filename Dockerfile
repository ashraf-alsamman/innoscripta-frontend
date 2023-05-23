# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the React app
# RUN npm run build

# Set the environment variable to serve the built static files
ENV REACT_APP_API_URL=http://api.example.com

# Expose the port that the React app will run on
EXPOSE 3000

# Start the React app
CMD [ "npm", "start" ]
