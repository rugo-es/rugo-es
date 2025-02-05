---
title: 'openssl cheatsheet'
description: 'Uso y ejemplos del comando openssl.'
pubDate: 2025-01-10
image:
    url: '/ci-cd_python_gke.svg'
    alt: 'Esquema del flujo de trabajo.'
tags: ["gcp", "gke", "gitlab", "python"]
---

## openssl

### Generar certificados autofirmados

1. Generar el root CA

```shell
# Crear la clave privada del root CA
openssl genrsa -out rootCA.key 4096

# Crear el certificado del root CA
openssl req -x509 -new -nodes -key rootCA.key -sha256 -days 3650 -out rootCA.pem -subj "/C=US/ST=California/L=San Francisco/O=MyCompany/OU=RootCA/CN=Root CA"
```

2. Generar el certificado de la CA intermedia

```bash
# Crear la clave privada de la CA intermedia
openssl genrsa -out intermediateCA.key 4096

# Crear la solicitud de certificado (CSR) para CA intermedia
openssl req -new -key intermediateCA.key -out intermediateCA.csr -subj "/C=US/ST=California/L=San Francisco/O=MyCompany/OU=IntermediateCA/CN=Intermediate CA"

# Firmar la CA intermedia con el root CA
openssl x509 -req -in intermediateCA.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out intermediateCA.pem -days 3650 -sha256
```

3. Generar el certificado final

```bash
# Crear la clave privada del certificado final
openssl genrsa -out server.key 4096

# Crear la solicitud de certificado (CSR) del certificado final
openssl req -new -key server.key -out server.csr -subj "/C=US/ST=California/L=San Francisco/O=MyCompany/OU=WebServer/CN=www.example.com"

# Firmar el certificado final con la CA intermedia
openssl x509 -req -in server.csr -CA intermediateCA.pem -CAkey intermediateCA.key -CAcreateserial -out server.crt -days 1825 -sha256
```

4. Crear la cadena de confianza

Para que los clientes confíen en el certificado final, hayq ue contacatenar la CA intermedia y el certificado final

```bash
cat server.crt intermediateCA.pem > fullchain.pem
```

Este archivo fullchain.pem se usa junto a server.key en servidores web como nginx o apache.


### Comporbar certificados locales

```shell
# Mostrar el fingerprint
openssl x509 -noout -fingerprint -sha256 -inform pem -in certificado.crt
# Output:
SHA256 Fingerprint=65:F9:4C:28:04:D9:D8:D5:8E:D5:6C:47:94:E8:A7:0C:75:D2:62:C6:16:8B:B0:65:5F:46:1F:08:74:48:F4:F8

# Mostrar las fechas de caducidad
openssl x509 -in certificado.crt -noout -dates
# Output:
notBefore=Oct 15 15:12:53 2024 GMT
notAfter=Oct 15 15:12:53 2025 GMT
```

- Comprobar certificados remotos

```shell
# Mostrar el fingerprint
echo | openssl s_client -connect 11.22.33.44:443 2>/dev/null | openssl x509 -noout -fingerprint -sha256
# Output:
SHA256 Fingerprint=65:F9:4C:28:04:D9:D8:D5:8E:D5:6C:47:94:E8:A7:0C:75:D2:62:C6:16:8B:B0:65:5F:46:1F:08:74:48:F4:F8

# Mostrar las fechas de caducidad
echo | openssl s_client -connect 11.22.33.44:443 2>/dev/null | openssl x509 -noout -dates
# Output:
notBefore=Oct 15 15:12:53 2024 GMT
notAfter=Oct 15 15:12:53 2025 GMT
```

### Certificados con formato p12

- Generar certificados

```bash
# Generar un certificado tipo p12 con certificado final y ca intermedia
openssl pkcs12 -export -out server.p12 -inkey server.key -in server.crt -certfile intermediateCA.pem

# Si no quieres indicar contraseña agrega el -passout
openssl pkcs12 -export -out server.p12 -inkey server.key -in server.crt -certfile intermediateCA.pem -passout pass:
```

- Obtener información del certificado

```bash
openssl pkcs12 -info -in server.p12

# Si no tiene contaseña agregar el flag -nodes
openssl pkcs12 -info -in server.p12 -nodes
```

- Realizar solicitudes http con certificado

```bash
curl --cert-type P12 --cert server.p12:password --cacert intermediateCA.pem https://server.com
```