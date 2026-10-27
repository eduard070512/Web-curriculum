# Web currículum: Eduardo Michel Magaña

Sitio personal estático (HTML, CSS y JavaScript sin frameworks ni compilación) con mi experiencia, proyectos, habilidades y formación.

- Bilingüe: abre en inglés y tiene un botón ES/EN. Con `?lang=es` en la URL abre directo en español.
- Modo claro y oscuro (sigue el del sistema y se puede cambiar con el botón).
- Responsivo y accesible (enlace para saltar al contenido, foco visible, respeta "reducir movimiento").

## Estructura

| Archivo | Contenido |
|---|---|
| `index.html` | Todo el contenido, en inglés |
| `script.js` | Traducciones al español (objeto `es`), cambio de idioma y de tema |
| `styles.css` | Estilos; los colores están en variables al inicio |
| `favicon.svg` | Ícono |

Para agregar o editar un texto traducible: ponle `data-i18n="clave"` en `index.html` y agrega la misma clave al objeto `es` en `script.js`.

## Ver en local

Abre `index.html` en el navegador, o:

```bash
npx serve .
```

## Publicar en Vercel

1. En Vercel: **Add New → Project → Import** este repositorio.
2. Framework preset: **Other**. No hace falta comando de build ni carpeta de salida.
3. **Deploy**. Cada push a la rama principal vuelve a publicar.
