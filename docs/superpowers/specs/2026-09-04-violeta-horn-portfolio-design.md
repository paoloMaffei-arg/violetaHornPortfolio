# Violeta Horn — Portfolio Web · Documento de Diseño

**Fecha:** 2026-09-04
**Cliente:** Violeta Horn (actriz & modelo)
**Objetivo del sitio:** captar castings/directores audiovisuales **y** marcas/publicidad.
**Estética:** cinemático oscuro · dirección **Noir editorial** (blanco y negro, serif fina de revista).
**Idiomas:** bilingüe Español / Inglés.
**Deploy:** Vercel (URL gratuita al inicio; dominio propio más adelante).

---

## 1. Perfil y contenido (fuente de verdad)

- **Nombre / artístico:** Violeta Horn.
- **Tagline (borrador):** "Actriz & Modelo · Buenos Aires" (ES) / "Actress & Model · Buenos Aires" (EN).
- **Base:** Capital Federal, Buenos Aires. Disponible para viajar.
- **Contacto:** WhatsApp directo → `+54 9 3442 571976` → `https://wa.me/5493442571976`.

**Stats de modelo (comp card):**
- Altura: 1,70 m
- Medidas: 95 · 70 · 105
- Remera: S–M · Pantalón: 38 · Calzado: 39
- Pelo: castaño · Ojos: negros

**Representación:**
- Audiovisual: **Club Semillas**
- Marcas / publicidad: freelance (contacto directo)

**Bio (base, editable):** 21 años. Estudia la Licenciatura en Artes Escénicas y el Traductorado Público en UADE (CABA). Toma clases de danza contemporánea, jazz y urbano; nivel intermedio-avanzado en acrobacia.

**Formación (timeline):**
- 2019–2022 — Taller de teatro "Las Yotivenco"
- 2022–2023 — Actuación · Virginia Landi (Actuartestudio)
- 2022–2024 — Actuación frente a cámara · Leonel Armeri
- 2024–2025 — Improvisación · Franca Boletta (Espacio Hamas)
- 2025 — Intensivo de actuación frente a cámara · Leonel Armeri

**Créditos:** cortos universitarios.

**Skills:** Español, Inglés · danza contemporánea, jazz, urbano · acrobacia de piso (intermedio-avanzado) · carnet náutico · carnet de auto.

**Links:**
- Reel: https://www.youtube.com/watch?v=vG922zPjxS0
- Canal YouTube: https://www.youtube.com/@violetahorn
- Instagram: https://www.instagram.com/violehorn/
- TikTok: https://www.tiktok.com/@violehorn
- Behance: https://www.behance.net/violetahorn

**Assets (pendientes de entrega):** fotos, reel y comp card/CV se cargarán en
`C:\Users\Paolo\Documents\VioleWeb\contenido audiovisual\`. No se acreditan fotógrafos.
Identidad de marca (logo/tipografías/colores) la define el diseño (ver §3).

---

## 2. Arquitectura de información

Home de **scroll único** e inmersiva + página de galería completa. Secciones:

1. **Hero** — pantalla completa, frame/reel de fondo, nombre grande, tagline, CTAs "Ver reel" + "WhatsApp", selector ES/EN.
2. **Reel** — video de YouTube destacado, reproducción cinematográfica (facade → click to play).
3. **Sobre mí** — bio + foto editorial.
4. **Stats / Ficha técnica** — medidas y datos + representación (Club Semillas) + botón "Descargar comp card".
5. **Portfolio** — grilla por categorías (Moda / Beauty / Comercial / Editorial) con lightbox; enlace a galería completa.
6. **Actriz / CV** — créditos + formación (timeline) + skills; botón "Descargar CV".
7. **Contacto** — CTA final de WhatsApp + íconos Instagram, TikTok, YouTube, Behance.
8. **Footer** — nombre, redes, © año.

**Navegación:** barra superior fija minimalista con anclas + selector ES/EN; hamburguesa en móvil.
**Rutas:** `/es`, `/en` (home) · `/es/portfolio`, `/en/portfolio` (galería). `/` redirige según idioma del navegador.

---

## 3. Dirección visual — Noir editorial

- **Paleta:** negro profundo (#0a0a0a), gris carbón, off-white cálido (#f4f2ee). Sin color de acento (impacto por foto + tipografía). Escala de grises en imágenes de UI/hover; fotos de portfolio a color en el lightbox.
- **Tipografía:** display serif **Playfair Display** (titulares) + **Inter** (texto y UI).
- **Motion (Framer Motion):** fades y reveals sutiles al hacer scroll, zoom suave en fotos al hover, transiciones cinematográficas. Sobrio, nunca estridente. Respeta `prefers-reduced-motion`.
- **Layout:** mucho espacio negativo, foco en la imagen, jerarquía tipográfica marcada.

---

## 4. Arquitectura técnica

- **Framework:** Next.js 15 (App Router) + TypeScript.
- **Estilos:** Tailwind CSS (tokens de la paleta como variables CSS).
- **Animaciones:** Framer Motion.
- **Imágenes:** `next/image` (responsive, lazy-load, blur placeholder).
- **i18n:** `next-intl`, con `content/es.json` y `content/en.json`.
- **Modelo de contenido:** todos los textos/datos en JSON de traducción; galería mapeada en `content/gallery.ts`. Cero texto hardcodeado en componentes → mantenimiento sin tocar código.
- **Reel:** embed de YouTube con "facade" (miniatura → carga el player al click).
- **Comp card / CV:** PDFs en `public/` con botones de descarga.
- **WhatsApp:** `https://wa.me/5493442571976?text=<mensaje pre-cargado>`.
- **SEO / social:** metadatos Open Graph por idioma (título, descripción, imagen de preview).
- **Deploy:** Vercel; preparado para dominio propio posterior.

**Estructura de carpetas (prevista):**
```
app/[locale]/                 # layout + home + portfolio
components/                   # Hero, Reel, About, Stats, Gallery, Lightbox, ActingCV, Contact, Nav, Footer, LangSwitcher
content/{es,en}.json          # textos
content/gallery.ts            # mapeo de fotos → categorías
messages/                     # config next-intl
public/portfolio/             # fotos optimizadas
public/docs/                  # comp card + CV (PDF)
```

---

## 5. Manejo de errores y estados

- Imágenes: blur placeholder mientras cargan; `alt` descriptivo.
- Reel: si el embed falla, fallback a link directo al video.
- Contenido faltante (assets aún no entregados): placeholders elegantes + estructura lista para reemplazo 1:1.
- Sin formularios (contacto es WhatsApp) → sin backend ni datos sensibles.

---

## 6. Estrategia de testing / verificación

- Verificación visual en la pestaña del navegador: **móvil y desktop**.
- Build de producción (`next build`) sin errores ni warnings de tipos.
- Accesibilidad básica: contraste AA, `alt` en imágenes, navegación por teclado en nav y lightbox, `prefers-reduced-motion`.
- Chequeo de que todos los links externos (redes, reel, WhatsApp) abren correctamente.
- Verificación de i18n: ambas rutas (`/es`, `/en`) completas y sin claves faltantes.

---

## 7. Fuera de alcance (YAGNI)

- CMS / panel de administración (el contenido se edita en JSON).
- Formulario de contacto con backend (se usa WhatsApp).
- Blog / noticias.
- Analytics avanzado (se puede sumar Vercel Analytics luego si se pide).
- Compra de dominio (posterior).

---

## 8. Supuestos confirmados

- WhatsApp en Argentina (+54). ✓
- Carpeta de contenido en `VioleWeb\contenido audiovisual\`. ✓
- Identidad de marca la crea el diseño (no hay logo previo). ✓
