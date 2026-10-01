# Capas del lightbox

Propuesta CSS independiente, no integrada aún en la aplicación.

Textura: `public/textures/graphite-tile.png`. Generada con la herramienta integrada de imágenes. El PNG conserva el original; CSS lo muestra en mosaicos de 512 px a una opacidad del 16 %. No contiene intencionadamente luces ni sombras. La continuidad de las uniones debe revisarse en la pantalla final antes de producción: una generación no garantiza periodicidad matemática.

Ejemplo de estructura (usar la fotografía real en `src`):

```html
<div class="lightbox-surface">
  <div class="lightbox-stage">
    <figure class="lightbox-print">
      <img src="/mi-foto.jpg" alt="Descripción de la fotografía" />
    </figure>
  </div>
</div>
```

Estilos en `layers.css`. La textura, la luz ambiental y el reflejo no interceptan clics. El reflejo local sigue los límites de la foto, también al usar formatos verticales. Para un visor con panel lateral, aplicar `lightbox-surface` al área de visualización para centrar allí la iluminación. Ajustar `--grain-opacity` entre 0.10 y 0.20 según la pantalla.

Prompt usado:

> Generate a single seamless tileable material texture image, square, for a website background: extremely fine matte graphite charcoal micrograin. Flat orthographic material scan, uniform neutral dark gray overall value approximately RGB 65,65,65 with delicate stochastic isotropic fine grain, very low contrast. Perfectly even lighting across entire image, seamless periodic matching left/right and top/bottom edges. NO gradient, NO vignette, NO lighting hotspot, NO shadows, NO glow, NO objects, NO typography, NO seams, NO borders, NO scratches, NO large mottling, NO directional brushed streaks, NO recognizable pattern, NO metallic glitter. Just homogeneous softly granular matte graphite material, refined and almost imperceptible grain. It will be repeated as a small CSS texture tile at low opacity over #111315, lighting added separately in CSS. Output only the texture filling entire image.
