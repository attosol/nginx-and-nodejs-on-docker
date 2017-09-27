FROM node:6.11.3
MAINTAINER Rahul Soni <rahul@attosol.com>

# Create a directory to host Node App
WORKDIR /web

# Copy the package.json file
COPY package.json .

# Install dependencies
RUN npm install

# Deploy Code from current directory to WORKDIR
COPY . .

# Expose website on port
EXPOSE 3000

CMD ["node", "server.js"]