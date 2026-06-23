---
title: 'Zsh y OhMyZsh'
description: 'Configuración de Zsh y OhMyZsh en Ubuntu, además, implementación de plugins y personalización del prompt con el tema powerlevel10k.'
pubDate: 2025-08-01
image:
    url: '/blog/zsh_on_wsl.png'
    alt: 'zsh and ohmyzsh logo.'
    bgColor: '#111211'
tags: ["bash", "ubuntu", "shell", "servidor"]
---


## <span class="emoji">📋</span>Tabla de contenido

- [Introducción](#introducción)
- [Enlaces de interés](#enlaces-de-interés)
- [Instalación de Zsh](#instalación-de-zsh)
- [Instalación de plugins (zsh-autosuggestions)](#instalación-de-plugins-zsh-autosuggestions)
- [Instalación de OhMyZsh y el tema Powerlevel10k](#instalación-de-ohmyzsh-y-el-tema-powerlevel10k)
- [Personalización del prompt](#personalización-del-prompt)
- [Cambiar la terminal por defecto en vscode](#cambiar-la-terminal-por-defecto-en-vscode)
- [Alias de OhMyZsh](#alias-de-ohmyzsh)
- [Actualizar Zsh y OhMyZsh](#actualizar-zsh-y-ohmyzsh)
- [Desinstalar Zsh](#desinstalar-zsh)

## <span class="emoji">🌅</span>Introducción

Instalación y configuración de Zsh, OhMyZsh y personalización del prompt.

## <span class="emoji">🌍</span>Enlaces de interés

- <a href="https://www.zsh.org/" target="_blank" rel="noopener noreferrer">Zsh</a>  
- <a href="https://ohmyz.sh/" target="_blank" rel="noopener noreferrer">OhMyZsh</a>  
- <a href="https://github.com/romkatv/powerlevel10k" target="_blank" rel="noopener noreferrer">Powerlevel10k</a>  
- <a href="https://github.com/zsh-users/zsh-autosuggestions" target="_blank" rel="noopener noreferrer">zsh-autosuggestions</a>


## <span class="emoji">📌</span>Instalación de Zsh

Zsh es un shell de línea de comandos para sistemas Unix que extiende las funcionalidades del Bourne Shell (sh) con características avanzadas como autocompletado inteligente, corrección de errores de tipeo, soporte para plugins y temas, y una gran personalización.

Desde la terminal de Ubuntu:

Actualiza los paquetes del sistema

```sh
sudo apt update && sudo apt upgrade -y
```

Instala Zsh

```sh
sudo apt install zsh -y
```

Verifica la instalación de Zsh

```sh
zsh --version
```

Actualiza el shell por defecto

```sh
chsh -s $(which zsh)
```

Cierra el terminal y vuelve a abrir Ubuntu (Deberia abrir zsh por defecto)

## <span class="emoji">📌</span>Instalación de plugins (zsh-autosuggestions)

El plugin zsh-autosuggestions es una extensión para el shell Zsh que sugiere comandos automáticamente mientras escribes, basándose en tu historial de comandos. Cuando sugiere un comando basta con pulsar la tecla de dirección derecha (➡️) para realizar el autocompletado.

Instala el plugins

```sh
git clone https://github.com/zsh-users/zsh-autosuggestions.git $ZSH_CUSTOM/plugins/zsh-autosuggestions
```

Abre la configuración de Zsh

```sh
nano ~/.zshrc
```

Actualiza la configuración de Zsh para admitir el plugin

```sh
# Busca esta línea: 
plugins=(git)
# Agrega el plugin a la lista
plugins=(git zsh-autosuggestions)
```

Aplica los cambios

```sh
source ~/.zshrc
```

## <span class="emoji">📌</span>Instalación de OhMyZsh y el tema Powerlevel10k

OhMyZsh es una colección de configuraciones, temas y complementos para Zsh que mejora la experiencia en la línea de comandos, haciéndola más productiva, personalizable y atractiva visualmente.

Instala OhMyZsh

```sh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```
Instala un tema (Powerlevel10k)

<a href="https://github.com/ohmyzsh/ohmyzsh/wiki/themes" target="_blank" rel="noopener noreferrer">Más temas para OhMyZsh</a> 

```sh
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git \
  ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

Edita el tema por defecto de OhMyZsh, abre el fichero de configuración de Zsh

```sh
nano ~/.zshrc
```

Modifica la siguiente línea

```sh
# esto:
ZSH_THEME="robbyrussell"
# por esto:
ZSH_THEME="powerlevel10k/powerlevel10k"
```

Aplica los cambios

```sh
source ~/.zshrc
```

Configura el tema a tu gusto.

## <span class="emoji">📌</span>Personalización del prompt

Para personalizar el prompt puede ser interesante consultar los <a href="https://upload.wikimedia.org/wikipedia/commons/1/15/Xterm_256color_chart.svg" target="_blank" rel="noopener noreferrer">códigos de colores</a> disponibles y <a href="https://es.piliapp.com/emoji/list/" target="_blank" rel="noopener noreferrer">emojis</a>.

Para hacer un campo personalizado para el prompt se definen funciones cuyo nombre debe comenzar por **`prompt_*`**, en este ejemplo, definiremos funciones para mostrar el nombre de usuario con el del host y el directorio actual, ambos con emojis.

Abre el fichero de configuración del tema (Powerlevel10k)

```sh
nano ~/.p10k.zsh
```

Inserta al final el siguiente contenido

```sh
# ╭────────────────────────────────────────────────────────────╮
# │ Custom segment: 🤖 user@host                               │
# ╰────────────────────────────────────────────────────────────╯
function prompt_my_userhost() {
  local user=$USER
  local host=$(hostname)
  local icon="🤖" 
  p10k segment -f 178 -t "$icon $user@$host" 
  }
# ╭────────────────────────────────────────────────────────────╮
# │ Custom segment: 📂 dir_name                                │
# ╰────────────────────────────────────────────────────────────╯
function prompt_my_dir() {
  local dir_name="${PWD##*/}"
  p10k segment -f 39 -t "📂 $dir_name"
}
```

Busca la siguiente directiva dentro de la configuración del tema y agrega los campos personalizados

```sh
typeset -g POWERLEVEL9K_LEFT_PROMPT_ELEMENT
(
  # os_icon               # os identifier                            
  my_userhost             # user@host                  
  my_dir                  # custom current directory             
  # dir                     # current directory                         
  vcs                     # git status                                            
  prompt_char             # prompt symbol                                  
)  
```

Puedes personalizar la sección del control de versiones, por ejemplo, agregar un emoji (🌿) junto al nombre de la rama

```sh
typeset -g POWERLEVEL9K_VCS_BRANCH_ICON='🌿 '
```

También puedes cambiar el icono y el color del prompt de shell

```sh
typeset -g POWERLEVEL9K_PROMPT_CHAR_{OK,ERROR}_VIINS_CONTENT_EXPANSION='$'
# Para cambiar los colores busca las directivas que correspondan al siguiente patrón
typeset -g POWERLEVEL9K_PROMPT_CHAR_*
```

Guarda el fichero y aplica los cambios

```sh
source ~/.p10k.zsh
```

## <span class="emoji">📌</span>Cambiar la terminal por defecto en vscode

**`Ctrl + Shift + P`**  
Terminal: Select Default Profile 

## <span class="emoji">📌</span>Alias de OhMyZsh

OhMyZsh proporciona una lista amplia de alias, mayormente para trabajar con git o para trabajar con directorios, consulta la lista completa una vez instalado con `alias` y para consultar directamente que hace un alias `which $ALIAS`

Estos son algunos ejemplos:

```sh
# Alias para el sistema
_='sudo '
1='cd -1'
2='cd -2'
...
9='cd -9'
l='ls -lah'
la='ls -lAh'
ll='ls -lh'
ls='ls --color=tty'
lsa='ls -lah'
md='mkdir -p'
rd=rmdir
# Alias para git
g=git
ga='git add'
gb='git branch'
gbD='git branch --delete --force'
gcf='git config --list'
gcmsg='git commit --message'
gd='git diff'
gf='git fetch'
ggpush='git push origin "$(git_current_branch)"'
glo='git log --oneline --decorate'
glog='git log --oneline --decorate --graph'
gp='git push'
grhh='git reset --hard'
grm='git rm'
gst='git status'
``` 

## <span class="emoji">📌</span>Actualizar Zsh y OhMyZsh

```sh
# Actualizar Zsh
sudo apt update && sudo apt upgrade zsh
# Actualizar OhMyZsh
omz update
``` 

## <span class="emoji">📌</span>Desinstalar Zsh

```sh
# Desinstalar Zsh
sudo apt --purge remove zsh
# Configurar por defecto la shell bash de Ubuntu
chsh -s `which bash`
```
