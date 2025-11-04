FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY backend/package*.json ./

# Install dependencies
RUN npm install --production=false

# Copy backend source code
COPY backend/ ./

# Expose port
EXPOSE 5001

# Start the application
CMD ["npm", "start"]