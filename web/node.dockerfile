FROM node:6.11.3
MAINTAINER Rahul Soni <rahul@attosol.com>

# Create a directory to host Node App
WORKDIR /web

# Copy the package.json file
COPY package.json .

# Install dependencies
RUN npm install && \
    npm install -g pm2

# Deploy Code from current directory to WORKDIR
COPY . .

# Expose website on port
EXPOSE 3000

CMD ["pm2-docker", "process.json"]