# Feature: SEO, favicon y optimización de imágenes

## Objetivo
Mejorar la presencia en buscadores y el rendimiento de la landing de Cosmo Studio:
- Favicon en 3 formatos (svg → png → ico) para máxima compatibilidad.
- Todas las imágenes convertidas a webp optimizado (px + compresión); originales a `public/bak/`.
- `sitemap.xml` + metatags necesarios; `theme-color` = verde del Plan Conecta (`petrol-400`).
- `keywords` intacto (no tocar).
- `logo.jpg` = copia de `card.jpg` con crop cuadrado (cover). `card.jpg` NO se toca.

## Estado actual (exploración)
- Referenciadas: `Cosmo_white.png` (Header, Footer), `hero2.webp` (Hero bg), `Laia_Cosmo_Studio.jpg` (ProblemSolution), `Taktikum.png`, `Equazenes.png`, `Totterapia.png`, `Intuity.png` (Testimonials instagramFeed).
- Huérfanas en `public/`: `hero.webp`, `Management.jpg`, `Planning.jpg`, `Relaxed.jpg`.
- No tocar: `card.jpg`, `Cosmo_Black.svg`, `Cosmo_White.svg`, placeholders remotos de Testimonials.
- `petrol-400` = `oklch(65.1% 0.059 203.1)` → convertir a hex para theme-color.
- Componentes a actualizar referencias: `Header.tsx`, `Footer.tsx`, `ProblemSolution.tsx`, `Testimonials.tsx`, `index.html`.

## Tareas
1. Preparar tooling (sharp --no-save) y medir dimensiones actuales.
2. Convertir todas las imágenes (excepto card.jpg y svgs) a webp optimizado con resize; originales a `public/bak/`.
3. Generar `favicon.png` (48px) y `favicon.ico` (16/32/48) desde `favicon.svg`.
4. Crear `logo.jpg` (crop cuadrado cover de `card.jpg`).
5. Actualizar `index.html`: links favicon svg → png → ico, theme-color, msapplication-TileColor, link sitemap. Sin tocar keywords.
6. Crear `sitemap.xml` y añadir línea Sitemap a `robots.txt`.
7. Actualizar referencias de imágenes en componentes a `.webp`.
8. Build + verificación (typecheck, build, rutas resueltas).
9. Informe final + gaps de SEO restantes.

## Verificación
- `npm run build` OK.
- Todas las rutas de imagen referenciadas existen en `public/`.
- Favicons: 3 archivos presentes y referenciados en orden svg, png, ico.