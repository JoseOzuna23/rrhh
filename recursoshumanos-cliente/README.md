# RECURSOS HUMANOS | CLIENTE

Este proyecto es la interfaz de usuario (frontend) para el sistema de gestión de Recursos Humanos. Desarrollado con React, permite a los usuarios interactuar de manera eficiente con el backend, accediendo a diversas funcionalidades para la gestión de personal.

### 1. Iniciar el proyecto para el desarrollo

La página se recargará automáticamente cuando realices cambios en el código.

```bash
npm start
```

## 2. Para Producción

### 2.1 Generar una Build
Compila la aplicación para producción, optimizando los archivos para un mejor rendimiento. El resultado se encuentra en la carpeta build, listo para ser desplegado.

```bash
npm run build
```

### 2.2. Pasos para construir y ejecutar la imagen
Construir la imagen:
```bash
docker build -t recursoshumanos-cliente .
```

Ejecutar el contenedor:
```bash
docker run -p 3000:80 recursoshumanos-cliente
```

Probar en la url : http://localhost:3000