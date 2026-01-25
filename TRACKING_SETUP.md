# 🎯 Tracking Setup - Cosmo Landing Page

## 📋 Resumen

Sistema de tracking implementado con:

- ✅ **Meta Pixel** (Facebook/Instagram Ads)
- ✅ **LinkedIn Insight Tag**
- ✅ **UTM Parameters Capture** (automático)
- ✅ **Cookie Consent Banner** (GDPR compliant)
- ✅ **Auto-tracking** de todos los botones y links

---

## 🚀 Configuración en Netlify

### Variables de Entorno

Ve a: **Netlify Dashboard → Site Settings → Environment Variables**

Agrega las siguientes variables:

```env
# Meta Pixel ID (obligatorio)
VITE_META_PIXEL_ID=123456789012345

# LinkedIn Partner ID (obligatorio)
VITE_LINKEDIN_PARTNER_ID=1234567

# Consent Mode (opcional - default: true)
VITE_CONSENT_MODE_ENABLED=true
```

### ¿Dónde encontrar los IDs?

**Meta Pixel ID:**

1. Ve a [Meta Events Manager](https://business.facebook.com/events_manager)
2. Selecciona tu píxel
3. Copia el ID (15 dígitos)

**LinkedIn Partner ID:**

1. Ve a [LinkedIn Campaign Manager](https://www.linkedin.com/campaignmanager)
2. Account Assets → Insight Tag
3. Copia el Partner ID (7 dígitos)

---

## 🎛️ Consent Mode

### ¿Qué hace?

Controla si se muestra el banner de cookies:

- `VITE_CONSENT_MODE_ENABLED=true` → **Banner visible** (para campañas EU/US)
- `VITE_CONSENT_MODE_ENABLED=false` → **Sin banner** (para campañas LATAM)

### Comportamiento

**Con banner (true):**

- Usuario ve banner al entrar
- Pixels NO se cargan hasta que acepta
- Cumple GDPR/CCPA

**Sin banner (false):**

- Pixels se cargan inmediatamente
- Tracking completo desde el primer segundo
- Ideal para LATAM

---

## 📊 Eventos Trackeados

### 1. PageView (Automático)

Se dispara en cada carga de página.

**Plataformas:**

- Meta Pixel ✅
- LinkedIn Insight Tag ✅

### 2. Lead (Automático en todos los botones)

Se dispara al hacer click en CUALQUIER botón o link.

**Ejemplos:**

- Click en WhatsApp → `source: "whatsapp_button"`
- Click en Email → `source: "email_button"`
- Click en "Hablemos de tu proyecto" → `source: "hablemos_de_tu_proyecto"`
- Click en redes sociales → `source: "social_media_button"`

**Datos incluidos en cada Lead:**

```javascript
{
  content_name: "whatsapp_button",
  utm_source: "facebook",
  utm_medium: "cpc",
  utm_campaign: "COSMO-Q1-2025",
  utm_content: "Psicologos-25-45_Video-V2",
  utm_term: "Instagram",
  landing_page: "/",
  referrer: "https://google.com",
  fbp: "_fbp cookie value",
  fbc: "_fbc cookie value"
}
```

---

## 🔗 UTM Parameters

### Captura Automática

El sistema captura automáticamente:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `fbclid` (Facebook Click ID)
- `li_fat_id` (LinkedIn Click ID)
- `referrer_url`
- `landing_page`

### Ejemplo de URL con UTMs

```
https://cosmostudio.es/?
  utm_source=facebook&
  utm_medium=cpc&
  utm_campaign=COSMO-PSICOLOGOS-Q1-2025&
  utm_content=Video-Testimonios-V2&
  utm_term=Instagram&
  fbclid=IwAR2xK8...
```

### Configuración en Meta Ads

Al crear un anuncio en Meta Ads Manager, en la sección **"Destino"**:

**URL Parameters (Build a URL parameter):**

```
utm_source=facebook&utm_medium=cpc&utm_campaign={{campaign.name}}&utm_content={{adset.name}}_{{ad.name}}&utm_term={{site_source_name}}&fbclid={{click_id}}
```

**Esto genera automáticamente:**

- Nombre de campaña
- Nombre de adset + ad
- Placement (Feed, Stories, etc.)
- Click ID único

---

## 🧪 Testing

### 1. Verificar que los pixels se cargaron

Abre la consola del navegador (F12) y busca:

```
[Meta Pixel] Initialized: 123456789012345
[LinkedIn Pixel] Initialized: 1234567
```

### 2. Verificar eventos en Meta Events Manager

1. Ve a [Meta Events Manager](https://business.facebook.com/events_manager)
2. Selecciona tu píxel
3. Ve a **"Test Events"**
4. Abre tu landing page en otra pestaña
5. Haz click en botones
6. Verifica que aparezcan los eventos en tiempo real

### 3. Verificar UTM capture

En la consola del navegador:

```javascript
// Ver UTM data capturada
JSON.parse(sessionStorage.getItem("utm_data"));

// Ver cookies de Facebook
document.cookie.split(";").filter((c) => c.includes("_fb"));
```

### 4. Test con URL de prueba

```
https://tu-dominio.netlify.app/?
  utm_source=test&
  utm_campaign=test-campaign&
  fbclid=test123
```

Luego verifica en consola que se capturó correctamente.

---

## 🔍 Troubleshooting

### Los pixels no se cargan

**Posibles causas:**

1. Variables de entorno no configuradas en Netlify
2. Consent banner rechazado (si está activado)
3. Ad blocker activo

**Solución:**

- Verifica variables en Netlify
- Limpia localStorage: `localStorage.clear()`
- Desactiva ad blocker

### Los eventos no llegan a Meta

**Posibles causas:**

1. Pixel ID incorrecto
2. Ad blocker bloqueando el script
3. Consent no otorgado

**Solución:**

- Verifica el Pixel ID en Netlify
- Prueba en modo incógnito sin extensiones
- Acepta el banner de cookies

### UTM parameters no se capturan

**Posibles causas:**

1. URL sin parámetros UTM
2. sessionStorage bloqueado

**Solución:**

- Agrega UTMs manualmente a la URL de prueba
- Verifica que el navegador permita sessionStorage

---

## 📱 Funcionamiento Multi-Página

**¿Funciona en todas las páginas del proyecto?**

✅ **SÍ** - El tracking está configurado globalmente en `App.tsx`

**Lo que funciona automáticamente:**

- PageView en cada ruta
- UTM capture en cualquier URL
- Auto-tracking de botones en cualquier componente

**Para agregar tracking en nuevas páginas:**

No necesitas hacer nada. El sistema ya trackea automáticamente todos los botones.

Si quieres tracking manual:

```typescript
import { trackLead } from '@/utils/tracking';

<button onClick={() => trackLead('custom_event_name')}>
  Click me
</button>
```

---

## 🎨 Personalización

### Cambiar el texto del banner

Edita: `src/components/CookieConsent.tsx`

```typescript
<p className="text-sm text-dark">
  Tu texto personalizado aquí
</p>
```

### Agregar eventos personalizados

Edita: `src/utils/tracking.ts`

```typescript
export const trackCustomEvent = (eventName: string, params?: any) => {
  if (!hasTrackingConsent()) return;

  if (window.fbq && META_PIXEL_ID) {
    window.fbq("trackCustom", eventName, params);
  }
};
```

### Excluir botones del auto-tracking

Agrega el atributo `data-no-track`:

```typescript
<button data-no-track onClick={handleClick}>
  No trackear este botón
</button>
```

Luego modifica `useAutoTracking.ts`:

```typescript
if (button.hasAttribute("data-no-track")) return;
```

---

## 📈 Próximos Pasos (Opcional)

### 1. Conversions API (Meta)

Para recuperar ~30% de conversiones bloqueadas por ad blockers:

- Configurar Zapier webhook
- Enviar eventos desde servidor
- Deduplicación con Event IDs

### 2. Google Ads (si lo necesitas)

Agregar variables:

```env
VITE_GOOGLE_ADS_CONVERSION_ID=AW-123456789
```

### 3. TikTok Pixel (si lo necesitas)

Agregar variables:

```env
VITE_TIKTOK_PIXEL_ID=ABC123DEF456
```

---

## 📞 Soporte

Si tienes problemas con la configuración:

1. Verifica la consola del navegador (F12)
2. Revisa que las variables estén en Netlify
3. Prueba en modo incógnito
4. Verifica Meta Events Manager

---

## ✅ Checklist de Implementación

- [ ] Configurar variables en Netlify
- [ ] Verificar que los pixels se cargan (consola)
- [ ] Hacer test de eventos en Meta Events Manager
- [ ] Configurar UTM parameters en Meta Ads
- [ ] Probar el banner de cookies (si está activado)
- [ ] Verificar tracking en producción

---

**Última actualización:** Enero 2025
