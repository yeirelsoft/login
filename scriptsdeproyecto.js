document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
  
        if (response.ok) {
          alert('Login exitoso');
          // Redirigir al usuario a otra página
          window.location.href = 'bienvenida.html'; // Reemplaza con la ruta a tu página de bienvenida
        } else {
          const error = await response.text();
          alert('Error: ' + error);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error en el login');
      }
    });
  
    const showPasswordCheckbox = document.getElementById('show-password');
    showPasswordCheckbox.addEventListener('change', () => {
      const passwordField = document.getElementById('password');
      passwordField.type = showPasswordCheckbox.checked ? 'text' : 'password';
    });
  });
  
