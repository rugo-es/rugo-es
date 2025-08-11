---
title: 'Zsh en WSL (Windows Subsystem for Linux)'
description: 'Instalación de Zsh y Oh My Zsh en WSL en un entorno con Ubuntu, además, implementación de plugins y personalización del prompt con el tema powerlevel10k.'
pubDate: 2025-08-01
image:
    url: '/blog/zsh_on_wsl.png'
    alt: 'zsh and ohmyzsh logo.'
    bgColor: '#293036'
tags: ["bash", "ubuntu", "shell", "servidor"]
---


## <span class="emoji">📋</span>Tabla de contenido

- [Introducción](#introducción)
- [Enlaces de interés](#enlaces-de-interés)
- [Instalación de Ubuntu en WSL](#instalación-de-ubuntu-en-wsl)
- [Instalación de Zsh](#instalación-de-zsh)
- [Instalación de plugins (zsh-autosuggestions)](#instalación-de-plugins-zsh-autosuggestions)
- [Instalación de Oh My Zsh y el tema Powerlevel10k](#instalación-de-oh-my-zsh-y-el-tema-powerlevel10k)
- [Personalización del prompt](#personalización-del-prompt)
- [Cambiar la terminal por defecto en vscode](#cambiar-la-terminal-por-defecto-en-vscode)
- [Configuración de git](#configuración-de-git)
- [Alias de Oh My Zsh](#alias-de-oh-my-zsh)
- [Actualizar Zsh y Oh My Zsh](#actualizar-zsh-y-oh-my-zsh)
- [Desinstalar Zsh](#desinstalar-zsh)

## <span class="emoji">🌅</span>Introducción

Tenemos el siguiente escenario, trabajamos en un Windows 11 que tiene instalado WSL y queremos utilizar un shell de Linux en lugar de powershell. Vamos a instalar Ubuntu bajo el WSL y configuraremos el entorno para trabajar con Zsh, instalaremos Oh My Zsh y personalizaremos el prompt.

## <span class="emoji">🌍</span>Enlaces de interés

- <a href="https://www.zsh.org/" target="_blank" rel="noopener noreferrer">Zsh</a>  
- <a href="https://ohmyz.sh/" target="_blank" rel="noopener noreferrer">Oh My Zsh</a>  
- <a href="https://github.com/romkatv/powerlevel10k" target="_blank" rel="noopener noreferrer">Powerlevel10k</a>  
- <a href="https://github.com/zsh-users/zsh-autosuggestions" target="_blank" rel="noopener noreferrer">zsh-autosuggestions</a>


## <span class="emoji">📌</span>Instalación de Ubuntu en WSL

- Abre Microsoft Store y busca "Ubuntu"
- Pulsa en Obtener/Instalar una distro de Ubuntu (Ej: Ubuntu 24.04 LTS)
- Abrir la terminal de la versión de Ubuntu instalada:
  1. Desde el menú de inicio, busca "Ubuntu"
  2. o desde powershell
```sh
wsl --list --verbose # (Para ver la distribución instalada)
wsl -d Ubuntu-24.04
```
- Al abrir Ubuntu por primera vez, te pedirá que asignes un nombre de usuario y contraseña


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

El plugin zsh-autosuggestions es una extensión para el shell Zsh que sugiere comandos automáticamente mientras escribes, basándose en tu historial de comandos o en comandos previos. Cuando sugiere un comando basta con pulsar la tecla de dirección derecha (➡️) para realizar el autocompletado.

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

## <span class="emoji">📌</span>Instalación de Oh My Zsh y el tema Powerlevel10k

Oh My Zsh es una colección de configuraciones, temas y complementos para Zsh que mejora la experiencia en la línea de comandos, haciéndola más productiva, personalizable y atractiva visualmente.

Instala Oh My Zsh

```sh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```
Instala un tema (Powerlevel10k)

<a href="https://github.com/ohmyzsh/ohmyzsh/wiki/themes" target="_blank" rel="noopener noreferrer">Más temas para Oh My Zsh</a> 

```sh
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git \
  ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

Edita el tema por defecto de Oh My Zsh, abre el fichero de configuración de Zsh

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


## <span class="emoji">📌</span>Configuración de git

Dentro de el sistema de Ubuntu se montan particiones que enlazan directamente a los archivos de Windows, normalmente **`/mnt/c`** o **`/mnt/d`**, para poder disfrutar de nuestra configuración de git del equipo host dentro de Ubuntu hay que hacer algunas configuraciones extras.

Copia las claves y configuración ssh a tu entorno de Ubuntu

```sh
ln -s /mnt/c/Users/$USUARIO/.gitconfig ~/.gitconfig
cp /mnt/c/Users/$USUARIO/.ssh/* ~/.ssh/
``` 

Para no tener problemas con los saltos de líneas (^M):

Cuando abrás un proyecto desde Ubuntu y compruebes con git los cambios en los ficheros, normalmente mostrará un cambio en los saltos de línea, ya que Windows (CRLF) y Ubuntu (LF) lo gestionan de manera diferente.

Cambia la configuración en git desde Ubuntu

```sh
git config core.autocrlf false
git config core.eol lf

git add --renormalize .
git status
```

También puede cambiar la gestión de los saltos de línea en vscode   

- Abre un archivo donde aparece ^M (git diff) 
- Busca en la barra inferior de vscode a la derecha: verás algo como CRLF o LF.
- Haz clic en CRLF → selecciona LF.
- Guarda el archivo (Ctrl + S).

## <span class="emoji">📌</span>Alias de Oh My Zsh

Oh My Zsh proporciona una lista amplia de alias, mayormente para trabajar con git o para trabajar con directorios, consulta la lista completa una vez instalado con `alias` y para consultar directamente que hace un alias `which $ALIAS`

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

## <span class="emoji">📌</span>Actualizar Zsh y Oh My Zsh

```sh
# Actualizar Zsh
sudo apt update && sudo apt upgrade zsh
# Actualizar Oh My Zsh
omz update
``` 

## <span class="emoji">📌</span>Desinstalar Zsh

```sh
# Desinstalar Zsh
sudo apt --purge remove zsh
# Configurar por defecto la shell bash de Ubuntu
chsh -s `which bash`
```
