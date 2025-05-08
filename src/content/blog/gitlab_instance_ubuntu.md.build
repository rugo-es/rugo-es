---
title: 'Gitlab - Instancia propia en Ubuntu'
description: 'Como instalar y primeras configuraciones de una instancia de gitlab.'
pubDate: 2025-02-12
image:
    url: '/blog/gitlab_instance_ubuntu.svg'
    alt: 'Gitlab logo'
    bgColor: '#49285a'
tags: ["ubuntu", "servidores", "git", "gitlab"]
---

## Instalar gitlab-ce

```bash
# Actualiza el sistema
sudo apt-get update

# Instala las dependencias
sudo apt-get install -y curl openssh-server ca-certificates tzdata perl

# Instala postfix SOLO si lo vas a utilizar, si usas SMTP, no lo instales
sudo apt-get install -y postfix

# Agregar el repositorio de gitlab
curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.deb.sh | sudo bash

# Revisa los locales
export LANGUAGE=en_US.UTF-8
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
locale-gen en_US.UTF-8
dpkg-reconfigure locales

# Instala gitlab
sudo apt-get install gitlab-ce
```

## Configura la entrada DNS para el servidor y el dominio asignado

En tu gestor de DNS agrega un dominio que apunte a la dirección IP de la máquina

```bash
# Agrega el dominio con https:// en external_url
nano /etc/gitlab/gitlab.rb

# Aplica los cambios en la configuración
sudo gitlab-ctl reconfigure

# Obten la contraseña temporal del usuario root
sudo cat /etc/gitlab/initial_root_password
```

## Accede a través del navegador al dominio y accede con root y la contraseña temporal

## Configuración SMTP oara el envío de correos

```bash
sudo nano /etc/gitlab/gitlab.rb
# Este es un ejemplo de gmail, pero no se recomienda usar gmail directamente, mejor utilizar un servicio como sendgrid
# La contraseña es la de app no la de la cuenta
gitlab_rails['smtp_enable'] = true
gitlab_rails['smtp_address'] = "smtp.gmail.com"
gitlab_rails['smtp_port'] = 587
gitlab_rails['smtp_user_name'] = "infosandbox1@gmail.com"
gitlab_rails['smtp_password'] = "ztjytpxcmlsash"
gitlab_rails['smtp_domain'] = "smtp.gmail.com"
gitlab_rails['smtp_authentication'] = "login"
gitlab_rails['smtp_enable_starttls_auto'] = true
gitlab_rails['smtp_tls'] = false
gitlab_rails['smtp_openssl_verify_mode'] = 'peer'
# gitlab_rails['smtp_pool'] = false

# Actualiza la configuración
sudo gitlab-ctl reconfigure

# Test de envio de correo
# Activa la consola de ruby
sudo gitlab-rails console

# Ejecuta el envío de correo de prueba
Notify.test_email('destino_de_prueba@mail.com', 'Correo de prueba', 'Si recibes este mensaje, la configuración SMTP funciona.').deliver_now
```


## Configura un runners para ejecutar las pipeline

No es aconsejable, pero podemos instalar el runner en la propia máquina de la instancia, usaremos docker para aportar mayor seguridad a la máquina host

```bash
Ejecutar el contenedor con la imagen de gitlab-runner
docker run -d --name gitlab-runner --restart always \
  -v /srv/gitlab-runner/config:/etc/gitlab-runner \
  -v /var/run/docker.sock:/var/run/docker.sock \
  gitlab/gitlab-runner:latest
```

Da de alta el runner desde el panel de administración de gitlab y obten la url y el token, debe de verse algo asi

```bash
gitlab-runner register  --url https://test-gitlab.afterbanks.com  --token glrt-t1_3ejxz1ibCyb-UBFYQyEz
```

Conectate al contenedor del runner y ejecuta el proceso de registro

```bash
docker exec -it <CONTAINER_ID> /bin/bash

# Dentro del contenedor
gitlab-runner register

Please enter the GitLab instance URL: <GITLAB_URL>
Please enter the registration token: <GITLAB_TOKEN_RUNNER>
Please enter a description for the runner: gitlab-runner-docker
Please enter tags for the runner (comma-separated): shared,docker,ci
Please enter the executor: docker
Please enter the default Docker image: ubuntu:latest

# Reinicia el contenedor
docker restart gitlab-runner

```

## Prueba el runner

Genera la pipeline y comprueba si se ejecuta correctamente

```yaml
stages:
  - test

job1:
  stage: test
  script:
    - echo "¡El Runner con Docker está funcionando!"
````
