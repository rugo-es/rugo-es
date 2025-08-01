---
title: 'bash cheatsheet'
description: 'Comandos básicos'
pubDate: 2025-01-15
image:
    url: '/blog/cheatsheet_bash.svg'
    alt: 'Bash icon.'
    bgColor: '#293036'
tags: ["bash", "ubuntu", "shell", "servidor"]
---

### Utilidades

```bash
ps # Determinar el tipo de shell del sistema
which python3 # Indica la ruta al ejecutable de python
whereis python3 # Muestra la ubicacón del binario y de ayuda
```

### Información del sistema

```bash
date # Fecha del sistema
arch # Arquitectura de la máquina
df -h # Uso del espacio en disco
ps -A # Procesos en ejecución
history # Historial de comandos ejecutados
hostnamectl # Información general (hostname, operation system, kernel...)
uname -m # Arquitectura de la máquina
uname -r # Versión del kernel
dmidecode -q # Componentes hardware del sistema
cat /proc/cpuinfo # Información de la CPU
cat /proc/meminfo # Uso de la memoria
cat /proc/version # Información del kernel
lspci -tv # Dispositivos PCI
lsusb -tv # Dispositivos USB
```

### Archivos y directorios

```bash
pwd # Muestra la ruta al directorio actual
tree # Muestra el árbol de ficheros y directorios
cd /myDir # Cambiar al directorio /myDir
cd # Cambiar al directorio home del usuario
ls # Muestra los archivos de un directorio
ls -a # Muestra los archivos y archivos ocultos de un directorio
ls -l # Muestra los archivos de un directorio con detalles
ls -ltr # Muestra los archivos de un directorio ordenados por fecha
mkdir myDir # Crea un directorio myDir
mkdir myDir1 myDir2 # Crea los directorios myDir1 y myDir2
mkdir -p /home/myDir1/myDir2/myDir3 # Crea un árbol de directorios
touch myFile.txt # Crea un fichero myFile.txt en blanco
echo "Hello world" > myFile.txt # Define el contenido de myFile.txt
echo "Hello world" >> myFile.txt # Agrega "Hello world" al contenido de myFile.txt
cp myFileFrom.txt myFileTo.txt # Copiar un fichero
cp -r myDirFrom myDirTo # Copia de manera recursiva (todo el contenido) un directorio
mv myFile1.txt myFile2.txt # Renombrar un fichero
mv myFile.txt /home/myDir # Mover un fichero 
rm myFile.txt # Elimina un archivo
rm -rf /myDir # Elimina un directorio y todo su contenido
chmod 777 myFile.txt # Cambia los permisos de un archivo o directorio
chown myUser myFile.txt # Cambia la propiedad de un archivo o directorio
chown -R myUser myDir # Cambia la propiedad de un directorio de manera recursiva
chown myUser:myGroup myFile.txt # Cambia la propiedad y el grupo de un archivo o directorio
chgrp myGroup myFile.txt # Cambia el grupo propietario de un archivo o directorio
```

### Visualizar contenido de ficheros

```bash
cat myFile.txt # Muestra el contenido completo del fichero
tac myFile.txt # Muestra el contenido completo del fichero en orden inverso
more myFile.txt # Muestra el contenido del fichero paginando (menos interactividad, carga más rápida)
less myFile.txt # Muestra el contenido del fichero paginando (más interactividad, carga más lento en archivos pesados)
head -10 myFile.txt # Muestra las 10 primeras líneas de un fichero
tail -10 myFile.txt # Muestra las 10 últimas lineas de un fichero
tail -f /var/log/syslog # Muestra en tiempo real el contenido del fichero
```

### Gestión de usuarios

```bash
useradd myUser # Crea un usuario
useradd myUser -g myGroup # Crea un usuario y le asigna el grupo principal
useradd myUser -g myMainGroup -G mySecondGroup # Crea un usuario y le asigna el grupo principal y el secundario
passwd # Actualizar contraseña del usuario actual
passwd myUser # Actualizar contraseña de otro usuario (root)
usermod -l myUser myNewUserName # Modificar el nombre de un usuario
usermod -d /home/customDirUser -m myUser # Modificar el directorio home de un usuario
usermod -G myGroup1,myGroup2,myGroup3 myUser # Modificar los grupos secundarios de un usuario
usermod -aG myGroup1 myUser # Agregar un grupo secundario sin modificar los demás
userdel -rf myUser # Elimina un usuario

groups myUser # Mostrar los grupos de un usuario
groupadd myCustomGroup # Crear un grupo de usuarios estándar (humanos)
groupadd -r myCustomGroup # Crear un grupo de usuarios de sistema (servicios)
groupmod myGroup myNewGroup # Renombrar un grupo
groupdel myGroup # Eliminar un grupo

pwck # Comprueba errores en el fichero /etc/passwd
grpck # Comprueba errores en el fichero /etc/group
```

### Herramientas de red

```bash
hostname # Muestra el nombre del host del sistema
hostname -I # Mostrar IPs asignadas al host
ip a # Muestra la configuración de las interfaces de red
ip route # Muestra la tabla de enrutamiento IP
iptables -L # Muestra las reglas de firewall 
curl ifconfig.me # Obtener la IP pública externa del router
curl ipinfo.io/ip # Obtener la IP pública externa del router
```

### find

```bash
find / -name myFile.txt # Busca desde el directorio raíz archivos con nombre myFile.txt
find / -user myUser # Busca desde el directorio raíz archivos que pertenecen al usuario myUser
find . -name myFile.txt -exec rm {} \; # Busca en el directorio actual archivos con nombre myFile.txt y lo elimina
find . -type f ! -newermt '2025-07-09' # Busca ficheros anteriores a una fecha
find . -type f ! -newermt '2025-07-09' -exec rm {} + # Busca ficheros anteriores a una fecha y los elimina
find . -type f -exec stat -c "%y %n" {} + | cut -d' ' -f1 | sort | uniq -c # Contar numero de ficheros agrupados por fecha
```

### grep

```bash
grep -rl "myText" / 2>/dev/null # Busca en el contenido de los ficheros de todo el sistema la palabra "myText" y muestra solo el nombre del fichero
grep -rl myText | xargs sed -i 's/myText/myNewText/g' # Buscar ficheros que contenga una palabra y sustituir la palabra
```

### ncdu

Análisis del disco duro

```bash
du -h / --exclude=/proc --exclude=/sys | sort -rh | head -n 10 # Mostrar los 10 directorios que más espacio ocupan del sistema
ncdu /
```


### diff
```bash
diff -u myFile1.txt myFile2.txt # Compara el contenido de dos archivos
```

### awk 

https://geekland.eu/uso-del-comando-awk-en-linux-y-unix-con-ejemplos/

```bash
ps | awk 'NR>1 {print $2}' # Muestra a partir de la segunda linea de la salida de `ps`, la segunda columna
cat /etc/passwd | awk -F ":" '{print $1}' # Utiliza como delimitador ":" y muestra la primera columna
cat /etc/passwd | awk -F ":" '{print $1 "-" $3 "-" $4}' # Estrae varias columnas de la salida
gsutil ls -l gs://myBucket | sort -k2 -r | awk 'NR==2 {print $NF}' | awk -F/ '{print $NF}' # Muestra el nombre del archivo más actual del bucket
df | awk '/^\// {print}' # Muestra solo las lineas que empiezan por "/"
```

### sort

### iperf3 

Velocidad de red entre equipos

### tar

### scp

```bash
scp -i mySshKey myLocalFile.txt myUser@192.168.1.1:/home/myUser # Copia un fichero local a remoto
scp -i mySshKey myUser@192.168.1.1:/home/myUser/myFile.txt . # Copia un fichero remoto a local
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

### Ejecutar scripts

Agregar shebang, es la primera linea del script y es el path absoluto del intérprete de comandos

```bash
#!/bin/bash
```

Para encontrar el path a tu shell

```bash
which bash
```

Ejemplo de script básico

```bash
#!/bin/bash
echo "Hoy es " `date`

echo -e "\ningresa la ruta al directorio"
read the_path

echo -e "\n tu ruta tiene los siguientes archivos y carpetas: "
ls $the_path
```

Para hacer el script ejecutable, asigna permisos de ejecución

```bash
chmod u+x script.sh
```

Ejecutar el script

```bash
bash script.sh
sh script.sh
./script.sh
```

### Comentarios 

Los comentarios empiezan con `#`, Ejemplo:

```bash
# Esto es un comentario
```

### Variables

```bash
# Asigancion
nombre=valor
# Uso
echo $nombre
```

### Entradas y salidas en scripts

#### Entradas

1. Leer la entrada del usuario y almacenarlo en una variable, usamos `read`

```bash
#!/bin/bash
echo -e "Introduce un número"
read number
echo -e "\n El numero introducido es: $number"
```

2. Leer un archivo

```bash
#!/bin/bash
while read linea
do
   echo $linea
done < input.txt
```

3. Argumentos

Los argumentos se indican con `$x` donde x es el orden del argumento

```bash
#!/bin/bash
echo "Hello, $1 $2!"
```

A la hora de ejecutar el script le pasas los argumentos

```bash
bash script.sh Rubén González
# Output: Hello, Rubén González
```

#### Salidas

1. Imprimir por terminal

```bash
echo "Hola mundo"
echo -e "Hola mundo\nQue tal??" # Para interpretar saltos de líneas y otros carácteres especiales
```

2. Escribir a un archivo

```bash
echo "Esto es un texto" > output.txt
```

3. Adjuntar a un archivo

```bash
echo "Esto es un texto" >> output.txt
```

4. Redireccionando la salida

2. Escribir a un archivo

```bash
ls > files.txt
```

### Condicionales

#### if - elif - else

```bash
#!/bin/bash
echo "Por favor ingresa un numero: "
read num
if [ $num -gt 0 ]; then
  echo "$num es positivo"
elif [ $num -lt 0 ]; then
  echo "$num es negativo"
else
  echo "$num es cero"
fi
if [ $num -gt 0 -a $num -le 17 ]
   echo -e "\nEres menor de edad"
fi
```

#### case

```bash
#!/bin/bash
fruta="manzana"
case $fruta in
    "manzana")
        echo "Este es una fruta roja."
        ;;
    "banana")
        echo "Este es una fruta amarilla."
        ;;
    "orange")
        echo "Este es una fruta naranja."
        ;;
    *)
        echo "Fruta desconocida."
        ;;
esac
```

### Bucles

#### while

```bash
#!/bin/bash
i=1
while [[ $i -le 10 ]] ; do
   echo "$i"
   (( i += 1 ))
done
``` 

#### bucle for

```bash
#!/bin/bash
for i in {1..5}
do
   echo $i
done
``` 

### Depuración 

#### Establecer la opción `set -x`

Establecer `set -x` al cominezo del script imprimirá que línea esta ejecutando en cada momento

```bash
#!/bin/bash
set -x

# Resto del script
```

#### Establecer la opción `set -e`

Si quieres que tu escript salga inmediatamente cuando falle, usa la opcion `set -e`.

```bash
#!/bin/bash
set -e

# Resto del script
```

#### Verificar el código de salida

Cuando bash encuentra un error, pone un código de salida que indica la naturaleza del error. Puedes verificar el código de salida del comando más reciente usando la variable `$?`. Un valor de 0 inica éxito, mientras que cualquier otro valor indica un error.

#### Logs de cron

Puedes encontrar los logs de `cron` en:

```bash
/var/log/syslog
```

### Fuentes

[FreeCodeCamp](https://www.freecodecamp.org/espanol/news/tutorial-de-programacion-de-bash-script-de-shell-de-linux-y-linea-de-comandos-para-principiantes/)

[blog.desdelinux.net](https://blog.desdelinux.net/mas-de-400-comandos-para-gnulinux-que-deberias-conocer/)