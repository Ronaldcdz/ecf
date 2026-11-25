# 0063 — WebKit corre en la imagen oficial de Playwright en Docker

- **Fecha:** 2026-11-24
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/layout-y-navegacion.md` (T5, S1); tarea de Notion "Configurar Playwright"; [0061](0061-e2e-en-tres-navegadores.md)

## Contexto

[0061](0061-e2e-en-tres-navegadores.md) pide correr los tests en Chromium, Firefox y WebKit. El primer test pasó en Chromium y Firefox, pero WebKit no arrancó: Playwright compila su WebKit para Ubuntu 24.04, y la máquina de Ronald usa Omarchy (basado en Arch), que trae versiones más nuevas de las mismas librerías. WebKit busca `libicu*.so.74` (Arch tiene ICU 78), `libxml2.so.2` (Arch tiene libxml2 2.15), `libjxl.so.0.8` (Arch tiene 0.12) y `libbacktrace.so.0`. Las dos versiones de WebKit que trae Playwright (GTK y WPE) necesitan las cuatro.

## Opciones consideradas

Primera ronda:

1. **Instalar las librerías viejas en Arch** — a favor: los tres navegadores corren con un solo comando / en contra: necesita `sudo`, deja versiones viejas junto a las del sistema y una actualización de Arch puede romperlo.
2. **WebKit en la imagen oficial de Playwright en Docker** — a favor: el entorno que Playwright soporta, sin tocar el sistema / en contra: una imagen grande (se estimó ~2 GB; ocupa 3.68 GB en disco).
3. **WebKit solo en CI** — a favor: nada que instalar ahora / en contra: todavía no hay CI, así que WebKit quedaría sin probar.
4. **Quitar WebKit** — a favor: lo más simple / en contra: Safari y iPhone nunca se prueban, contra el porqué de 0061.

Ronald eligió la opción 1 ("Es la forma más fácil de correr los tests"). Al revisarla, tres librerías tenían paquete (`libxml2-legacy` en el repositorio oficial, `icu74` y `libbacktrace-git` en AUR), pero `libjxl.so.0.8` no. Segunda ronda, solo para esa librería:

1. **Enlace simbólico de `libjxl.so.0.8` a `libjxl.so.0.12`** — a favor: un comando / en contra: 0.8 y 0.12 no tienen compatibilidad garantizada; WebKit podría fallar al decodificar una imagen JPEG XL.
2. **Compilar libjxl 0.8 desde el código fuente** — a favor: la versión exacta / en contra: compilación larga y mantenimiento a mano.
3. **Volver a la opción de Docker** — a favor: sin trucos / en contra: la imagen de ~2 GB.

## Decisión

WebKit corre en la imagen oficial `mcr.microsoft.com/playwright` (Ubuntu), con el servidor remoto de Playwright (`run-server`). Chromium y Firefox siguen corriendo en la máquina.

## Por qué

En palabras de Ronald: "Es la forma más segura de probar WebKit."

## Consecuencias

- `playwright.config.ts` arranca el contenedor con `webServer` y el proyecto `webkit` se conecta a él con `connectOptions`. `exposeNetwork: '<loopback>'` deja que el navegador del contenedor abra el servidor de Nuxt de la máquina. `bun run test:e2e` sigue siendo un solo comando.
- Playwright detiene el contenedor al terminar con `SIGTERM` (`gracefulShutdown`), y `--rm` lo borra. Sin eso, el contenedor quedaba corriendo después de los tests.
- La etiqueta de la imagen sale de la versión instalada de `@playwright/test`, así que cliente e imagen siempre coinciden.
- Hace falta Docker solo cuando corre WebKit: con `--project=chromium` o `--project=firefox` el contenedor no arranca (Playwright 1.65 no tiene `webServer` por proyecto, así que `playwright/runs-webkit.ts` lee `--project`, con tests).
- La imagen (3.68 GB en disco) se descarga una vez con `docker pull`. Si falta, los tests fallan enseguida con el comando exacto, en vez de descargarla dentro del tiempo de arranque.
- El puerto 3123 solo escucha en `127.0.0.1`: el servidor de Playwright no tiene contraseña, así que otros equipos de la red no deben alcanzarlo.
- Playwright espera la línea `Listening on ws://` del propio servidor, no solo el puerto. Así puede borrar antes un contenedor que quedó de una corrida interrumpida, y nunca se conecta a otro servidor que ocupe el puerto (si lo hay, `docker run` falla con "address already in use").
- El volumen de Docker `ecf-playwright-webkit-home` guarda la descarga de `npx`, así que solo la primera corrida necesita bajar Playwright dentro del contenedor.
- Dentro del contenedor se usa `npx`, que viene en la imagen. No toca las dependencias del proyecto ni `bun.lock`.
- El sistema de Ronald no cambia: no se instalaron librerías con `sudo`.
