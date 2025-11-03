# Dockerfile para el back-end
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración
COPY back-end/package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar código fuente
COPY back-end/ ./

# Exponer puerto
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]