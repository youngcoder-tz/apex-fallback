# /var/www/apex/apex-fallback/Dockerfile

FROM node:20-alpine AS deps
WORKDIR /app

# 1. Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# 2. Copy application source
COPY . .

# 3. Compile the Next.js production build
RUN npm run build

# 4. Expose the internal Next.js port
EXPOSE 3000

# 5. Start the production server
CMD ["npm", "run", "start"]