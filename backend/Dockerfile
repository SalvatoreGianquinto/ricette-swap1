# Dockerfile per il backend Express
FROM node:20

# Imposta la working directory
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia tutto il resto del backend
COPY . .

# Espone la porta del backend
EXPOSE 3001

# Start command
CMD ["node", "server.js"]
