document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login_form');
    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); 
        
            const token = document.getElementById('token').value;
        
            try {
                const response = await fetch('/verify', { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token })
                });
        
                const result = await response.json();
        
                if (response.ok) {
                    alert('Token válido! Login foi bem Sucedido!');
                } 
                else {
                    alert(`Erro: ${result.message}`);
                }
            } catch (error) {
                console.error('Erro ao enviar a solicitação:', error);
                alert('Erro ao enviar a solicitação.');
            }
        });
    } 
    else {
        console.error('Elemento com ID "login_form" não encontrado.');
    }
});
