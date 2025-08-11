---
title: 'Uso de librerías de python propias con Artifact Registry (GCP)'
description: 'Tutorial de como crear una librería sencilla de python, publicarla en un repositorio de Artifact Registry de GCP, actualizar la versión de la librería y usarla en otros proyectos.'
pubDate: 2025-05-08
image:
    url: '/blog/python-library-artifact-registry.png'
    alt: 'Pulumi logo'
    bgColor: '#201010'
tags: ["python", "gcp", "artifact-registry"]
---

## <span class="emoji">📋</span>Tabla de contenido

- [Introducción](#introducción)
- [Enlaces de interés](#enlaces-de-interés)
- [Tutorial](#tutorial)
    - [Crear el espacio de trabajo y la estructura de directorios y ficheros](#1️⃣crear-el-espacio-de-trabajo-y-la-estructura-de-directorios-y-ficheros)
    - [Crear el repositorio en Artifact Registry](#2️⃣crear-el-repositorio-en-artifact-registry)
    - [Crear una cuenta de servicio para interactuar con el repositorio](#3️⃣crear-una-cuenta-de-servicio-para-interactuar-con-el-repositorio)
    - [Publicar la librería en Artifact Registry](#4️⃣publicar-la-librería-en-artifact-registry)
    - [Obtener el token para uso de la librería en otros proyectos](#5️⃣obtener-el-token-para-uso-de-la-librería-en-otros-proyectos)
    - [Instalar la librería en otros proyectos](#6️⃣instalar-la-librería-en-otros-proyectos)
    - [Actualizar el paquete de versión](#7️⃣actualizar-el-paquete-de-versión)

## <span class="emoji">🌅</span>Introducción

Vas a crear una librería básica de python que envía saludos, subirla a <a href="https://cloud.google.com/artifact-registry/docs?hl=es-419" target="_blank" rel="noopener noreferrer">**Artifact Registry**</a>, que es el servicio de GCP para gestionar repositorios (Imágenes de docker, librerías de python...) y después hacer uso de esta librería en otro proyecto, después veremos también como actualizar la librería.

## <span class="emoji">🌍</span>Enlaces de interés

- <a href="https://cloud.google.com/artifact-registry/docs?hl=es-419" target="_blank" rel="noopener noreferrer">Artifact Registry</a>  
- <a href="https://pypi.org/project/twine/" target="_blank" rel="noopener noreferrer">twine</a>

## <span class="emoji">🚀</span>Tutorial

### <span class="emoji">1️⃣</span>Crear el espacio de trabajo y la estructura de directorios y ficheros

El espacio de trabajo será el siguiente:

```
python-library/
├── greetings/
│   └── __init__.py
├── setup.py
├── README.md
├── .gitignore
```

Crea y accede al directorio de trabajo:

```sh
mkdir python-library && cd python-library
```

Crea un entorno vitual de python y actívalo:

```sh
python -m venv .venv
source .venv/bin/activate
``` 

Realiza las instalaciones necesarias:

```sh
pip install --upgrade pip setuptools build
```

Contenido de **`greetings/__init__.py`**:

```python
""" My python library """
__version__ = "0.0.1"

def hello(nombre):
    return f"¡Hola, {nombre}!"
```

Contenido de **`setup.py`**:

```python
from setuptools import setup, find_packages

setup(
    name="greetings",
    version="0.0.1",
    packages=find_packages(),
    author="John Doe",
    author_email="john.doe@mail.com",
    description="My greetings library",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    classifiers=[
        "Programming Language :: Python :: 3",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.6',
)
```

Contenido de **`README.md`**:

```markdown
# greetings

Una librería sencilla en Python para saludar a las personas.
```

Contenido de **`.gitignore`**:

```markdown
.venv
dist
```

### <span class="emoji">2️⃣</span>Crear el repositorio en Artifact Registry

Crea variables que ayuden a mejorar la seguridad del entorno:

```sh
PROJECT_ID=my-project-id
REGION=us-east4
REPOSITORY_NAME=my-python-libraries
```
Configura tu proyecto en gcloud CLI:

```sh
gcloud config set project $PROJECT_ID
```

Habilita la API en el proyecto si no lo está:

```sh
gcloud services enable artifactregistry.googleapis.com
```

Crea el repositorio para librerías de python en Artifact Registry:

```sh
gcloud artifacts repositories create $REPOSITORY_NAME --repository-format=python --location=$REGION --description="Repositorio PyPI para paquetes Python"
```
  
Verifica que el repositorio se ha creado correctamente:

```sh
gcloud artifacts repositories list --location=$REGION
```

### <span class="emoji">3️⃣</span>Crear una cuenta de servicio para interactuar con el repositorio

Crea la cuenta de servicio:

```sh
gcloud iam service-accounts create uploader --display-name="PyPI uploader"
```

Asigna los permisos a la cuenta de servicio para trabajar con el repositorio:

```sh
gcloud projects add-iam-policy-binding $PROJECT_ID --member="serviceAccount:uploader@$PROJECT_ID.iam.gserviceaccount.com" --role="roles/artifactregistry.writer"
```

Genera una clave en formato JSON para la cuenta de servicio, **no guardes esta clave en el directorio de trabajo**:

```sh
gcloud iam service-accounts keys create ~/sa-key.json --iam-account=uploader@$PROJECT_ID.iam.gserviceaccount.com
```

### <span class="emoji">4️⃣</span>Publicar la librería en Artifact Registry

Instala <a href="https://pypi.org/project/twine/" target="_blank" rel="noopener noreferrer">twine</a>, es una herramienta para trabajar con repositorios de librerías de python.

```sh
pip install twine
```

Crea el archivo **`~/.pypirc`**, este fichero de configuración le indica a twine las credenciales para el repositorio y te permite publicar librerías de manera más sencilla.  
Ejecuta el siguiente comando y **copia la sección `# Insert the following snippet into your .pypirc`** en el fichero **`~/.pypirc`**:

```sh
gcloud artifacts print-settings python --project=$PROJECT_ID --repository=$REPOSITORY_NAME --location=$REGION --json-key=/path/to/your/key/sa-key.json
```

Tendrá que quedar algo parecido a esto:

```sh
[distutils]
index-servers =
    my-python-libraries

[my-python-libraries]
repository: https://us-east4-python.pkg.dev/my-project-id/my-python-libraries/
username: _json_key_base64
password: ewogICJ0eXBlIjogInNlcnZpY2VfYWNjb3VudCIsCiA...
```

Ahora ya puedes publicar la librería.  
Empaqueta la librería, este comando genera los directorios **`/dist`** y **`/greetings.egg-info`** dentro del espacio de trabajo:

```sh
python -m build
```

Envía la librería a Artifact Registry:

```sh
twine upload --repository my-python-libraries dist/*
```

### <span class="emoji">5️⃣</span>Obtener el token para uso de la librería en otros proyectos

Obtén el token de la cuenta de servicio que será necesario para agregar a la url de instalación de la librería.  
Para ello, inicia sesión con las credenciales de la cuenta de servicio:

```sh
gcloud auth activate-service-account --key-file=/path/to/your/key/sa-key.json
```

Imprime el token:

```sh
gcloud auth print-access-token
```

Tendrá esta pinta:

```sh
ya29.c.c0ASRK0Ga9cZt0-OwYqvPUUe2QLuTd1Xlv6B7PlOCGyuEPSlxMOIbO...
```

### <span class="emoji">6️⃣</span>Instalar la librería en otros proyectos

Crea otro espacio de trabajo para un proyecto de python a parte

```sh
mkdir python-using-library && cd mkdir python-using-library
``` 

Crea y activa el entorno virtual

```sh
python -m venv .venv
source .venv/bin/activate
```

Simplemente tendrás que realizar la instalación de este modo, **indica el token obtenido** en el paso anterior **y agrega el `/simple/`** al final de la URL:

```sh
pip install greetings --index-url https://_token:<ACCESS_TOKEN>@$REGION-python.pkg.dev/$PROJECT_ID/$REPOSITORY_NAME/simple/ 
```

Para instalar una versión específica, indícalo junto al nombre del paquete:

```sh 
pip install greetings==0.0.1 --index-url https://_token:<ACCESS_TOKEN>@$REGION-python.pkg.dev/$PROJECT_ID/$REPOSITORY_NAME/simple/ 
```

Crea un archivo **`__main__.py`** con el siguiente contenido:

```python
""" Using my python library """

import greetings

print(greetings.hello("John Doe"))
```

Ejecuta **`python __main__.py`** y deberías ver que funciona correctamente:

```sh
¡Hola, John Doe!
```

### <span class="emoji">7️⃣</span>Actualizar el paquete de versión

Elimina los directorios generados de la versión anterior:

```sh
rm -rf dist/ *.egg-info
```

Modifica el código de **`greetings/__init__.py`** con una nueva funcionalidad y actualiza la versión:

```python
""" My python library """
__version__ = "0.0.2"

def hello(nombre):
    return f"👋¡Hola holita, {nombre}!👋"
```

Actualiza la versión también en **`setup.py`**:

```python
from setuptools import setup, find_packages

setup(
    name="greetings",
    version="0.0.2",
...
``` 

Vuelve a empaquetar la librería:

```sh
python -m build
```

Sube los cambios al repositorio:

```sh
twine upload --repository my-python-libraries dist/*
```

Puedes actualizar el paquete en tu directorio de pruebas (python-using-library)

```sh
pip install --upgrade greetings --index-url https://_token:<ACCESS_TOKEN>@$REGION-python.pkg.dev/$PROJECT_ID/$REPOSITORY_NAME/simple/
``` 

Y sin modificar el código de **`__main__.py`** y ejecutando de nuevo **`python __main__.py`** ver el nuevo resultado:

```sh
👋¡Hola holita, John Doe!👋
```