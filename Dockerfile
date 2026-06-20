# Modern Node.js site for michaeldhaines.ca
FROM node:18-alpine

WORKDIR /app

# Install only production deps (mysql2 is pure JS — no native build tools needed)
COPY package*.json ./
RUN npm install --omit=dev

COPY . .

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Resilient boot: server binds the port first, then connects to the DB with retries.
CMD ["node", "server.js"]
