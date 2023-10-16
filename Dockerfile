# Usar una imagen base de Node.js
FROM node:18

# Establecer el directorio de trabajo en la imagen
WORKDIR /app

# Copiar el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias de la aplicación
RUN npm install

# Copiar todo el código fuente de la aplicación al directorio de trabajo en la imagen
COPY . .

# Exponer el puerto en el que se ejecuta la aplicación (por defecto, Express utiliza el puerto 3000)
EXPOSE 3000

# Comando para iniciar la aplicación (ajústalo según el comando específico de tu aplicación)
CMD ["npm", "start"]
