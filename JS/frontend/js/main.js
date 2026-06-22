document.addEventListener('DOMContentLoaded', function() {
  console.log(' ToDo App загружен!');

  highlightActiveNavigation();
  addSmoothTransitions();
});


function highlightActiveNavigation() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
}

function addSmoothTransitions() {
  document.body.classList.add('fade-in');
  

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}


function showNotification(message, type = 'success', duration = 3000) {
  let container = document.getElementById('notification-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'notification-container';
    container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1050;
      max-width: 350px;
    `;
    document.body.appendChild(container);
  }
  

  const notification = document.createElement('div');
  notification.className = `alert alert-${type} alert-dismissible fade show slide-up`;
  notification.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  container.appendChild(notification);

  if (duration > 0) {
    setTimeout(() => {
      if (notification.parentNode) {
        notification.classList.add('fade');
        setTimeout(() => notification.remove(), 150);
      }
    }, duration);
  }
  
  return notification;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Сегодня ' + date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  } else if (diffDays === 1) {
    return 'Вчера ' + date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  } else if (diffDays < 7) {
    return diffDays + ' дн. назад';
  } else {
    return date.toLocaleDateString('ru-RU');
  }
}

function validateInput(value, rules = {}) {
  const errors = [];
  
  if (rules.required && (!value || value.trim().length === 0)) {
    errors.push('Поле обязательно для заполнения');
  }
  
  if (rules.minLength && value.length < rules.minLength) {
    errors.push(`Минимальная длина: ${rules.minLength} символов`);
  }
  
  if (rules.maxLength && value.length > rules.maxLength) {
    errors.push(`Максимальная длина: ${rules.maxLength} символов`);
  }
  
  return errors;
}

window.todoApp = {
  showNotification,
  formatDate,
  validateInput,
  highlightActiveNavigation
};