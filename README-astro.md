# 🖖 Hola, mi nombre es rugo 👀

```sh
npm create astro@latest -- --template basics
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Install and custom Bootstrap in Astro tutorial

https://www.drsys.de/use-bootstrap-with-astro/

## Troubleshooting

When bootstrap package is installed, sass no recognize some functions and show several warnings.  
To solve this problem install the 1.62.1 sass version.

```sh
  "sass": "1.62.1"
```