---
title: 'Pulumi - Get started'
description: 'Primeros pasos con esta herramienta de IaC.'
pubDate: 2025-02-06
image:
    url: '/blog/get-started_pulumi.svg'
    alt: 'Pulumi logo'
    bgColor: '#49285a'
tags: ["pulumi", "python", "gcp", "cloud", "iac"]
---
Pulumi es una herramienta que permite administrar infraestructura como código (IaC), principalmente en servicios cloud (AWS, GCP y Azure) y en kubernetes.

## Instalación (Ubuntu)

```bash
curl -fsSL https://get.pulumi.com | sh

# Agregar al PATH
export PATH=$PATH:/root/.pulumi/bin
```

## Primeros pasos

- Comprobar la versión instalada

```bash
pulumi version
```

- Comandos principales

```bash
pulumi new # Crea un nuevo proyecto usando un template
pulumi stack # Administra tus stacks
pulumi config # Configura variables como claves, regiones, etc.
pulumi up # Vista previa e implementación de cambios
pulumi preview # Vista previa de los cambios
pulumi destroy # Elimina tu programa y su infraestructura
```

## Pulumi & GCP (Usando python)

- Configurar Pulumi para acceder a tu cuenta de GCP

Instalar gcloud CLI y configurar la cuenta.

Obtener las credenciales de aplicación predeterminadas que Pulumi utiliza, para obtener las de la cuenta de google ejecutar el comando:

```bash
gcloud config set project [YOUR_GCP_PROJECT_ID]

# Generar el fichero de credenciales de aplicación predeterminadas
gcloud auth application-default login
```

- Crear el proyecto

Para inicializar un proyecto __es necesario tener una cuenta en Pulumi__, cuando inicies el proyecto en local, pedirá las credenciales a través del navegador o un token de acceso.

```bash
mkdir quickstart && cd quickstart
pulumi new gcp-python
# Indicar el token o login a través del navegador
```

Esto genera el stack en la plataforma de pulumi y los ficheros de configuración básica para dar de alta un bucket en GCP

- Despliegue de infraestructura

```bash
pulumi up
# Se visualizan los elementos que se van a crear y solicita confirmación

# Puedes recuperar el nombre del bucket que se ha definido como output
pulumi stack output bucket_name # gs://test-bucket-f4c685a
```

- Actualizaciones de infraestructura

Agregar el fichero __index.html__ al directorio principal del proyecto.

```html
<html>
<body>
<h1>Hello, Pulumi!</h1>
</body>
</html>
```

Agregar el fichero al bucket y las políticas de acceso al fichero

```python
bucket_object = storage.BucketObject(
    "index.html", bucket=bucket.name, source=pulumi.FileAsset("index.html")
)

bucket_iam_binding = storage.BucketIAMBinding(
    "my-bucket-binding",
    bucket=bucket.name,
    role="roles/storage.objectViewer",
    members=["allUsers"],
)
```

- Despliegue de los cambios

```bash
pulumi up
# Confirma los cambios

# Muestra los ficheros del bucket
gsutil ls $(pulumi stack output bucket_name)
```

- Ahora agregaremos la configuración para poder servir el __index.html__ como una web desde el bucket

Agrega la directiva __website__ y __uniform_bucket_level_access__ en la definición del bucket y exporta la url de acceso a la web

```python
# Definición del bucket
bucket = storage.Bucket(
  'test-bucket',
  location="EU",
  website={
        "main_page_suffix": "index.html"
    },
    uniform_bucket_level_access=True,
)

# Exportar la url de la web
pulumi.export(
    "bucket_endpoint",
    pulumi.Output.concat(
        "http://storage.googleapis.com/", bucket.id, "/", bucket_object.name
    ),
)
```

- Actualiza los cambios

```bash
pulumi up
```

- Prueba el sitio web

```bash
curl $(pulumi stack output bucket_endpoint)
```

Obtendremos el contenido de index.html

```html
<html>
<body>
<h1>Hello, Pulumi!</h1>
</body>
</html>
```

- Elimina el stack

```bash
pulumi destroy
```

- Repositorio de paquetes

https://www.pulumi.com/registry/