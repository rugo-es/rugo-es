---
title: 'Comandos Linux'
description: 'Cheatsheet de comandos y otras utilidades.'
pubDate: 2025-01-15
image:
    url: '/blog/cheatsheet_bash.png'
    alt: 'Bash icon.'
    bgColor: '#dd4814'
tags: ["bash", "ubuntu", "shell", "servidor"]
---

### Utilidades

```bash
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
Ctrl + r # Buscar directamente en el historial
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
# Con less puedes realizar búsquedas de texto indicando en el prompt '/' y escribiendo el texto a resaltar
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

curl https://api.ipify.org?format=json # Obtener la IP pública
curl ifconfig.me # Obtener la IP pública
curl ipinfo.io/ip # Obtener la IP pública
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
# Buscar texto en el contenido de un fichero
grep $TEXT $FILE
grep 'my_texto' /var/www/index.html

grep -rl "myText" / 2>/dev/null # Busca en el contenido de los ficheros de todo el sistema la palabra "myText" y muestra solo el nombre del fichero
grep -rl myText | xargs sed -i 's/myText/myNewText/g' # Buscar ficheros que contenga una palabra y sustituir la palabra
```

### sed

```bash
# Modificar una cadena de texto (-e) dentro de un archivo y guardar el cambio (-i)
sed -i -e 's/$TEXT_TARGET/$NEW_TEXT/' /var/www/index.html
sed -i -e 's/SEARCH/FOUND/' -e 's/ANOTHER/FOUND/' my_file.txt
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

### stress

Pruebas de estrés en sistemas Linux (carga de cpu, memoria...)

<a href="https://www.ochobitshacenunbyte.com/2018/01/10/pruebas-de-estres-en-sistemas-gnu-linux/" target="_blank">Comando stress</a>


```bash
stress -c 8 -m 2 -t 10s
```

### hey

<a href="https://github.com/rakyll/hey" target="_blank">Comando hey</a>


Herramienta para realizar pruebas de estres y peticiones a servidores web.
Alternativa Apache ab - https://httpd.apache.org/docs/2.4/programs/ab.html
Tutorial de apache ab - https://nowitsanurag.medium.com/stress-testing-using-apache-bench-ab-98a3f1312246
```bash
ENDPOINT="https://rugo.es"

# hey command
# -n - Requests number
# -c - Threads (Concurrence)

hey -n 10 -c 1 $ENDPOINT

# Test with header
# hey -n 10 -c 1 -H "X-Internal-Request: true" $ENDPOINT

# Output example:
Summary:
  Total:        0.4787 secs
  Slowest:      0.3380 secs
  Fastest:      0.0138 secs
  Average:      0.0479 secs
  Requests/sec: 20.8900
  

Response time histogram:
  0.014 [1]     |■■■■■
  0.046 [8]     |■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  0.079 [0]     |
  0.111 [0]     |
  0.144 [0]     |
  0.176 [0]     |
  0.208 [0]     |
  0.241 [0]     |
  0.273 [0]     |
  0.306 [0]     |
  0.338 [1]     |■■■■■


Latency distribution:
  10% in 0.0139 secs
  25% in 0.0141 secs
  50% in 0.0143 secs
  75% in 0.0211 secs
  90% in 0.3380 secs
  0% in 0.0000 secs
  0% in 0.0000 secs

Details (average, fastest, slowest):
  DNS+dialup:   0.0199 secs, 0.0138 secs, 0.3380 secs
  DNS-lookup:   0.0166 secs, 0.0000 secs, 0.1659 secs
  req write:    0.0000 secs, 0.0000 secs, 0.0001 secs
  resp wait:    0.0276 secs, 0.0134 secs, 0.1384 secs
  resp read:    0.0003 secs, 0.0002 secs, 0.0005 secs

Status code distribution:
  [200] 10 responses
``` 

### pwgen

Genera contraseñas seguras

```bash
# Instalación
sudo apt update && sudo apt install pwgen -y

# Uso
pwgen # Genera contraseñas de 8 carácteres de longitud
pwgen 32 # Genera contraseñas de 32 carácteres de longitud
pwgen 32 -1 # Genera una sola contraseña
pwgen -N 3 # Genera 3 contraseñas
pwgen -y # Agrega caráteres especiales
pwgen 32 -1 -y # Crea una sola contraseña de 32 carácteres y agregando especiales
```

### htop

Muestra en tiempo real los procesos que se están ejecutando en un sistema Linux, junto con el uso de CPU, memoria y carga del sistema.  
Es una versión interactiva y mucho más visual de `top`, que permite filtrar, matar o renombrar procesos directamente desde la interfaz.

```bash
# Instalación
sudo apt update && sudo apt install htop -y

# Uso 
htop
htop --tree # Para ver el árbol de procesos
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

### nano

```bash
# Para configurar el tamaño de las tabulaciones
nano -ET2 # Tabulaciones de 2 espacios

# Dejar el editor en segundo plano
Ctrl + T 
Ctrl + Z 
# Volver a la edición
fg 
```

### tar

```bash
# Comprimir/Extraer archivos en un fichero tar
tar -cvf archivo.tar carpeta/ # c -> comprimir, v -> verbose (ver log), f -> indicar el nombre del archivo
tar -xvf archivo.tar # x -> extraer
tar -tvf archivo.tar # t -> listar contenido (sin extraer)
tar -xvf archivo.tar -C /ruta/ # Extraer en ruta indicada

# Compresión gzip
tar -czvf archivo.tar.gz carpeta/ # z -> gzip
tar -xzvf archivo.tar.gz # z -> gzip



```

### scp

```bash
scp -i mySshKey myLocalFile.txt myUser@192.168.1.1:/home/myUser # Copia un fichero local a remoto
scp -i mySshKey myUser@192.168.1.1:/home/myUser/myFile.txt . # Copia un fichero remoto a local
```

# rsync

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
```bash
netstat -tulpn | grep :80

Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name 
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      1066/lighttpd
```

Eliminar el proceso correspondiente
```bash
sudo kill -9 1066
```
