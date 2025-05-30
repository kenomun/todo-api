const request = require('supertest');
const app = require('../src/app');

let taskId;

beforeAll(() => {
  const fakeIO = { emit: jest.fn() };
  app.set('io', fakeIO);
});

describe('API Tareas', () => {
  test('POST /tasks crea tarea', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ titulo: 'Test', descripcion: 'Test desc' });
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.titulo).toBe('Test');

    taskId = res.body.id; // Guardamos ID para usarlo en los siguientes tests
  });

  test('GET /tasks obtiene todas las tareas', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });


    test('PUT /tasks/:id actualiza el estado de una tarea', async () => {
    const res = await request(app)
        .put(`/tasks/${taskId}`)
        .send({ status: 'completada' }); // ✅ válido según tu lógica

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.status).toBe('completada');
    });


   test('DELETE /tasks/:id elimina una tarea', async () => {
    const res = await request(app).delete(`/tasks/${taskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message'); // ← en inglés
    expect(res.body).toHaveProperty('id');
  });
});



