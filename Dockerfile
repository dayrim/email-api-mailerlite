# Use the official Node.js 14 LTS image as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle the application's source code inside the Docker image
COPY . .

# Inform Docker that the container listens on the specified port at runtime.
EXPOSE 3000

# Define the command to run the application
CMD [ "node", "index.js" ]
