---
title: 'Docker'
description: 'Comandos y configuración de docker.'
pubDate: 2025-10-27
image:
    url: '/blog/docker.png'
    alt: 'Pulumi logo'
    bgColor: '#fff'
tags: ["docker"]
---

## <span class="emoji">📋</span>Tabla de contenido

- [Introducción](#introducción)
- [Enlaces de interés](#enlaces-de-interés)
- [Instalación](#instalación)
- [Get started](#get-started)
- [Comandos básicos](#comandos-básicos)
    - [Ejecutar contenedores](#ejecutar-contenedores)
    - [Administrar contenedores](#administrar-contenedores)
    - [Administrar imágenes](#administrar-imágenes)
    - [Redes](#redes)
    - [Info & Stats](#info--stats)

## <span class="emoji">🌅</span>Introducción

<a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer">**Docker**</a> Docker es una plataforma que te permite empaquetar una aplicación con todo lo que necesita (librerías, dependencias, configuraciones...) dentro de un contenedor, para que corra igual en cualquier entorno. En resumen: portabilidad sin dramas.

## <span class="emoji">🌍</span>Enlaces de interés

- <a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer">Docker</a>  
- <a href="https://hub.docker.com/" target="_blank" rel="noopener noreferrer">Docker Hub</a>
- <a href="https://docs.docker.com/compose" target="_blank" rel="noopener noreferrer">Docker Compose</a>
- <a href="https://docs.docker.com/reference/cli/docker/" target="_blank" rel="noopener noreferrer">Docker CLI</a>


## <span class="emoji">🛠️</span>Instalación

<a href="https://docs.docker.com/engine/install/" target="_blank" rel="noopener noreferrer">Guía oficial de instalación</a>

### Instalación en Ubuntu

```sh
sudo apt update -y
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common -y
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update -y
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Comprobar la versión instalada:

```sh
docker version
```

Agregar al usuario actual al grupo de Docker (Para evitar tener que ejecutar los comandos con sudo):

```sh
sudo usermod -aG docker $USER 
```

## <span class="emoji">🚀</span>Get started

<a href="https://docs.docker.com/get-started/introduction/" target="_blank" rel="noopener noreferrer">Docker Get started</a>

## <span class="emoji">📌</span>Comandos básicos

### Ejecutar contenedores

```sh
# Ejecutar un contenedor
docker run $IMAGE:$TAG 
docker run nginx:latest

# Asignar un nombre al contenedor
docker run --name $CONTAINER_NAME $IMAGE:$TAG 
docker run --name webserver nginx:latest

# Mapear puertos
docker run -p $HOST_PORT:$CONTAINER_PORT $IMAGE:$TAG
docker run -p 8080:80 nginx:latest

# Mapear todos los puertos
docker run -P $IMAGE:$TAG
docker run -P nginx:latest

# Ejecutar el contenedor en segundo plano
docker run -d $IMAGE:$TAG
docker run -d nginx:latest

# Asignar un hostname
docker run --hostname $HOSTNAME $IMAGE:$TAG
docker run --hostname srv nginx:latest

# Asignar un volumen
docker run -v $HOST_DIR:$TARGET_DIR $IMAGE:$TAG
docker run -v ./src:/var/www/html nginx:latest

# Modificar el puntos de entrada
docker run -it --entrypoint $EXECUTABLE $IMAGE:$TAG
docker run -it --entrypoint bash nginx:latest

# Asignar una IP dentro de la red de Docker
docker run --ip $IP $IMAGE:$TAG
docker run --ip 172.18.0.6 nginx:latest

# Asignar una red de Docker a un contenedor
docker run --net $NET_NAME $IMAGE:$TAG
docker run --net custom_net nginx:latest

# Especificar la plataforma donde se ejecuta el contenedor
# aarch  --> linux/arm64
# x86_64 --> linux/amd64
docker run --platform $PLATFORM $IMAGE:$TAG
docker run --platform linux/arm64 nginx:latest

# Asignar permisos privilegiados (Acceso completo al host desde el contenedor)
# --> Puede comprometer la seguridad del host <--
docker run --privileged=true $IMAGE:$TAG
docker run --privileged=true nginx:latest

# Limitar el uso de cpu del host
docker run --cpus="0.5" $IMAGE:$TAG # Limita el uso de la cpu del host a medio core
docker run --cpus="0.5" nginx:latest

# Limitar el uso de memoria del host
docker run --m="2G" $IMAGE:$TAG # Limita el uso de la cpu del host a medio core
docker run --m="2G" nginx:latest
```

### Administrar contenedores

```sh
# Listar contenedores
docker ps # Solo contenedores en ejecución
docker ps -a # Todos los contenedores
docker ps -f "name=web" # Listar contenedores que contienen "web"
docker ps --format "{{.ID}} => {{.Names}}" # Cambia el formato de salida (Ver opciones en la documentación de CLI)

# Eliminar un contenedor
docker rm $CONTAINER
docker rm webserver
docker rm -f webserver # Eliminar el contenedor incluso si está en ejecución
docker container prune # Eliminar contenedores que no estén en uso actual

# Parar un contenedor
docker stop $CONTAINER
docker stop webserver

# Arrancar un contenedor parado
docker start $CONTAINER
docker start webserver

# Copiar ficheros entre el contenedor y el host
docker cp $CONTAINER:$SOURCE $TARGET
docker cp webserver:/var/www/html/index.html index.html # De contenedor a host
docker cp index.html webserver:/var/www/html/index.html # De host a contenedor

# Iniciar una shell dentro de un contenedor en ejecución
docker exec -it $CONTAINER $EXECUTABLE
docker exec -it webserver bash

# Renombrar un contenedor
docker rename $CURRENT_NAME $NEW_NAME
docker rename webserver web

# Crear una imagen a partir de un contenedor
docker commit $CONTAINER $IMAGE:$TAG
docker commit webserver custom_image:my_version
```

### Administrar imágenes

```sh
# Listar imagenes
docker images 

# Descargar una imagen
docker pull $IMAGE:$TAG
docker pull nginx:latest

# Cargar una imagen en un repositorio
docker push $IMAGE:$TAG
docker push myimage:1.0

# Eliminar una imagen
docker rmi $IMAGE:$TAG
docker rmi myimage:1.0
docker image prune -a # Elimina las imágenes en desuso

# Etiquetar una imagen
docker tag $IMAGE $IMAGE:$TAG
docker tag ubuntu ubuntu:18.04

# Construir una imagen a partir de un Dockerfile
docker build $DIRECTORY
docker build .
docker build -t myimage:2.0 . # Agregando un tag personalizado

# Guardar una imagen en un archivo comprimido (tar)
docker save $IMAGE:$TAG > $FILE
docker save myimage:2.0 > myimage.tar

# Cargar una imagen desde un archivo comprimido
docker load -i $TARFILE
docker load -i myimage.tar
```

### Redes

```sh
# Mostar las redes de Docker
docker network ls

# Inspeccionar una red, por defecto la red de docker es "bridge"
docker inspect $NET_NAME
docker inspect bridge
```

### Info & Stats

```sh
# Muestra propiedades de la instalación de docker (contenedores, imagenes, arquitectura...)
docker info

# Mostrar logs de un contenedor
docker logs $CONTAINER
docker logs webserver
docker logs -f webserver # Ver logs en directo

# Mostrar estadísticas (Uso de CPU, memoria, red, I/O...) de contenedores en ejecución
docker stats # Salida interactiva (en tiempo real)
docker stats --no-stream # Salida no interactiva

# Mostrar procesos de un contenedor
docker top $CONTAINER
docker top webserver

# Inspeccionar un contenedor (Imagen base, estado actual, configuración de red...)
docker inspect $CONTAINER
docker inspect webserver

# Mostrar los ficheros modificados de un contenedor
docker diff $CONTAINER
docker diff webserver

# Mostrar los puertos mapeados de un contenedor
docker port $CONTAINER
docker port webserver
```
