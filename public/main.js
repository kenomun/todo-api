const socket = io();
const taskList = document.getElementById('taskList');
const form = document.getElementById('taskForm');

const fetchTasks = async () => {
  const res = await fetch('/tasks');
  const tasks = await res.json();
  taskList.innerHTML = '';
  tasks.forEach(addTaskToDOM);
};

const addTaskToDOM = (task) => {
  const li = document.createElement('li');
  li.id = `task-${task.id}`;
  li.innerHTML = `
    <strong>${task.titulo}</strong> - ${task.descripcion || ''} 
    [${task.status}]
    <button onclick="toggleStatus(${task.id}, '${task.status}')">Cambiar estado</button>
    <button onclick="deleteTask(${task.id})">Eliminar</button>
  `;
  taskList.appendChild(li);
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const titulo = document.getElementById('titulo').value;
  const descripcion = document.getElementById('descripcion').value;

  const res = await fetch('/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, descripcion }),
  });

  form.reset();

  if (!res.ok) {
    const data = await res.json();
    alert(data.error);
  }
});

const toggleStatus = async (id, currentStatus) => {
  const nuevoEstado = currentStatus === 'pendiente' ? 'completada' : 'pendiente';

  await fetch(`/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: nuevoEstado }),
  });
};

const deleteTask = async (id) => {
  await fetch(`/tasks/${id}`, { method: 'DELETE' });
};

// WebSocket listeners
socket.on('newTask', (task) => addTaskToDOM(task));

socket.on('taskUpdated', ({ id, status }) => {
  const li = document.getElementById(`task-${id}`);
  if (li) {
    const parts = li.innerHTML.split('[');
    li.innerHTML = parts[0] + `[${status}]` + parts[1].substring(parts[1].indexOf('</button>'));
  }
});

socket.on('taskDeleted', ({ id }) => {
  const li = document.getElementById(`task-${id}`);
  if (li) li.remove();
});

fetchTasks();
