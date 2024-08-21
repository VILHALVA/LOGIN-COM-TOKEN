document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login_form');
    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); 
        
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
        
            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email })
                });
        
                const result = await response.json();
        
                if (response.ok) {
                    window.location.href = `token.html?token=${result.token}`;
                } 
                else {
                    document.getElementById('message').innerText = `Erro: ${result.message}`;
                }
            } catch (error) {
                console.error('Erro ao enviar a solicitação:', error);
                document.getElementById('message').innerText = 'Erro ao enviar a solicitação.';
            }
        });
    } 
    else {
        console.error('Elemento com ID "login_form" não encontrado.');
    }
});
