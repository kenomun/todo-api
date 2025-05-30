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

    PORT=3000

 
 4. Inicia el servidor en modo desarrollo:

    npm run dev


📦 Estructura del Proyecto

    src/
    ├── controllers/
    │   └── tasks.controller.js
    ├── database/
    │   ├── db.js
    │   └── tasks.db  ← Archivo SQLite que contiene la base de datos
    ├── routes/
    │   └── tasks.routes.js
    └── index.js
    .env


📌 Endpoints REST

### ✅ POST /tasks

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
  ...
]
```



🔌 WebSocket

En construcción…