# Bitácora del proyecto ShipNow - evolución por módulos

## Introducción

Este proyecto lo encaré con la idea de construir una API de pedidos y entregas organizada por capas.  
El foco no fue solo que “funcione”, sino practicar estructura, separación de responsabilidades y manejo de errores.

Durante el proceso avancé por módulos: base del backend, modelado de datos, lógica de negocio, manejo de errores y logging/monitoreo.

---

## Módulo 1 - Base del backend y estructura inicial

Cuando arrancamos con la app, lo primero fue dejar bien armada la base del proyecto.

### Qué aprendí

- una API no se arma solo con rutas; también necesita controllers, services y repositories bien definidos
- separar por capas mejora mantenimiento y revisión
- tener una estructura clara ayuda cuando crece la app

### Qué implementé

- servidor principal en `src/app.js` y `src/server.js`
- configuración del entorno en `src/config/env.config.js`
- rutas principales en `src/routes/`
- controllers en `src/controllers/`
- services en `src/services/`
- repositories en `src/repositories/`
- modelos en `src/models/`

### Objetivo de esta etapa

Dejar una base ordenada para las siguientes entregas.

---

## Módulo 2 - Modelado de datos y lógica del negocio

Después de dejar armada la base, pasé a definir los modelos principales del sistema: usuarios, productos, pedidos y entregas.

### Qué aprendí

- cada entidad del negocio requiere su estructura y validaciones
- definir estados y datos mínimos evita inconsistencias
- la lógica de negocio no debe mezclarse con el manejo HTTP

### Qué implementé

- `user.model.js` para usuarios
- `product.model.js` para productos
- `order.model.js` para pedidos
- `delivery.model.js` para entregas
- services para cada módulo para manejar validaciones y lógica
- endpoints para crear, consultar y manipular recursos
- módulos de generación de mocks para datos de prueba

### Punto clave

La app pasó de ser una base genérica a tener flujo de negocio definido (pedidos, entregas, estados y validaciones).

---

## Módulo 3 - Manejo profesional de errores

Cuando la app ya tenía más cosas funcionando, apareció un problema importante: los errores estaban dispersos y no había una respuesta uniforme para el cliente.

### Qué aprendí

- no alcanza con capturar errores; también hay que normalizar respuestas
- el cliente necesita formato consistente en los fallos
- conviene tener una capa central de errores

### Qué implementé

- `src/utils/errors.js` con `CustomError` y diccionario de errores
- middleware centralizado de errores en `src/middlewares/errorHandler.js`
- manejo de rutas inexistentes en `src/middlewares/routeNotFoundHandler.js`
- validación de errores de negocio en servicios y mocks
- respuestas HTTP más consistentes

### Casos importantes que resolví

- productos, usuarios u órdenes inexistentes
- validaciones de cantidad o datos incompletos
- errores de negocio con mensajes claros
- errores inesperados del backend que se respondían de forma profesional

### Conclusión de esta etapa

Esta etapa ordenó el comportamiento ante fallos y mejoró la consistencia de respuestas.

---

## Módulo 4 - Logging y monitoreo básico

La última etapa fue implementar observabilidad básica en la API.

### Qué aprendí

- un `console.log()` aislado no alcanza para seguimiento
- centralizar el logger simplifica mantenimiento
- la trazabilidad ayuda a diagnosticar errores

### Qué implementé

- `src/utils/logger.js` con configuración centralizada de Winston
- niveles: `debug`, `http`, `info`, `warning`, `error` y `fatal`
- logging por consola y por archivo
- rotación de archivos con `winston-daily-rotate-file`
- middleware de request logging para registrar método, ruta y tiempo
- integración con errores para registrar fallas reales del sistema
- endpoint de prueba para validar el logger

### Archivos clave

- `src/utils/logger.js`
- `src/middlewares/httpLogger.js`
- `src/middlewares/errorHandler.js`
- `src/middlewares/routeNotFoundHandler.js`
- `src/routes/loggerRouter.js`

### Qué valida esta parte

- que la API registra eventos importantes
- que los errores quedan persistidos en `logs/`
- que la app se puede depurar mejor
- que la observabilidad se mantiene ordenada y reutilizable

---

## Integración completa de la app

Con estas etapas, ShipNow quedó como una API organizada por capas, con validaciones, manejo de errores y logging básico.

La evolución general quedó así:

1. base del proyecto
2. modelado y lógica del negocio
3. manejo de errores
4. logging y monitoreo
5. validación final y pruebas

Esto me ayudó a ver que un backend no es solo endpoints: también necesita orden, validación y trazabilidad.

---

## Validación del proyecto

Durante el proceso validé la app con tests y pruebas manuales.

### Verificaciones importantes

- ejecución del servidor
- pruebas del flujo de errores
- pruebas del logger y sus endpoints
- control de rutas no existentes
- revisión de archivos generados en `logs/`
- comprobación de consistencia entre respuestas HTTP y logs

### Ejemplos de validación que ejecuté

- `GET /api/logger/test` devolviendo `200` y registrando todos los niveles de log.
- `GET /api/logger/error` devolviendo `400` con respuesta normalizada.
- `GET /api/no-existe-xyz` devolviendo `404` y dejando traza de ruta no encontrada.
- `GET /api/mocks/snapshot` devolviendo `200` con estructura esperada de datos mock.
- `POST /api/mocks/seed/all` devolviendo `200` con MongoDB online.
- Corrida de tests automatizados (`npm test`) con resultado `10/10` OK.
- Corrida de smoke tests random con resultado `20/20` OK.

### Resultado

La app quedó estable para la entrega, con mejor organización y trazabilidad.

---

## Aprendizaje final

El principal aprendizaje fue que un backend mejora cuando, además de funcionar, mantiene estructura, manejo de errores consistente y registros útiles.

Lo más valioso no fue solo completar cada entrega, sino entender este proceso como algo progresivo:

- primero armé la base
- luego modelé el negocio
- después ordené los errores
- finalmente agregué observabilidad

Eso me dio una base más sólida para próximos módulos.

---

## Cierre de la bitácora

Esta bitácora resume el recorrido del proyecto ShipNow desde la base inicial hasta logging y monitoreo.

Queda pendiente seguir mejorando cobertura de pruebas y casos límite, pero la entrega cumple con los objetivos del módulo y deja una base clara para continuar.
