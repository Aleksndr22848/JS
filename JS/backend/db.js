const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Укажите свой пароль MySQL
  database: 'todo_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
});

const promisePool = pool.promise();


async function testConnection() {
  try {
    const [rows] = await promisePool.execute('SELECT 1 as test');
    console.log('✅ MySQL подключение успешно');
    return true;
  } catch (error) {
    console.error('❌ Ошибка подключения к MySQL:', error.message);
    console.log('💡 Убедитесь что:');
    console.log('   - MySQL сервер запущен');
    console.log('   - База данных todo_db создана');
    console.log('   - Логин/пароль указаны верно');
    return false;
  }
}

testConnection();

module.exports = promisePool;

async function checkTableStructure() {
  try {
    const [rows] = await promisePool.execute('DESCRIBE tasks');
    console.log(' Структура таблицы tasks:');
    console.table(rows);
    

    const [countResult] = await promisePool.execute('SELECT COUNT(*) as count FROM tasks');
    console.log(` Количество записей в таблице: ${countResult[0].count}`);
    
  } catch (error) {
    console.error(' Ошибка проверки таблицы:', error);
  }
}


testConnection().then(success => {
  if (success) {
    checkTableStructure();
  }
});