---
title: 'Cliamp (Introducción)'
description: 'EL reproductor de música definitivo.'
pubDate: 2026-05-27
image:
    url: '/blog/cliamp.png'
    alt: 'Pulumi logo'
    bgColor: '#0e0911'
tags: ["linux", "bash"]
---

## <span class="emoji">📋</span>Tabla de contenido

- [Introducción](#introducción)
- [Enlaces de interés](#enlaces-de-interés)
- [Instalación](#instalación)
- [Get started](#get-started)

## <span class="emoji">🌅</span>Introducción

<a href="https://www.cliamp.stream/" target="_blank" rel="noopener noreferrer">**Cliamp**</a> es un reproductor de música para la terminal inspirado en el clásico Winamp de los años 90, soporta streaming de: YouTube, Spotify, SoundCloud, radios online... está **escrito en Go** y es bastante popular últimamente en la comunidad de herramientas terminal (TUI).

### Comandos principales

```sh
cliamp help # Documentación de cliamp
cliamp # Abrir el reproductor
cliamp setup # Configuración de providers
cliamp playlist # Administrar listas de reproducción de cliamp
cliamp https://youtube.com?playlist=xxxx # Abrir una lista de reproducción de Youtube en cliamp
```

## <span class="emoji">🌍</span>Enlaces de interés

- <a href="https://www.cliamp.stream/" target="_blank" rel="noopener noreferrer">Climap homepage</a>
- <a href="https://www.cliamp.stream/#install" target="_blank" rel="noopener noreferrer">Instalación de cliamp</a>
- <a href="https://github.com/bjarneo/cliamp" target="_blank" rel="noopener noreferrer">Github</a>

## <span class="emoji">🛠️</span>Instalación

```sh
curl -fsSL https://raw.githubusercontent.com/bjarneo/cliamp/HEAD/install.sh | sh
```

## <span class="emoji">📌</span>Administrador de playlists de Youtube con Fuzzy Finder

Este script carga las listas de reproducción de Youtube configuradas para seleccionarlas de manera sencilla a través de un menú interactivo en la terminal. Agrega el siguiente contenido a **/usr/local/bin/{command}**, el comando que voy a utilizar es `music`.

```bash
#!/bin/bash

# fzf - Fuzzy Finder
# Install: sudo apt install fzf

# Playlist data: name|url
declare -a PLAYLISTS=(
    "LoFi|https://www.youtube.com/playlist?list=PL0riZiugTLU9cYp92TLUIlpR6sXXTgG8r"
    "Rock|https://www.youtube.com/playlist?list=PL0riZiugTLU9iE4uHcxCaa_falo_CDICV"
)

# Check fzf installed
if ! command -v fzf &> /dev/null; then
    echo "❌ ERROR: fzf not installed"
    exit 1
fi

while true; do
    clear
    options=()
    for playlist in "${PLAYLISTS[@]}"; do
        IFS='|' read -r name url <<< "$playlist"
        options+=("$name")
    done
    selected=$(printf '%s\n' "${options[@]}" | fzf \
        --height=40% \
        --border=rounded \
        --prompt="🎵 Select playlist > " \
        --header=$'Use the ↑↓ keys or type to search\nType Esc or Ctrl+C to exit\n─────────────────────────────────' \
        --color="fg:#ffffff,bg:#000000,hl:#5fff87" \
        --color="fg+:#ffffff,bg+:#262626,hl+:#5fff87" \
        --color="info:#af87ff,prompt:#5fff87,pointer:#ff87d7" \
        --pointer="▶" \
        --reverse)

    if [[ -z "$selected" ]]; then
        clear
        exit 0
    fi

    for playlist in "${PLAYLISTS[@]}"; do
        IFS='|' read -r name url <<< "$playlist"
        if [[ "$name" == "$selected" ]]; then
            cliamp --repeat all --auto-play --shuffle "$url"
            break
        fi
    done
done
```

Asigna permisos de ejecución al archivo

```sh
sudo chmod +x /usr/local/bin/music
```

Ejecuta el comando `music` para abrir el menú y seleccionar una lista de reproducción de Youtube.

```sh
music
```
![Playlist menu](/blog/cliamp-001.png)

Enjoy it 🎵🥳.

![Cliamp player](/blog/cliamp-002.png)
