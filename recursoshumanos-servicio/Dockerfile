FROM openjdk:17-jdk-slim
# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app
COPY target/recursoshumanos-0.0.1-SNAPSHOT.war recursohumano.war
ENTRYPOINT [ "java","jar", "recursohumano.war" ]
# Expone el puerto que tu aplicación usa
EXPOSE 8085