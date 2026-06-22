const express = require('express');
const cors = require('cors');
const path = require('path');

const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});


app.use('/api/tasks', tasksRouter);

const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath));

// Fallback для SPA (если нужно)
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});


app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint не найден' });
});


app.use((error, req, res, next) => {
  console.error('Необработанная ошибка:', error);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log('\n ToDo App Server запущен!');
  console.log(` Сервер: http://localhost:${PORT}`);
  console.log(` Фронтенд: http://localhost:${PORT}`);
  console.log(` API: http://localhost:${PORT}/api/tasks`);
  console.log(` Время запуска: ${new Date().toLocaleString()}\n`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Сервер завершает работу...');
  process.exit(0);
});


app.use((req, res, next) => {
  console.log(`\n ${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log(' Headers:', req.headers);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log(' Body:', req.body);
  }
  next();
});

// Middleware для логирования ответов
app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function(data) {
    console.log(` Response ${res.statusCode}:`, 
      typeof data === 'string' ? data.substring(0, 200) + '...' : data);
    return originalSend.call(this, data);
  };
  next();
});


app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  console.log('Body:', req.body);
  next();
});