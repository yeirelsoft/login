document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.registro-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const newusername = document.getElementById('newusername').value;
      const newpassword = document.getElementById('newpassword').value;
  
      try {
        const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ newusername, newpassword })
        });
  
        if (response.ok) {
          const result = await response.text();
          alert(result);
          window.location.href = 'index.html';
        } else {
          const error = await response.text();
          alert('Error: ' + error);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al registrar el usuario');
      }
    });
  
    const showPasswordCheckbox = document.getElementById('show-newpassword');
    showPasswordCheckbox.addEventListener('change', () => {
      const passwordField = document.getElementById('newpassword');
      passwordField.type = showPasswordCheckbox.checked ? 'text' : 'password';
    });
  });
  
  