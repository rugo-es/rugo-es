---
title: 'Pulumi (Introducción)'
description: 'Primeros pasos con esta herramienta de IaC.'
pubDate: 2025-02-06
image:
    url: '/blog/pulumi.png'
    alt: 'Pulumi logo'
    bgColor: '#371a47'
tags: ["pulumi", "python", "gcp", "cloud", "iac"]
---

## <span class="emoji">📋</span>Tabla de contenido

- [Introducción](#introducción)
- [Enlaces de interés](#enlaces-de-interés)
- [Instalación](#instalación)
- [Get started](#get-started)
- [Backend al que estoy conectado actualmente](#backend-al-que-estoy-conectado-actualmente)
- [Administración de stacks](#administración-de-stacks)
- [Namespaces en la configuración del stack](#namespaces-en-la-configuración-del-stack)
- [Nombre del stack dentro del script](#nombre-del-stack-dentro-del-script)
- [Stack outputs](#stack-outputs)
- [Pulumi outputs](#pulumi-outputs)
- [Config secrets](#config-secrets)
- [Backup del estado de pulumi](#backup-del-estado-de-pulumi)
- [Importar recursos al estado](#importar-recursos-al-estado)
- [Eliminar recurso del estado](#eliminar-recurso-del-estado)
- [Migración de un estado desde Pulumi platform a GCP](#migración-de-un-estado-desde-pulumi-platform-a-gcp)
- [Diferencias entre recursos (Pulumi state vs GCP)](#diferencias-entre-recursos-pulumi-state-vs-gcp)
- [Diferencias entre la configuración de un bucket (Pulumi vs GCP)](#diferencias-entre-la-configuración-de-un-bucket-pulumi-vs-gcp)
- [Listado de imágenes de SO para seleccionar en VMs](#listado-de-imágenes-de-so-para-selecccionar-en-vms)
- [Logging](#logging)

## <span class="emoji">🌅</span>Introducción

<a href="https://www.pulumi.com/" target="_blank" rel="noopener noreferrer">**Pulumi**</a> es una plataforma de "Infrastructure as Code" (IaC) que permite crear, desplegar y gestionar infraestructura en la nube usando lenguajes de programación convencionales como JavaScript, TypeScript, Python, Go, C#, Java, y otros.

En lugar de usar lenguajes declarativos como YAML o HCL (Terraform), Pulumi te deja describir la infraestructura con el mismo lenguaje que usas para programar aplicaciones, lo que te da acceso a:

- Variables, funciones y bucles.
- Librerías y paquetes externos.
- Tipado estático (según el lenguaje).
- Reutilización y modularidad de código.

### Comandos principales

```sh
pulumi new # Crea un nuevo proyecto usando un template
pulumi stack # Administra tus stacks
pulumi config # Configura variables como claves, regiones, etc.
pulumi up # Vista previa e implementación de cambios
pulumi preview # Vista previa de los cambios
pulumi destroy # Elimina tu programa y su infraestructura
```

## <span class="emoji">🌍</span>Enlaces de interés

- <a href="https://www.pulumi.com/docs/iac/get-started/" target="_blank" rel="noopener noreferrer">Pulumi Get Started</a>  
- <a href="https://www.pulumi.com/docs/iac/concepts/" target="_blank" rel="noopener noreferrer">Pulumi Concepts</a>  
- <a href="https://www.pulumi.com/registry/" target="_blank" rel="noopener noreferrer">Pulumi Registry</a>  
- <a href="https://www.pulumi.com/docs/iac/using-pulumi/" target="_blank" rel="noopener noreferrer">Using Pulumi</a>

## <span class="emoji">🛠️</span>Instalación

<a href="https://www.pulumi.com/docs/iac/download-install/" target="_blank" rel="noopener noreferrer">Guía oficial de instalación</a>

### Instalación en Ubuntu

```sh
curl -fsSL https://get.pulumi.com | sh
# Agregar al PATH
export PATH=$PATH:/root/.pulumi/bin
```

Comprobar la versión instalada:

```sh
pulumi version
```

## <span class="emoji">🚀</span>Get started

En este ejemplo para iniciarte con pulumi, vas a configurar el entorno necesario para crear un bucket en GCP, agregarle un fichero, actualizar los recursos, acceder al fichero mediante su url y eliminarlo todo.

Para trabajar con pulumi para generar recursos en GCP con python es necesario instalar:

- <a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer">python</a>
- <a href="https://cloud.google.com/sdk/docs/install?hl=es-419" target="_blank" rel="noopener noreferrer">gcloud CLI</a>
- <a href="https://www.pulumi.com/docs/iac/download-install/" target="_blank" rel="noopener noreferrer">pulumi</a>

El primer paso será configurar gcloud, para trabajar en tus proyectos.  

```sh
# Realiza el login con tu usuario de GCP
gcloud auth login
# Verifica que te has identificado correctamente
gcloud auth list
# Muestra la lista de proyectos que tienes disponible con tu usuario
gcloud projets list
# Configura gcloud para trabajar con el proyecto donde quieres generar los recursos
gcloud config set project $PROJECT_ID
# Muestra la configuración de gcloud para asegurarte que has seleccionado el proyecto deseado
gcloud config list
```

Pulumi requiere credenciales de aplicación predeterminadas para interactuar con los recursos de GCP.

```sh
gcloud auth application-default login
```

Desconectate de tu backend actual (si es que estas conectado)

```sh
pulumi logout
```

Conectate a un backend de pulumi, normalmente deberías usar un bucket, puedes consultar las opciones disponibles con **`pulumi login --help`**, en este ejemplo usarás como backend un archivo local:

```sh
pulumi login --local
```

Crea un directorio de trabajo

```sh
mkdir pulumi-get-started && cd pulumi-get-started
```

Crea un nuevo proyecto de pulumi indicando el runtime (python), el nombre del proyecto (my-python-project), la descripción (Mi proyecto de pulumi y python) y el nombre del stack (dev)

```sh
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

```sh
echo "pulumi_gcp>8.0.0,<9.0.0" >> requirements.txt
pulumi install
```

Agrega a la configuración del proyecto de pulumi el proyecto de GCP donde quieres crear los recursos:

```sh
pulumi config set gcp:project $PROJECT_ID
```

Modifica el archivo **`__main__.py`** con el siguiente contenido para crear un bucket y exportar como un output la url del bucket:

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

```sh
# Ejecuta el script de pulumi
pulumi up
# Muestra la url del bucket creado
pulumi stack output bucket_name
```

Crea un fichero **`index.html`** en el directorio de trabajo con el siguiente contenido:

```html
<html>
<body>
<h1>Hello, Pulumi!</h1>
</body>
</html>
```

Modifica **`__main__.py`** para que agregue **`index.html`** al bucket y asigna permisos al bucket para hacerlo público:

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

Actualiza los recursos en GCP ejecutando el script de pulumi y muestra los ficheros del bucket con **`gsutil`** para asegurarte de que el fichero se cargo correctamente:

```sh
# Actualiza los recursos ejecutando el script de pulumi
pulumi up
# Comprueba que se ha cargado el fichero correctamente
gsutil ls $(pulumi stack output bucket_name)
```

Agrega al programa la directiva **`website`** y **`uniform_bucket_level_access`** en la definición del bucket y exporta la url de acceso a la web:

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

```sh
pulumi up
```

Accede al sitio web que se ha creado en el bucket de GCP:

```sh
curl $(pulumi stack output bucket_endpoint)
```

Obtendrás el contenido de **`index.html`**

```html
<html>
<body>
<h1>Hello, Pulumi!</h1>
</body>
</html>
```

Elimina el stack y los recursos generados en la prática.

```sh
pulumi destroy
```

## <span class="emoji">📌</span>Backend al que estoy conectado actualmente

```sh
pulumi whoami --verbose
```


## <span class="emoji">📌</span>Administración de stacks

```sh
pulumi stack ls
pulumi stack init $STACK_NAME
pulumi stack select $STACK_NAME
pulumi stack rm $STACK_NAME
```

## <span class="emoji">📌</span>Namespaces en la configuración del stack

Definir las diferentes configuraciones

```sh
# Configurar variables para GCP
pulumi config set gcp:project $PROJECT_NAME
# Configurar variables en el namespace por defecto
pulumi config set $CONFIG_NAME $CONFIG_VALUE
```

Acceder a las configuraciones dentro del script

```python
from pulumi import Config
config = Config()
config_gcp = Config("gcp")
```

## <span class="emoji">📌</span>Nombre del stack dentro del script

```python
import pulumi
current_stack = pulumi.get_stack()
pulumi.export("current_stack", current_stack)
```


## <span class="emoji">📌</span>Stack outputs

Son las salidas de información que indicamos en los scripts con la función de **`pulumi.export()`**.  
Estos son los comandos principales para administrar los outputs:

```sh
pulumi stack output
pulumi stack output --show-secrets
```

## <span class="emoji">📌</span>Pulumi outputs

No confundas con los pulumi stack outputs (exports), son las propiedades de los recursos que se crean dentro del script, puede que necesites alguna propiedad del recurso que determine como tiene que generarse otro recurso. Para poder acceder a estas propiedades se utilizan las siguientes funciones:

<a href="https://www.pulumi.com/docs/iac/concepts/inputs-outputs/apply/" target="_blank" rel="noopener noreferrer">**`apply()`**</a> (Para un ouput)

<a href="https://www.pulumi.com/docs/iac/concepts/inputs-outputs/all/" target="_blank" rel="noopener noreferrer">**`all()`**</a> (Para varios ouputs)

## <span class="emoji">📌</span>Config secrets

Un secret es un valor que se guarda encriptado en el stack de pulumi (stackname.yaml).

Crea un secret (Config)

```sh
pulumi config set --secret $SECRET_NAME "$VALUE"
```

Usa el secret en el script

```python
secret_value = pulumi.Config().require_secret("$SECRET_NAME")
```

Elimina un sercret

```sh
pulumi config rm $SECRET_NAME
```

## <span class="emoji">📌</span>Backup del estado de pulumi

Guardar el estado

```sh
pulumi stack export --file pulumi-backup.json
```

Restaurar el estado

```sh
pulumi stack import --file pulumi-backup.json
```

## <span class="emoji">📌</span>Importar recursos al estado

En la documentación del propio recurso en el registry de pulumi te indica como importar cada uno de los recursos.  
Sintaxis básica:

```sh
pulumi import -y $TYPE $RESOURCE_NAME $GCP_ID
```

Ejemplos:

```sh
# Importar un Project
pulumi import -y gcp:organizations/project:Project project-my-project my-project
# Importar un MonitoredProject
pulumi import -y gcp:monitoring/monitoredProject:MonitoredProject monitoredProject-my-project v1/locations/global/metricsScopes/project-global-monitoring/projects/my-project
# Importar un Service (API)
pulumi import -y gcp:projects/service:Service service-my-proyect-iam my-project/iam.googleapis.com
# Importar un IAMMember
pulumi import -y gcp:projects/iAMMember:IAMMember iamMember-my-project-viewer-user@mail.com "projects/my-project roles/viewer user:user@mail.com"
```

## <span class="emoji">📌</span>Eliminar recurso del estado

```sh
# Obtener el urn del recurso
pulumi stack export | jq '.deployment.resources[].urn'
# Eliminar recurso
pulumi state delete $URN
# pulumi state delete urn:pulumi:dev::myproject::gcp:storage/bucket:Bucket::myBucket
# pulumi state delete urn:pulumi:dev::myproject::gcp:storage/bucket:Bucket::myBucket --force
```

## <span class="emoji">📌</span>Migración de un estado desde Pulumi platform a GCP

Conectate a pulumi cloud backend

```sh
pulumi login
```

Inicia el stack

```sh
pulumi new gcp-python
```

Modifica el secret provider a modo contraseña para no tener problemas a la hora de importarlo en GCP

```sh
pulumi stack change-secrets-provider "passphrase"
# Pedirá que introduzcas la contraseña (Ej, 123)
```

Despliega los recursos desde el estado de pulumi backend cloud

```sh
pulumi up
```

Exporta el estado del stack a un fichero

```sh
pulumi stack export --file state.json
```

Desconectate de pulumi backend cloud

```sh
pulumi logout
```

Crea el bucket $BUCKET_NAME en GCP y conectate al backend indicando la url del bucket

```sh
pulumi login gs://$BUCKET_NAME
```

Configura las variables de entorno con la contraseña (Ej, 123) y el secret provider

```sh
export PULUMI_CONFIG_PASSPHRASE=$PASSWORD
export PULUMI_CONFIG_SECRETS_PROVIDER=passphrase
```

Incia un stack en el nuevo backend con el mismo nombre que tenia en pulumi cloud backend

```sh
pulumi stack init
```

Indica el ID del proyecto en GCP en la configuración del stack

```sh
pulumi config set gcp:project $PROJECT_ID
```

Importa el estado del stack

```sh
pulumi stack import --file state.json
```

Refresca el estado

```sh
pulumi refresh
```

Si realizas cambios en los recursos a modo de prueba, ejecuta **`pulumi refresh`** antes de ejecutar el plan para que identifique el cambio correctamente.

Elimina los recursos

```sh
pulumi destroy
```

## <span class="emoji">📌</span>Diferencias entre recursos (Pulumi state vs. GCP)

Muestra las diferencias en detalle encontradas entre el estado actual de pulumi y los recursos de GCP.

```sh
pulumi preview --diff
```

## <span class="emoji">📌</span>Diferencias entre la configuración de un bucket (Pulumi vs. GCP)

```sh
# Descargar a un fichero el estado de pulumi
pulumi stack export > pulumi-state.json
# Descargar la configuración de GCP
gcloud storage buckets describe gs://nexe_filestore --format=json > gcp-bucket.json
```

## <span class="emoji">📌</span>Listado de imágenes de SO para selecccionar en VMs

```sh
# Ver imágenes disponibles (listado completo)
gcloud compute images list
# Filtrar imágenes de ubuntu
gcloud compute images list --project=ubuntu-os-cloud --no-standard-images
# Filtrar imágenes de ubuntu 24
gcloud compute images list --project=ubuntu-os-cloud --no-standard-images --filter="name:ubuntu-2404*"
```

## <span class="emoji">📌</span>Logging

```python
pulumi.info("message")
pulumi.info("message", resource)
pulumi.debug("hidden by default")
pulumi.warn("warning")
pulumi.error("fatal error")
```
