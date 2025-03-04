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

Fuente:
https://www.freecodecamp.org/espanol/news/tutorial-de-programacion-de-bash-script-de-shell-de-linux-y-linea-de-comandos-para-principiantes/

### Determinar el tipo de shell

```bash
ps
```

### Comandos básicos

```bash
cd # Cambiar directorio
ls # Listar directorio
mkdir # Crear un directorio
touch # Crea un fichero en blanco
rm # Elimina un archivo o directorio
cp # Copiar un archivo o directorio
mv # Mueve o renombra un archivo o directorio
echo # Imprime texto por el terminal
cat # Imprime el contenido de un archivo
grep # Busca un patrón en un archivo
chmod # Cambia los permisos de un archivo o directorio
chown # Cambia la propiedad de un archivo o directorio
chgrp # Cambia el grupo propietario de un archivo o directorio
sudo # Ejecuta comandos con privilegios administrativos
df # Muestra la cantidad de espacio en disco
history # Historial de comandos ejecutados
ps # Información de procesos
```

### Ejecutar scripts

Agregar shebang, es la primera linea del script y es el path absoluto del interprete de comandos

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

### Fuente

[FreeCodeCamp](https://www.freecodecamp.org/espanol/news/tutorial-de-programacion-de-bash-script-de-shell-de-linux-y-linea-de-comandos-para-principiantes/)