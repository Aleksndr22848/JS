async function handleAddTask(e) {
  e.preventDefault();
  
  const title = newTitle.value.trim();
  const notes = newNotes.value.trim();

  if (!title) {
    alert('Введите название задачи');
    return;
  }

  try {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        title,
        notes 
      })
    });

    const data = await res.json();
    
    if (!res.ok) throw new Error(data.error || 'Ошибка сервера');
    
    addTaskToDOM(data);
    newTitle.value = '';
    newNotes.value = '';

  } catch (error) {
    console.error('Ошибка:', error);
    alert(`Ошибка: ${error.message}`);
  }
}

let totalTasksCount = 0;

const handleAddTask = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle.value })
    });

    if (response.ok) {
      totalTasksCount++; 
      updateCounter();   
    }
  }

}
function updateCounter() {
  const counterElement = document.getElementById('total-counter');
  if (counterElement) {
    counterElement.textContent = totalTasksCount;
    counterElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
      counterElement.style.transform = 'scale(1)';
    }, 200);
  }
}

totalTasksCount = tasks.length;
updateCounter();