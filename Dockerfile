# Dockerfile para Railway
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY back-end/package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY back-end/ ./

# Exponer puerto
EXPOSE 5000

# Comando para ejecutar
CMD ["npm", "start"]