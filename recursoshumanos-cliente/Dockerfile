# Usa una imagen base de Node.js
FROM node:18-alpine AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Usa una imagen base ligera de Nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos de la construcción de la imagen anterior
COPY --from=build /app/build /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
