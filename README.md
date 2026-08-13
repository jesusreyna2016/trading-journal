# Trading Journal (web)

Journal de trading + rutina diaria, **local, privado y gratis**. Pensado para compartirse con traders que no pueden pagar herramientas de pago.

- **Una sola app** HTML/CSS/JS vanilla, sin dependencias (`index.html`).
- Fase actual: estática (datos en el navegador). Próxima: login + nube con Supabase (multiusuario).
- **No es asesoría financiera.** No conecta cuentas de broker: los trades se importan por CSV manualmente.

## Desarrollo
Abrir `index.html` en el navegador. Los datos viven en localStorage del propio navegador.

## Deploy (estático, gratis)
Cualquier hosting estático sirve el `index.html` en la raíz:
- **Netlify / Vercel / Cloudflare Pages** conectando este repo (auto-deploy en cada push).
- O arrastrar la carpeta a https://app.netlify.com/drop para una vista instantánea.

Ver el plan completo en `../roadmap_web.md`.
