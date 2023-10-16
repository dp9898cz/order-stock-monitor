FROM node:20-slim

WORKDIR /app

COPY package*.json .

# Install project dependencies
RUN npm install

# Copy the rest of your application code into the container
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port your Next.js application will run on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]