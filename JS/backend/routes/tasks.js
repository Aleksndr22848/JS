// POST /api/tasks - создать задачу
router.post('/', async (req, res) => {
  try {
    const { title, notes = '' } = req.body; // Значение по умолчанию для notes

    // Валидация
    if (!title?.trim()) {
      return res.status(400).json({ error: "Название задачи обязательно" });
    }

    // Сохранение в БД
    const [result] = await db.execute(
      'INSERT INTO tasks (title, notes) VALUES (?, ?)',
      [title.trim(), notes.trim()]
    );

    // Формируем ответ
    const newTask = {
      id: result.insertId,
      title: title.trim(),
      notes: notes.trim(),
      completed: 0,
      created_at: new Date()
    };

    res.status(201).json(newTask);

  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ 
      error: "Ошибка сервера",
      details: error.message 
    });
  }
});