# CARGOTERRA 2.0

Código completo del sitio corporativo de CARGOTERRA, con logotipo, fotografías, estilos y formulario de solicitud de cotización por correo.

## Versiones conservadas

| Rama | Contenido |
| --- | --- |
| [main](https://github.com/Alejandramg95/CARGOTERRA/tree/main) | CARGOTERRA 2.0, versión principal. |
| [version-original](https://github.com/Alejandramg95/CARGOTERRA/tree/version-original) | Sitio original de Manzanillo. |

Cada rama contiene una aplicación completa e independiente. Cambia de rama para trabajar en la versión correspondiente.

## Trabajar desde Codex

1. Selecciona el repositorio `Alejandramg95/CARGOTERRA`.
2. Elige la rama `main` para continuar con CARGOTERRA 2.0.
3. Describe el cambio y pide revisar la vista previa antes de publicarlo.

Puedes comenzar con: «Revisa AGENTS.md y mejora la página de CARGOTERRA conservando la identidad azul y plateado, el logotipo y las imágenes. Prepara los cambios para revisión y conserva el sitio privado».

## Abrir una vista local

Con Node.js 18 o posterior, desde la carpeta del proyecto:

```sh
npm start
```

Abre `http://127.0.0.1:3000`. No requiere instalar paquetes ni ejecutar una compilación. `npm run dev` hace lo mismo. Para usar otro puerto, establece la variable `PORT`.

## Archivos

- `dist/index.html`: contenido y estructura.
- `dist/styles.css`: diseño y adaptación a móviles.
- `dist/app.mjs`: menú, navegación y flujo de cotización.
- `dist/assets/`: imágenes y logotipo originales.
- `scripts/serve.mjs`: servidor de vista local.
- `.openai/hosting.json`: configuración del sitio de origen.
- `AGENTS.md`: indicaciones para futuras ediciones en Codex.

El formulario permite revisar, copiar y descargar la solicitud. El envío se completa en la aplicación de correo del visitante hacia `contacto@cargoterra.com.mx`; no hay servidor de envío ni base de datos en este proyecto.

## Publicación y privacidad

Guardar cambios aquí no publica ni actualiza por sí solo el sitio de Sites. No se ha configurado GitHub Pages, automatización de despliegue ni conexión del dominio. El sitio de origen conserva su acceso privado. El repositorio de GitHub tiene visibilidad pública, independiente del acceso del sitio.

## Origen de esta exportación

- Fecha: 25 de octubre de 2026.
- Sitio: https://cargoterra-vision.truepark.chatgpt.site
- Commit de origen: `15c676c0b0c9b26f3e4db6aa776a7f2ac2431e05`.
- Los archivos originales se copiaron sin modificar; se añadieron este README, las instrucciones de Codex y el servidor local.

Las imágenes se conservan como parte del proyecto de CARGOTERRA. Antes de reutilizarlas fuera de este proyecto, revisar sus derechos de uso. Las imágenes ilustrativas mantienen su descripción dentro del sitio.
