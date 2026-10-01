# Propuesta B — API de eventos y fotos

Actualizada: 2026-09-30. Contrato propuesto para acordar con backend; no describe una implementación ya verificada.

## Acuerdos

- `find` resuelve el ID o slug sin devolver contenido protegido ni conceder acceso.
- El detalle del evento acepta exclusivamente su ID y devuelve el evento y `accessSettings`.
- La galería se obtiene exclusivamente desde su endpoint paginado, sin filtros internos.
- No se usa `hasAccess`: el código HTTP indica si se permite obtener el contenido.
- `AccessSettings.type` es una cadena o `null`, nunca un array. Los valores contemplados son `all`, `low_res` y `view_only`.
- El backend decide `type` utilizando las credenciales recibidas. El frontend no combina modalidades ni establece prioridades.
- No se define ninguna relación entre `type` y la marca de agua. Ese comportamiento queda fuera de esta propuesta.
- El acceso por passphrase no depende de una nueva sesión opaca: el frontend conserva la passphrase por evento y la reenvía en las consultas correspondientes.

## Endpoints

| Método | URL | Headers de petición | Body | Query params | Respuesta 200 OK |
|---|---|---|---|---|---|
| GET | `/events/find/{eventIdOrSlug}` | `Accept: application/json` | — | — | `EventReference` |
| GET | `/events` | `Accept: application/json`<br>`Authorization: Bearer <token>` opcional | — | `per`, `page`, `date`, `person`, `location`, `photographer` | `Paginated<Event>` |
| GET | `/events/{eventId}` | `Accept: application/json`<br>`Authorization: Bearer <token>` opcional<br>`X-Event-Slug: <slug>` opcional<br>`X-Event-Passphrase: <passphrase>` opcional | — | — | `EventDetailResponse` |
| GET | `/events/{eventId}/photos` | `Accept: application/json`<br>`Authorization: Bearer <token>` opcional<br>`X-Event-Slug: <slug>` opcional<br>`X-Event-Passphrase: <passphrase>` opcional | — | `per`, `page` | `Paginated<PhotoSummary>` |
| POST | `/events/{eventId}/access` | `Accept: application/json`<br>`Content-Type: application/json`<br>`Authorization: Bearer <token>` opcional<br>`X-Event-Slug: <slug>` opcional | `{ passphrase: string }` | — | `AccessSettings` |
| GET | `/photos` | `Accept: application/json`<br>`Authorization: Bearer <token>` opcional | — | `per`, `page`, `date`, `person`, `event`, `location`, `photographer` | `Paginated<PhotoSearchResult>` |
| GET | `/photos/{photoNumber}` | `Accept: application/json`<br>`Authorization: Bearer <token>` opcional<br>`X-Event-Slug: <slug>` opcional<br>`X-Event-Passphrase: <passphrase>` opcional | — | — | `PhotoDetailResponse` |

El token se envía cuando hay sesión iniciada. El slug se envía cuando se conserva ese contexto de acceso. La passphrase se envía cuando está disponible para el evento. En `POST /access`, la passphrase que se valida viaja en el body, sin duplicarla en un header.

## Resolución de ID y slug

| Petición | Respuesta |
|---|---|
| `/events/find/mi-evento-lowres` | `{ "id": "123", "slug": "mi-evento-lowres" }` |
| `/events/find/123` | `{ "id": "123", "slug": null }` |

`EventReference.slug` es el slug utilizado en la consulta. No devuelve otro slug del evento cuando se consulta por ID. El frontend conserva este valor para `X-Event-Slug`; no lo sustituye por `Event.slug`, que representa el slug general del evento.

El backend verifica que el slug enviado en el header pertenece al evento solicitado. Resolver un ID no debe revelar slugs que concedan acceso. La desambiguación de slugs numéricos y las colisiones entre eventos deben acordarse con backend.

## Tipos de respuesta

| Tipo | Campos |
|---|---|
| `EventReference` | `id: string`<br>`slug: string \| null` |
| `EventDetailResponse` | `status: "ready"`<br>`accessSettings: AccessSettings`<br>`event: Event` |
| `PhotoDetailResponse` | `status: "ready"`<br>`accessSettings: AccessSettings`<br>`event: { id: string, name: string, date: string }`<br>`photo: PhotoDetail` |
| `AccessSettings` | `isPrivate: boolean`<br>`myEvent: boolean`<br>`hasPassphrase: boolean`<br>`type: "all" \| "low_res" \| "view_only" \| null` |
| `Paginated<T>` | `items: T[]`<br>`page: number`<br>`per: number`<br>`total: number` |
| `Event` | `id: string`<br>`slug: string \| null`<br>`date: string`<br>`name: string`<br>`imageCount: number`<br>`coverImage: { name: string, src: string } \| null`<br>`location: Location \| null` |
| `Location` | `id: string`<br>`name: string`<br>`city: string \| null`<br>`state: string \| null` |
| `PhotoSummary` | `number: number`<br>`name: string`<br>`src: string` |
| `PhotoSearchResult` | Todos los campos de `PhotoSummary`<br>`event: { id: string, name: string, date: string }` |
| `PhotoDetail` | Todos los campos de `PhotoSummary`<br>`previewSrc: string`<br>`eventId: string`<br>`people: { id: string, name: string }[]` |
| `AccessRequired` | `status: "access_required"`<br>`eventId: string`<br>`accessSettings: AccessSettings` |
| `ApiError` | `error: { code: string, message: string }` |

### AccessSettings

- `isPrivate`: el evento está marcado como privado.
- `myEvent`: el backend valida el token del usuario y su inclusión en la whitelist; no se recibe del frontend.
- `hasPassphrase`: existe alguna passphrase habilitada que puede introducirse, incluso sin slug específico. No revela su valor.
- `type`: nivel efectivo calculado por backend. No se calcula a partir de todas las modalidades configuradas, sino de las reglas y credenciales válidas. Las coincidencias de slug o passphrase las resuelve backend; no se asume que impliquen `all`.

## Respuestas por código HTTP

| Endpoint | HTTP | Caso | Body |
|---|---|---|---|
| Todos | 200 | Consulta exitosa o passphrase validada | Tipo de la tabla de endpoints |
| `GET /events/find/{eventIdOrSlug}` | 404 | Identificador inexistente o no disponible | `ApiError`: `NOT_FOUND` |
| `GET /events` y `GET /photos` | 400 | Paginación, fecha o filtros inválidos | `ApiError`: `INVALID_QUERY` |
| `GET /events/{eventId}` | 403 | Sin acceso suficiente | `AccessRequired` |
| `GET /events/{eventId}` | 404 | Evento inexistente o no disponible | `ApiError`: `NOT_FOUND` |
| `GET /events/{eventId}/photos` | 400 | Paginación inválida | `ApiError`: `INVALID_QUERY` |
| `GET /events/{eventId}/photos` | 403 | Sin acceso suficiente | `AccessRequired` |
| `GET /events/{eventId}/photos` | 404 | Evento inexistente o no disponible | `ApiError`: `NOT_FOUND` |
| `POST /events/{eventId}/access` | 400 | Body inválido o passphrase vacía | `ApiError`: `INVALID_BODY` |
| `POST /events/{eventId}/access` | 403 | Passphrase incorrecta | `ApiError`: `INVALID_PASSPHRASE` |
| `POST /events/{eventId}/access` | 403 | No hay passphrase habilitada | `ApiError`: `PASSPHRASE_NOT_ENABLED` |
| `POST /events/{eventId}/access` | 404 | Evento inexistente | `ApiError`: `NOT_FOUND` |
| `GET /photos/{photoNumber}` | 400 | Número de foto inválido | `ApiError`: `INVALID_PHOTO_NUMBER` |
| `GET /photos/{photoNumber}` | 403 | Sin acceso al evento de la foto | `AccessRequired` |
| `GET /photos/{photoNumber}` | 404 | Foto inexistente, retirada o no disponible | `ApiError`: `NOT_FOUND` |
| Cualquiera que acepte token | 401 | Token enviado inválido o expirado | `ApiError`: `INVALID_TOKEN` |
| Cualquiera | 429 | Límite de solicitudes o intentos superado | `ApiError`: `RATE_LIMITED`; header `Retry-After` |
| Cualquiera | 500 | Error interno | `ApiError`: `INTERNAL_ERROR` |
| Cualquiera | 503 | Servicio temporalmente no disponible | `ApiError`: `SERVICE_UNAVAILABLE` |

Si no debe revelarse la existencia del recurso, backend responde 404 en lugar de 403. Los listados vacíos devuelven 200, no 404.

Ejemplo de error:

```json
{
  "error": {
    "code": "INVALID_PASSPHRASE",
    "message": "La contraseña es incorrecta."
  }
}
```

Ejemplo de 403 para contenido protegido:

```json
{
  "status": "access_required",
  "eventId": "123",
  "accessSettings": {
    "isPrivate": true,
    "myEvent": false,
    "hasPassphrase": true,
    "type": null
  }
}
```

## Flujos

### Abrir un evento

1. Consultar `/events/find/{eventIdOrSlug}` y conservar el ID y el slug utilizado.
2. Consultar `/events/{eventId}` con el token, slug y passphrase disponibles.
3. Con 200, mostrar el evento y solicitar `/events/{eventId}/photos` con las mismas credenciales aplicables.
4. Con 403, usar `hasPassphrase` para mostrar el formulario; si no hay passphrase habilitada, indicar acceso reservado a usuarios autorizados.

Si se conoce con certeza el ID y el contexto de acceso, puede omitirse `find`.

### Validar una passphrase

1. Enviar `POST /events/{eventId}/access` con la passphrase en el body y el contexto de slug, si existe.
2. Con 200, guardar la passphrase por evento, siguiendo el patrón legacy `eventPassphrase-{eventId}`. La cookie es accesible desde JavaScript; no es una cookie de sesión opaca ni contiene permisos confiables para backend.
3. Volver a consultar el detalle enviando `X-Event-Passphrase` y el slug original, si existe.
4. Reenviar las credenciales al paginar o consultar una foto. Backend las valida en cada petición. El POST no convierte en público el evento ni convierte al usuario en miembro de la whitelist.

### Abrir una foto directamente

1. Consultar `/photos/{photoNumber}` con las credenciales conocidas.
2. Con 200, mostrar la foto y los datos básicos del evento.
3. Con 403, usar `eventId` para buscar la passphrase guardada del evento y reintentar una vez con esa credencial si todavía no se había enviado.
4. Si sigue sin acceso, mostrar el formulario cuando `hasPassphrase` sea verdadero, o indicar que requiere un usuario autorizado.

No se necesita obtener una foto privada para descubrir su evento: el 403 contiene únicamente la referencia y los datos de acceso, sin contenido protegido.

## Convenciones y límites

- `page` comienza en 1; `per` por defecto es 24. El límite máximo queda por acordar.
- `total` cuenta todos los resultados que cumplen la consulta. Una página válida fuera de rango devuelve `items: []` conservando el total real.
- Fechas sin hora: `YYYY-MM-DD`. Filtros por IDs, separados por comas cuando admitan múltiples valores.
- `coverImage.src` corresponde a la variante `poster` del listado legacy.
- Las fotos usan `src`; el detalle añade `previewSrc`. No se deduce marca de agua a partir de `type`.
- Los listados generales muestran únicamente contenido autorizado para la petición. No aceptan una passphrase de evento en este contrato; para esa galería se usa `/events/{eventId}/photos`.
- El backend valida permisos en cada endpoint de contenido y evita que una caché compartida exponga respuestas protegidas.
- Los endpoints de descarga no están definidos en esta propuesta. Sus permisos efectivos y restricciones por foto deben validarse en backend.
- Quedan por confirmar con backend: prioridad cuando coincidan credenciales, permisos exactos de la whitelist y modalidades, unicidad de slugs entre eventos, duración de almacenamiento de passphrases y configuración de CORS para los headers propuestos cuando se requiera.
