# 📝 To-Do API en Tiempo Real

API backend construida con Node.js, Express, SQLite y Socket.IO para gestionar tareas (To-Do list) en tiempo real.  
Permite crear, consultar, actualizar y eliminar tareas, además de emitir eventos WebSocket en cada operación.

---

## 🚀 Requisitos previos

- Node.js 16 o superior
- npm 
- Git (opcional, si clonas el repo)

---

## ⚙️ Instalación

1. Clona el repositorio o descarga el código:
   ```bash
   git clone https://github.com/kenomun/todo-api
   cd todo-api



2. Instala las dependencias:

    npm install


3. Crea el archivo .env en la raíz del proyecto:   

    PORT=3000 (o le puerto de tu preferencia)

 
4. Inicia el servidorla aplicación

    npm run dev

5. Ejecutar los test

    npm test



## Frontend Básico (Opcional)

Se incluye un frontend muy simple en la carpeta `public` para facilitar la interacción y visualización en tiempo real de las tareas.

### ¿Qué hace?

- Se conecta al servidor WebSocket para recibir eventos en tiempo real:
  - `newTask`: muestra inmediatamente una nueva tarea creada.
  - `taskUpdated`: actualiza el estado de la tarea en la lista.
  - `taskDeleted`: elimina la tarea de la lista.
- Permite visualizar la lista actual de tareas y ver los cambios sin necesidad de refrescar la página.
- También se puede interactuar con los endpoints REST mediante herramientas externas (Postman, curl) y ver los cambios reflejados automáticamente en el frontend.

### ¿Cómo usarlo?

1. Asegúrate que el servidor esté corriendo (`npm start` o `npm run dev`).
2. Abre en el navegador el archivo `http://localhost:3000/` (o la URL que uses para el servidor).
3. Crea, actualiza o elimina tareas desde Postman o cualquier cliente REST.
4. Verás que las actualizaciones aparecen en la página en tiempo real gracias al WebSocket.

### Tecnologías usadas en el frontend:

- HTML y JavaScript puro (sin frameworks).
- Socket.io-client para conexión WebSocket.

---


🧪 Pruebas

Este proyecto incluye pruebas automatizadas para verificar el correcto funcionamiento de los endpoints de la API de tareas, utilizando Jest y Supertest.


### Asegúrate de tener instaladas las siguientes dependencias en devDependencies:

npm install --save-dev jest supertest


### Cómo ejecutar las pruebas

Ejecuta el siguiente comando desde la raíz del proyecto:

npm test


🔧 Notas técnicas

    Se utiliza una instancia de SQLite en memoria para pruebas.

    El servidor no se inicia con server.listen() durante las pruebas; se utiliza directamente la instancia de express desde src/app.js.

    Se burla (mock) la instancia de io de Socket.io para evitar errores con eventos WebSocket durante la ejecución de pruebas.

✅ Casos cubiertos

Actualmente se prueban los siguientes endpoints:

    POST /tasks: crea una nueva tarea.

    GET /tasks: obtiene todas las tareas.

    PUT /tasks/:id: actualiza el estado de una tarea (solo acepta "pendiente" o "completada").

    DELETE /tasks/:id: elimina una tarea existente




📦 Estructura del Proyecto

    Todo-API/
    ├── public/
    │   └── index.html
    |   └── main.js
    |   └── style.css
    ├── src/
    |    ├── controllers/
    |    │   └── tasks.controller.js
    |    ├── database/
    |    │   ├── db.js
    |    │   └── tasks.db  ← Archivo SQLite que contiene la base de datos
    |    ├── routes/
    |    │   └── tasks.routes.js
    |    └── index.js
    ├── test/
    │   └── setup.js
    |   └── task.test.js
    .env
    README.ms


📌 Endpoints REST

### ✅ POST /tasks

**http://localhost:3000/tasks**

Descripción: Crea una nueva tarea.

Request body:
```json
[

    {
        "titulo": "Estudiar WebSockets",
        "descripcion": "Revisar documentación de socket.io"
    }
]

```

Restricciones:

    titulo: obligatorio, máximo 100 caracteres

    descripcion: opcional, máximo 500 caracteres

Response:

```json
[
    {
        "id": 1,
        "titulo": "Estudiar WebSockets",
        "descripcion": "Revisar documentación de socket.io",
        "status": "pendiente",
        "fechaCreacion": "2025-05-30T15:25:00.000Z",
        "fechaActualizacion": "2025-05-30T15:25:00.000Z"
    }
]
```

### ✅ GET /tasks

**http://localhost:3000/tasks**

**Descripción:** Obtiene todas las tareas ordenadas por fecha de creación (más recientes primero).

**Response:**

```json
[
  {
    "id": 1,
    "titulo": "Estudiar WebSockets",
    "descripcion": "Revisar documentación de socket.io",
    "status": "pendiente",
    "fechaCreacion": "2025-05-30T15:25:00.000Z",
    "fechaActualizacion": "2025-05-30T15:25:00.000Z"
  },
]
```

### 🔄 PUT /tasks/:id

**http://localhost:3000/tasks/:id**

**Descripción:** Actualiza el estado de una tarea existente.

**Request:**

```json
{
  "status": "completada"
}
```


Response:
```json
{
  "message": "Tarea actualizada correctamente",
  "id": 1,
  "status": "completada"
}
```


### 🔴 DELETE  /tasks/:id

**http://localhost:3000/tasks/:id**

Elimina una tarea según su ID. Si la tarea se elimina correctamente

**Ejemplo de request:**

DELETE /tasks/1

**Ejemplo de respuesta exitosa:**

```json
{
  "message": "Tarea eliminada correctamente",
  "id": 1
}

```



🔌 WebSocket

Esta API utiliza Socket.IO para enviar actualizaciones en tiempo real al cliente cuando ocurren acciones sobre las tareas. Los eventos disponibles son:

### ✅ taskCreated
Se emite cuando se crea una nueva tarea exitosamente.

**Payload del evento:**
```json
    {
    "id": 1,
    "titulo": "Nueva tarea",
    "descripcion": "Descripción opcional",
    "status": "pendiente",
    "fechaCreacion": "2024-07-01T12:00:00.000Z",
    "fechaActualizacion": "2024-07-01T12:00:00.000Z"
    }
```

### 🔄 taskUpdated
Se emite cuando se actualiza el estado de una tarea.

**Payload del evento:**
```json
    {
    "id": 1,
    "status": "completada"
    }
```

### ❌ taskDeleted
Se emite cuando se elimina una tarea.

**Payload del evento:**
```json

    {
    "id": 1
    }
```





