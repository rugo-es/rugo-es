---
title: 'Pulumi'
description: 'Primeros pasos con esta herramienta de IaC.'
pubDate: 2025-02-06
image:
    url: '/blog/pulumi.png'
    alt: 'Pulumi logo'
    bgColor: '#371a47'
tags: ["pulumi", "python", "gcp", "cloud", "iac"]
---

## 📋Tabla de contenido

- [Introducción](#introducción)
- [Enlaces de interés](#enlaces-de-interés)
- [Instalación](#instalación)
- [Get started](#get-started)

## 🌅Introducción

<a href="https://www.pulumi.com/" target="_blank" rel="noopener noreferrer">**Pulumi**</a> es una herramienta que **permite administrar infraestructura como código** (IaC), principalmente **en los servicios cloud (AWS, GCP y Azure) y en kubernetes**.

Se puede hacer uso de esta herramienta utilizando varios lenguajes de programación (typescript, python, go, java...), en este viaje analizando pulumi me centro en su uso con **python** como lenguaje de programación y administrando recursos en **Google Cloud Platform**.

### Comandos principales

```bash
pulumi new # Crea un nuevo proyecto usando un template
pulumi stack # Administra tus stacks
pulumi config # Configura variables como claves, regiones, etc.
pulumi up # Vista previa e implementación de cambios
pulumi preview # Vista previa de los cambios
pulumi destroy # Elimina tu programa y su infraestructura
```

## 🌍Enlaces de interés

<a href="https://www.pulumi.com/docs/iac/get-started/" target="_blank" rel="noopener noreferrer">Pulumi Get Started</a>  
<a href="https://www.pulumi.com/docs/iac/concepts/" target="_blank" rel="noopener noreferrer">Pulumi Concepts</a>  
<a href="https://www.pulumi.com/registry/" target="_blank" rel="noopener noreferrer">Pulumi Registry</a>  
<a href="https://www.pulumi.com/docs/iac/using-pulumi/" target="_blank" rel="noopener noreferrer">Using Pulumi</a>

## 🛠️Instalación

<a href="https://www.pulumi.com/docs/iac/download-install/" target="_blank" rel="noopener noreferrer">Guía oficial de instalación</a>

### Instalación en ubuntu

```bash
curl -fsSL https://get.pulumi.com | sh
# Agregar al PATH
export PATH=$PATH:/root/.pulumi/bin
```

Comprobar la versión instalada:

```bash
pulumi version
```

## 🚀Get started

En este ejemplo para iniciarte con pulumi, vas a configurar el entorno necesario para crear un bucket en GCP, agregarle un fichero, actualizar los recursos, acceder al fichero mediante su url y eliminarlo todo.

Para trabajar con pulumi para generar recursos en GCP con python es necesario instalar:

- <a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer">python</a>
- <a href="https://cloud.google.com/sdk/docs/install?hl=es-419" target="_blank" rel="noopener noreferrer">gcloud CLI</a>
- <a href="https://www.pulumi.com/docs/iac/download-install/" target="_blank" rel="noopener noreferrer">pulumi</a>

El primer paso será configurar gcloud, para trabajar en tus proyectos.  

```bash
# Realiza el login con tu usuario de GCP
gcloud auth login
# Verifica que te has identificado correctamente
gcloud auth list
# Muestra la lista de proyectos que tienes disponible con tu usuario
gcloud projets list
# Configura gcloud para trabajar con el proyecto donde quieres generar los recursos
gcloud config set project <PROJECT_ID>
# Muestra la configuración de gcloud para asegurarte que has seleccionado el proyecto deseado
gcloud config list
```

Pulumi requiere credenciales de aplicación predeterminadas para interactuar con los recursos de GCP.

```bash
gcloud auth application-default login
```

Desconectate de tu backend actual (si es que estas conectado)

```bash
pulumi logout
```

Conectate a un backend de pulumi, normalmente deberías usar un bucket, puedes consultar las opciones disponibles con `pulumi login --help`, en este ejemplo usarás como backend un archivo local:

```bash
pulumi login --local
```

Crea un directorio de trabajo

```bash
mkdir pulumi-get-started && cd pulumi-get-started
```

Crea un nuevo proyecto de pulumi indicando el runtime `python`, el nombre del proyecto, la descripción y el stack `dev`

```bash
pulumi new python --name "my-python-project" --description "Mi proyecto de pulumi y python" --stack dev 
```

Se creará la siguiente estructura de ficheros:

```
 .
 ├── __main__.py
 ├── .gitignore
 ├── Pulumi.dev.yaml
 ├── Pulumi.yaml            
 └── requirements.txt
``` 

Agrega el paquete de GCP a las dependencias del proyecto y realiza la instalación:

```bash
echo "pulumi_gcp>8.0.0,<9.0.0" >> requirements.txt
pulumi install
```

Agrega a la configuración del proyecto de pulumi el proyecto de GCP donde quieres crear los recursos:

```bash
pulumi config set gcp:project <PROJECT_ID>
```

Modifica el archivo `__main__.py` con el siguiente contenido para crear un bucket y exportar como un output la url del bucket:

```python
"""A Python Pulumi program"""

import pulumi
from pulumi_gcp import storage

# Create a GCP resource (Storage Bucket)
bucket = storage.Bucket('my-bucket', location="EU")

# Export the DNS name of the bucket
pulumi.export('bucket_name', bucket.url)
```

Crea los recursos y muestra el output que contiene la url del bucket:

```bash
# Ejecuta el script de pulumi
pulumi up
# Muestra la url del bucket creado
pulumi stack output bucket_name
```

Crea un fichero `index.html` en el directorio de trabajo con el siguiente contenido:

```html
<html>
<body>
<h1>Hello, Pulumi!</h1>
</body>
</html>
```

Modifica `__main__.py` para que agregue `index.html` al bucket y asigna permisos al bucket para hacerlo público:

```python
bucket_object = storage.BucketObject(
    "my-index.html", 
    bucket=bucket.name, 
    source=pulumi.FileAsset("index.html")
)

bucket_iam_binding = storage.BucketIAMBinding(
    "my-bucket-binding",
    bucket=bucket.name,
    role="roles/storage.objectViewer",
    members=["allUsers"],
)
```

Actualiza los recursos en GCP ejecutando el script de pulumi y muestra los ficheros del bucket con `gsutil` para asegurarte de que el fichero se cargo correctamente:

```bash
# Actualiza los recursos ejecutando el script de pulumi
pulumi up
# Comprueba que se ha cargado el fichero correctamente
gsutil ls $(pulumi stack output bucket_name)
```

Agrega al programa la directiva `website` y `uniform_bucket_level_access` en la definición del bucket y exporta la url de acceso a la web:

```python
bucket = storage.Bucket(
    'test-bucket',
    location="EU",
    website={
        "main_page_suffix": "index.html"
    },
    uniform_bucket_level_access=True,
)

pulumi.export(
    "bucket_endpoint",
    pulumi.Output.concat(
        "http://storage.googleapis.com/", bucket.id, "/", bucket_object.name
    ),
)
```

Actualiza los recursos ejecutando el script de pulumi:

```bash
pulumi up
```

Accede al sitio web que se ha creado en el bucket de GCP:

```bash
curl $(pulumi stack output bucket_endpoint)
```

Obtendrás el contenido de `index.html`

```html
<html>
<body>
<h1>Hello, Pulumi!</h1>
</body>
</html>
```

Elimina el stack y los recursos generados en la prática.

```bash
pulumi destroy
```

## 📌Obtener el nombre del stack actual dentro del script

```python
import pulumi
current_stack = pulumi.get_stack()
pulumi.export("current_stack", current_stack)
```

## 📌Obtener el backend al que estoy conectado actualmente

```bash
pulumi whoami --verbose
```

## 📌Usa la configuración con diferentes namespaces

Definir las diferentes configuraciones

```bash
# Configurar variables para GCP
pulumi config set gcp:project <PROJECT_NAME>
# Configurar variables en el namespace por defecto
pulumi config set <CONFIG_NAME> <CONFIG_VALUE>
```

Acceder a las configuraciones dentro del script

```python
from pulumi import Config
config = Config()
config_gcp = Config("gcp")
```

## 📌Listar imágenes públicas de GCP para seleccionar sistema operativo

```bash
# Ver imágenes disponibles (listado completo)
gcloud compute images list
# Filtrar imágenes de ubuntu
gcloud compute images list --project=ubuntu-os-cloud --no-standard-images
# Filtrar imágenes de ubuntu 24
gcloud compute images list --project=ubuntu-os-cloud --no-standard-images --filter="name:ubuntu-2404*"
```

## 📌Importar recursos al estado

En la documentación del propio recurso en el registry de pulumi te indica como importar cada uno de los recursos.  
Sintaxis básica:

```bash
pulumi import <TYPE> <RESOURCE_NAME> <ID>
```

Ejemplos:

```bash
# Importar un Project
pulumi import -y gcp:organizations/project:Project project-my-project my-project
# Importar un MonitoredProject
pulumi import -y gcp:monitoring/monitoredProject:MonitoredProject monitoredProject-my-project v1/locations/global/metricsScopes/project-global-monitoring/projects/my-project
# Importar un Service (API)
pulumi import -y gcp:projects/service:Service service-my-proyect-iam my-project/iam.googleapis.com
# Importar un IAMMember
pulumi import -y gcp:projects/iAMMember:IAMMember iamMember-my-project-viewer-user@mail.com "projects/my-project roles/viewer user:user@mail.com"
```

## 📌Comparar diferencias de recursos (pulumi state vs. gcp)

Muestrará las diferencias en detalle encontradas entre el estado actual de pulumi y los recursos de GCP.

```bash
pulumi preview --diff
```

## 📌Comparar la configuración de un bucket de GCP con el estado actual de pulumi

```bash
# Descargar a un fichero el estado de pulumi
pulumi stack export > pulumi-state.json
# Descargar la configuración de GCP
gcloud storage buckets describe gs://nexe_filestore --format=json > gcp-bucket.json
```

## 📌Stack outputs

Son las salidas de información que indicamos en los scripts con la función de pulumi.export().  
Estos son los comandos principales para administrar los outputs:

```bash
pulumi stack output
pulumi stack output --show-secrets
```

## 📌Secrets

Crea un secret

```bash
pulumi config set --secret <SECRET_NAME> "<VALUE>"
```

Usa el secret en el script

```python
variable = pulumi.Config().require_secret("<SECRET_NAME>")
```

Elimina un sercret

```bash
pulumi config rm <SECRET_NAME>
```

## 📌Guardar el estado de pulumi e importarlo (copia de seguridad)

- Guardar el estado

```bash
pulumi stack export --file pulumi-backup.json
```

- Restaurar el estado

```bash
pulumi stack import --file pulumi-backup.json
```

## 📌Logging

```python
pulumi.info("message")
pulumi.info("message", resource)
pulumi.debug("hidden by default")
pulumi.warn("warning")
pulumi.error("fatal error")
```

## 📌Pulumi outputs

No confundas con los pulumi stack outputs, estos outputs se refieren a cuando generamos recursos, a las propiedades de esos recursos creados en el script.

Dentro del script debes utilizar las funciones:

<a href="https://www.pulumi.com/docs/iac/concepts/inputs-outputs/apply/" target="_blank" rel="noopener noreferrer">**`apply()`**</a> (Para un ouput)

<a href="https://www.pulumi.com/docs/iac/concepts/inputs-outputs/all/" target="_blank" rel="noopener noreferrer">**`all()`**</a> (Para varios ouputs)

## 📌Migración de un estado en pulumi cloud backend a un bucket en GCP

- Conectate a pulumi cloud backend

```bash
pulumi login
```

- Inicia el stack

```bash
pulumi new gcp-python
```

- Modifica el secret provider a modo contraseña para no tener problemas a la hora de importarlo en GCP

```bash
pulumi stack change-secrets-provider "passphrase"
# Pedirá que introduzcas la contraseña (Ej, 123)
```

- Despliega los recursos desde el estado de pulumi backend cloud

```bash
pulumi up
```

- Exporta el estado del stack a un fichero

```bash
pulumi stack export --file state.json
```

- Desconectate de pulumi backend cloud

```bash
pulumi logout
```

-  Crea el bucket <BUCKET_NAME> en GCP
- Conectate al backend indicando la url del bucket en GCP

```bash
pulumi login gs://<BUCKET_NAME>
```

- Configura las variables de entorno con la contraseña (Ej, 123) y el secret provider

```bash
export PULUMI_CONFIG_PASSPHRASE=<PASSWORD>
export PULUMI_CONFIG_SECRETS_PROVIDER=passphrase
```

- Incia un stack en el nuevo backend con el mismo nombre que tenia en pulumi cloud backend

```bash
pulumi stack init
```

- Indica el ID del proyecto en GCP en la configuración del stack

```bash
pulumi config set gcp:project <YOUR_GCP_PROJECT_ID>
```

- Importa el estado del stack

```bash
pulumi stack import --file state.json
````

- Refresca el estado

```bash
pulumi refresh
```

- Si realizas cambios en los recursos a modo de prueba, ejecuta `pulumi refresh` antes de ejecutar el plan para que identifique el cambio correctamente.

- ELimina los recursos

```bash
pulumi destroy
```

## 📌Comandos de utilidad

- Trabajar con los stacks

```bash
pulumi stack ls
pulumi stack select <STACK_NAME>
pulumi stack rm <STACK_NAME>
```

- Importar recursos al estado del stack

```bash
pulumi import gcp:storage/bucket:Bucket <NOMBRE_DEL_RECURSO_EN_PULUMI> <NOMBRE_DEL_BUCKET_EN_GCP>
# pulumi import gcp:storage/bucket:Bucket test-bucket test-company-bucket
```

- Eliminar recurso del estado

```bash
# Obtener el urn del recurso
pulumi stack export | jq '.deployment.resources[].urn'

# Eliminar recurso
pulumi state delete <URN>
# pulumi state delete urn:pulumi:dev::myproject::gcp:storage/bucket:Bucket::myBucket
# pulumi state delete urn:pulumi:dev::myproject::gcp:storage/bucket:Bucket::myBucket --force
```
