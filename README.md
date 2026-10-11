# Pre-entrega Módulo 4 — Logging y monitoreo básico

## Objetivo de la entrega

En esta entrega implementé un sistema de logging centralizado en la API usando Winston.  
El objetivo fue dejar trazabilidad de requests y errores, en lugar de depender de `console.log` sueltos.

---

## Qué implementé

### 1) Logger centralizado

Configuré el logger en:

- `src/utils/logger.js`

Desde ahí se define:

- niveles de log
- salida por consola
- salida a archivos
- rotación diaria de archivos
- nivel activo según entorno

### 2) Niveles pedidos por la entrega

Se configuraron estos niveles:

- `debug`
- `http`
- `info`
- `warning`
- `error`
- `fatal`

### 3) Integración con middlewares

El logger quedó integrado en:

- `src/middlewares/httpLogger.js` (registro de request y tiempo)
- `src/middlewares/errorHandler.js` (registro de errores normalizados)
- `src/middlewares/routeNotFoundHandler.js` (registro de rutas no encontradas)

### 4) Persistencia y rotación

Los logs se guardan en `logs/` con `winston-daily-rotate-file`, para evitar crecimiento sin límite.

Además, los archivos de logs están ignorados en `.gitignore`.

---

## Endpoint de prueba del logger

Se agregó una ruta de prueba en:

- `src/routes/loggerRouter.js`

Rutas:

```bash
GET /api/logger
GET /api/logger/test
GET /api/logger/error
```

- `/api/logger/test`: emite logs en todos los niveles.
- `/api/logger/error`: fuerza un error controlado para validar el middleware central.

---

## Cómo probarlo

1) Instalar dependencias:

```bash
npm install
```

2) Levantar el proyecto:

```bash
npm run dev
```

3) Probar logger:

```bash
curl http://localhost:3003/api/logger/test
```

4) Probar error controlado:

```bash
curl http://localhost:3003/api/logger/error
```

5) Revisar archivos dentro de `logs/`.

---

## Validación realizada

- Tests automatizados: `npm test` (10/10 OK).
- Pruebas de smoke random con MongoDB online: 20/20 OK.
- Verificación manual de endpoints de logger y rutas inexistentes.

### Ejemplos concretos validados

- `GET /api/logger/test` -> `200` y generación de logs `debug/http/info/warning/error/fatal`.
- `GET /api/logger/error` -> `400` y respuesta normalizada por middleware central.
- `GET /api/no-existe-xyz` -> `404` con registro en `routeNotFoundHandler`.
- `GET /api/mocks/snapshot` -> `200` con datos mock de usuarios, órdenes y entregas.
- `POST /api/mocks/seed/all` -> `200` con MongoDB online.
- `GET /api/orders/invalid-id` -> `400` (validación de id inválido en flujo de errores).

---

## Archivos clave

- `src/utils/logger.js`
- `src/middlewares/httpLogger.js`
- `src/middlewares/errorHandler.js`
- `src/middlewares/routeNotFoundHandler.js`
- `src/routes/loggerRouter.js`
- `src/routes/orders.js` (ajuste de rutas CRUD por `/:id`)
- `.gitignore`

---

## Resultado

La API ahora deja trazas de requests y errores de forma consistente.  
Con esto, la entrega cumple el objetivo de observabilidad básica para Backend 3 y deja una base clara para módulos siguientes.
