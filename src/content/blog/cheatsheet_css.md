---
title: 'css cheatsheet'
description: 'Ejemplos básicos de las principales etiquetas y propiedades css.'
pubDate: 2025-02-06
image:
    url: '/blog/cheatsheet_css.svg'
    alt: 'css .'
    bgColor: '#3cb8e3'
tags: ["css"]
---

## Selectores

| Selector           | Descripción                                     |
| :----------------- | :---------------------------------------------- |
| * {}               | Selector universal                              |
| #id {}             | Selector por ID                                 |
| .class {}          | Selector por clase                              |
| h1, h2 {}          | Seletor por etiqueta HTML                       |
| h1 + p {}          | Selector de hermano adjacente                   |
| ul > li {}         | Selector de hijo                                |
| h1 ~ p {}          | Selector general de hermanos                    |
| div a {}             | Selector descendente                            |
| div[attr="val"] {} | Selector de elementos que contienen un atributo |

## Unidades

| Unidad     | Descripción                                    |
| :--------- | :--------------------------------------------- |
| %          | Porcentaje                                     |
| cm         | Centímetros                                    |
| mm         | Milímetros                                     |
| in         | Pulgadas                                       |
| px         | Pixeles                                        |
| em         | 1 em = Tamaño de fuente actual                 |
| rem        | Tamaño de fuente del elemento raíz             |
| vh         | Alto de la ventana                             |
| vw         | Ancho de la ventana                            |
| vm         | El más pequeño entre ancho/alto de la ventana  |

## Pseudo Selectores

| Pseudo selector         | Descripción |
| :---------------------- | :---------- |
| :root                   | Elemento raíz                                           |
| :active                 | Elemento activo                                         |
| :focus                  | Elemento focalizado                                     |
| :hover                  | Elemento con el cursor encima                           |
| :link                   | Enlace no visitado???                                   |
| :disabled               | Elemento deshabilitado                                  |
| :enabled                | Elemento habilitado                                     |
| :checked                | Elemento marcado                                        |
| :nth-child(n)           | Elemento hermano en n posición                          |
| :nth-last-child(n)      | Elemento hermano en n posición desde el final           |
| :first-child            | Primer elemento                                         |
| :last-child             | Último elemento                                         |
| :only-child             | Hijo único                                              |
| :nth-of-type(n)         | Elemento del mismo tipo en n posición                   |
| :nth-last-of-type(n)    | Elemento del mismo tipo en n posición desde el final    |
| :last-of-type           | Último hermano de su tipo                               |
| :first-of-type          | Primer hermano de su tipo                               |
| :only-of-type           | Hijo único de su tipo                                   |
| :empty                  | Elemento sin hijos                                      |
| :not(x)                 | Elemento que no coincida con x                          |
| :target                 | Elemento objetivo indicado en la URI                    |
| ::first-letter          | Primera letra del texto                                 |
| ::first-line            | Primera línea del texto                                 |
| ::before                | Inserta contenido antes de un elemento                  |
| ::after                 | Inserta contenido después de un elemento                |

## Estilos de lista

```css
list-style-type: disc | circle | square | none;
list-style-type: inside | outside;
list-style-img: url();
```

## Posición

```css
position: static | relative | absolute | fixed | sticky;
top | right | bottom | left
float: left | right | none;
z-index: n | auto | none;
clear: none | left | rigth | both
```
## Fondo

```css
background-color: #ffffff;
background-image: url();
background-repeat: repeat-x | repeat-y | repeat | space | round | no-repeat;
background-attachment: scroll | fixed | local | initial | inherit;
background-position: top | rigth | bottom | left | center;
```

## Fuente

```css
font-style: normal | italic | oblique;
font-variant: normal | small-caps;
font-size: 10px | 0.8rem | 80%;
font-weight: normal | bold | bolder | lighter | 100-900;
letter-spacing: normal | 4px;
line-height: normal | 3rem | 30%;
font-family: 'Open sans', sans-serif;
```

## Texto

```css
text-align: left | right | center | justify;
text-transform: capitalize | lowercase | uppercase;
text-indent: 20px;
vertical-align: baseline | 10px | sub | super | top | text-top | middle | bottom | text-bottom | initial;
text-align-last: auto | left | right | center | justify | start | end | initial | inherit;
text-decoration: none | underline | overline | lint-through;
text-justify: auto | inter-word | inter-character | none | initial | inherit;
text-overflow: clip | ellipsis | string | initial | inherit;
text-shadow: h-shadow v-shadow | blur-radius color | none | initial | inherit;
```

## Transiciones

```css
transition-timing-function: ease | linear | ease-in | ease-out | ease-in-out | cuubic-Bezier(n, n, n, n);
transition-property: none | all;
transition-delay: time;
transition-duration: time;
transition: transition-property transition-duration transition-timming-function transition-delay;
````

## Animaciones

```css
animation-timig-function: ease | linear | ease-in | ease-out | ease-in-out | cubic Bezier(n, n, n, n);
animation-name: none | IDENT;
animation-duration: time;
animation-delay: time;
animation-iteration-count: inherit | number;
animation-direction: normal | alternative;
rotation: angle rotation-point position;
animation-play-state: running | paused;
animation: animation-name animation-duration animation-timing-function animation-delay animation-iteration-count animation-direction;
```

## Tranformar

### 2D

```css
tranform: translate(x, y);
transform: rotate(angle);
transform: scale(x, y);
transform: skew(x-ang, y-ang);
transform: skewX(angle);
transform: skewY(angle);
```

### 3D

```css
tranform: translate3d(x, y, z);
tranform: rotateX(angle);
tranform: rotateY(angle);
tranform: rotateZ(angle);
tranform: scale3d(x, y, z);
tranform: perspective(value);
```