---
title: 'CI/CD de aplicación de python en GKE'
description: 'Ejemplo del flujo de trabajo completo para desplegar una aplicación de python en un servicio GKE a través de pipeline de gitlab.'
pubDate: 2025-01-10
image:
    url: '/blog/ci-cd_python_gke.svg'
    alt: 'Esquema del flujo de trabajo.'
    bgColor: white
tags: ["gcp", "gke", "gitlab", "python"]
---

## 1. Aplicación básica de python

- Crear un entorno virtual

```bash
python3 -m venv .venv

# Activar el entorno virtual
source .venv/bin/activate
# Desactivar el entorno virtual
deactivate

# Comprobar si el entorno esta activo
which python
python --version
```

- Instalar FastAPI

```bash
pip install "fastapi[standard]"
```

- Agregar las dependencias al fichero __requeriments.txt__

```bash
pip freeze > requirements.txt
```

- Agrega el contenido a __app/main.py__

```python
"""Testing fastAPI"""
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    """Function root."""
    return {"message": "Welcome to python app - FastAPI"}

@app.get("/items/{item_id}")
async def read_item(item_id):
    """Function shows item id."""
    return {"item_id": item_id}

```

- Ejecutar la aplicación

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

- Acceder a la aplicación

http://localhost:8000

## 2. Empaquetar aplicación en una imagen docker

- Crea el archivo __Dockerfile__

```Dockerfile
FROM python:3.13-slim

WORKDIR /fastapi-app

COPY requirements.txt requirements.txt
COPY app/ app/

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

- Crea el archivo __.dockerignore__

```Dockerfile
# Entornos virtuales
__pycache__/
.venv/
# Control de versiones
.git/
.gitignore
# Otros
*.pyc
*.pyo
*.pyd
*.log
```

- Genera la imagen docker de la aplicación

Para poder ejecutar las imagenes en GCP necesitamos asegurarnos de la arquitectura de la imagen sea __linux/amd64__, por lo tanto usaremos el flag __--platform linux/amd64__ al empaquetar la aplicación.

```bash
docker build -t fastapi-app .
docker build --platform linux/amd64 -t fastapi-app:amd64 .
```

- Ejecuta un contenedor con esta imagen

```bash
docker run -d --name fastapi-container -p 9000:8000 fastapi-app
docker run -d --name fastapi-container -p 9000:8000 fastapi-app:amd64
```

- Acceder a la aplicación que se esta ejecutando en el contenedor

http://localhost:9000


## 3. Publicar imagen en Docker Hub

- Inicia sesión en Docker Hub

```bash
docker login -u [USERNAME]

# Cerrar sesión
docker logout
```

- Etiquetar la imagen

```bash
# Etiquetar la imagen ya existente
docker tag fastapi-app [USERNAME]/fastapi-app:v1.0

# Etiquetar la imagen en el build
docker build --platform linux/amd64 -t [USERNAME]/[IMAGE NAME]:[TAG] .
```

- Publica la imagen

```bash
docker push [USERNAME]/[IMAGE NAME]:[TAG]
```

- Ejecuta un contenedor con la imagen de Docker Hub

```bash
docker run -d --name fastapi-container -p 9000:8000 [USERNAME]/fastapi-app:v1.0
```


## 4. Clúster en GKE y el servicio para la aplicación

- Crear el cluster

```bash
gcloud container clusters create --machine-type=e2-small --num-nodes 1  --zone=europe-west1-b [CLUSTER NAME]
```

- Obtener las credenciales del cluster para operar y crear elementos

```bash
gcloud container clusters get-credentials [CLUSTER NAME] --zone=europe-west1-b
```

- Crear el deployment

Crea el fichero __kubernetes/deployment.yaml__ con el siguiente contenido:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: fastapi-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: fastapi-app
  template:
    metadata:
      labels:
        app: fastapi-app
    spec:
      containers:
      - name: fastapi-app
        image: "rugo0410/fastapi-app:1.0-amd64"
        ports:
        - containerPort: 8000
```

Ejecuta el comando:

```bash
kubectl create -f kubernetes/deployment.yaml
```

- Crear el service

Crea el fichero __kubernetes/service.yaml__ con el siguiente contenido:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: fastapi-app-service
spec:
  selector:
    app: fastapi-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8000
  type: LoadBalancer
```

Ejecuta el comando:

```bash
kubectl create -f kubernetes/service.yaml
```

- Eliminar service, deployment y clúster

```bash
kubectl delete -f kubernetes/deployment.yaml
kubectl delete -f kubernetes/service.yaml

gcloud container clusters delete [CLUSTER NAME]
```

### Realizar cambios en la aplicación y actualizar el clúster

- Actualizar la aplicación

Realizar los cambios en el código de la aplicación y empaquetar la nueva versión con su etiqueta correspondiente

```bash
docker build --platform linux/amd64 -t [USERNAME]/[IMAGE NAME]:[TAG] .
```

- Publicar la nueva versión

```bash
docker push [USERNAME]/[IMAGE NAME]:[TAG]
```

- Actualizar el deployment

Indicar en el fichero __kubernetes/deployment.yaml__ la nueva versión de la aplicación

```yaml
...
    spec:
      containers:
      - name: fastapi-app
        image: "[USERNAME]/[IMAGE NAME]:[TAG]"
        ports:
        - containerPort: 8000
...
```

- Aplico los cambios en el clúster

```bash
kubectl apply -f deployment.yaml
```


## 5. Pipeline en gitlab

```
stages:
  - build
  - publish
  - deploy

variables:
  DOCKERHUB_USER: [DOCKERHUB_USER]
  DOCKERHUB_PASS: [DOCKERHUB_PASS]
  IMAGE_NAME: "$DOCKERHUB_USER/fastapi-app"
  GCP_PROJECT_ID: [GCP PROJECT]
  GCP_ZONE: [GCP ZONE] # europe-west1-b

image: google/cloud-sdk:latest

before_script:
  - echo "Autenticando en Docker Hub..."
  - echo "$DOCKERHUB_PASS" | docker login -u "$DOCKERHUB_USER" --password-stdin

build_image:
  stage: build
  script:
    - echo "Construyendo la imagen Docker..."
    - docker build --platform linux/amd64 -t $IMAGE_NAME:$CI_COMMIT_SHA .
    - docker tag $IMAGE_NAME:$CI_COMMIT_SHA $IMAGE_NAME:latest
  artifacts:
    paths:
      - Dockerfile

publish_image:
  stage: publish
  script:
    - echo "Subiendo la imagen a Docker Hub..."
    - docker push $IMAGE_NAME:$CI_COMMIT_SHA
    - docker push $IMAGE_NAME:latest

deploy_to_gke:
  stage: deploy
  before_script:
    - echo "Autenticando en GCP..."
    - echo "$GCP_SA_KEY" | base64 -d > /tmp/gcp-key.json
    - gcloud auth activate-service-account --key-file=/tmp/gcp-key.json
    - gcloud config set project $GCP_PROJECT
    - gcloud container clusters get-credentials $GCP_CLUSTER --zone $GCP_ZONE
    - rm /tmp/gcp-key.json
  script:
    - echo "Actualizando el despliegue en GKE..."
    - kubectl set image deployment/my-deployment my-container=$IMAGE_NAME:$CI_COMMIT_SHA
    - kubectl rollout status deployment/my-deployment
```
