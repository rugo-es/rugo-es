---
title: 'bash cheatsheet'
description: 'Comandos básicos'
pubDate: 2025-01-15
image:
    url: '/blog/cheatsheet_shell.svg'
    alt: 'Esquema del flujo de trabajo.'
    bgColor: '#293036'
tags: ["gcp", "gke", "gitlab", "python"]
---

## SED

Modifica la entrada, normalmente ficheros o cadenas de texto, para sustituir un texto por otro.

Ejemplos:

```bash
sed -i -e "s|mirrorlist=|#mirrorlist=|g" /etc/yum.repos.d/CentOS-*

-i    Sobreescribe el fichero original
-e    Especifica que varios comandos se ejecuten a la vez

# Aplicar sed a un conjunto de archicos devuelto por grep
grep -rl texto | xargs sed -i 's/texto/lalala/g'
```


## GREP

Buscar en todo el sistema de archivos una palabra, solo mostrando el nombre del fichero (-l) y sin mostrar errores
```bash
grep -rl "SSLCipherSuite" / 2>/dev/null
```


## FIND

```bash
find [nombre directorio] [parámetro búsqueda]
find . -name .DS_Store -exec rm {} \;

### Mostrar ficheros anteriores a una fecha
find . -type f ! -newermt '2023-11-26'

### Eliminar ficheros anteriores a una fecha
find . -type f ! -newermt '2023-11-26' -exec rm {} +

### Contar numero de ficheros agrupados por fecha
find . -type f -exec stat -c "%y %n" {} + | cut -d' ' -f1 | sort | uniq -c
```

## NCDU

Análisis del disco duro

```bash
ncdu /
```




## DIFF
```bash
diff -rq [directorio/fichero 1] [directorio/fichero 2]
-r : Recursivo
-q : Mostrar los ficheros con diferencias por pantalla

Para comparar dos archivos "modo git"
diff -u archivo1.txt archivo2.txt
```


## TAR

### Comprimir 
tar -cvfz [nombre archivo].tar.gz [directorio a comprimir]
-c : Crear un nuevo archivo
-v : Muestra por pantalla el estado de la compresión
-f : Nombre del archivo
-z : Compresión gzip

### Descomprimir
```bash
tar -xvf [nombre archivo].tar.gz
```


## SCP

### Envío de local a host remoto
```bash
scp -i [clave ssh] [archivo local] [usuario remoto]@[host remoto]:[directorio remoto] 
```

### Recepción a local desde host remot
```bash
scp -i [clave ssh] [usuario remoto]@[host remoto]:[archivo remoto] [directorio local]
```



## GESTIÓN DE USUARIOS

### Archivos importantes 

```bash
/etc/passwd
/etc/shadow
/etc/group
```

### Crear un usuario 
Guía completa: https://docs.bluehosting.cl/tutoriales/servidores/como-administrar-sus-usuarios-y-grupos-en-linux.html

```bash
useradd [nombre usuario]
useradd [nombre usuario] -g [grupo principal]
useradd [nombre usuario] -g [grupo principal] -G [grupo secundario1, grupo secundario2]
```

### Establecer contraseña
```bash
passwd [nombre usuario]
```

### Modificar un usuario

```bash
usermod -l [nombre usuario] [nuevo nombre]
usermod -d [nuevo directorio principal] -m [nombre usuario]
usermod -G [grupo1, grupo2, grupo3]

### Eliminar un usuario
userdel -rf [nombre usuario]

### Mostrar los grupos al que pertenece un usuario
groups [nombre usuario]

### Crear un grupo 
groupadd [nombre grupo]
groupadd -r [nombre grupo]

### Modificar un grupo
groupmod [nuevo nombre] [nombre grupo]

### Eliminar un grupo
groupdel [nombre grupo]
```


## HEAD - TAIL
```bash
head -n 10 [nombre fichero]
tail -n 10 [nombre fichero]
```



# RSYNC

```bash
rsync [opciones] [origen] [destno]
-v : Muestra un registro de la transferencia
-h : Human readable
-r : Recursive (No conserva las fechas ni los permisos de origen)
-a : Archive mode (Recursive pero preserva enlaces simbolicos, propietarios, permisos y las fechas de los datos de origen)
-z : Compress (Comprime los datos durante la transferencia de los mismos)
-W : Fuerza la transferencia completa de todos los archivos
--progress : Muestra el progreso
--include : Indica que archivos/directorios incluir
--exclude : Indica que archivos/directorios excluir
--remove-source-files : Elimina los archivos de origen al terminar la transferencia
--dry-run : Prueba de los cambios que se van a realizar
```


## PROGRAMACION SHELL

### Basic
Agregar la línea al comienzo del script
#!/bin/bash

Ejecutar con:
sh script.sh

### Comprobar si existe un directorio
#!/bin/bash
DIRECTORIO=/root1
if [ -d "$DIRECTORIO" ]
then
   echo "El directorio ${DIRECTORIO} existe"
else
   echo "El directorio ${DIRECTORIO} no existe"
fi

### Comprobar si existe un fichero
#!/bin/bash
FICHERO=/etc/passwd
if [ -f $FICHERO ]
then
   echo "El fichero $FICHERO existe"
else
   echo "El fichero $FICHERO no existe"
fi



## Buscar procesos corriendo en otro puerto (Por ejemplo, puerto 80)
netstat esta incluido en el paquete net-tools
```
netstat -tulpn | grep :80

Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name 
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      1066/lighttpd
```

Eliminar el proceso correspondiente
```
sudo kill -9 1066
```

