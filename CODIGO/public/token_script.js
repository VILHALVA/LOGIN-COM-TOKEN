document.addEventListener('DOMContentLoaded', () => {
    const token = new URLSearchParams(window.location.search).get('token');
    if (token) {
        document.getElementById('token').value = token;
    } 
    else {
        document.getElementById('token_container').innerHTML = '<p>Token não encontrado.</p>';
    }

    document.getElementById('copy_button').addEventListener('click', () => {
        const tokenField = document.getElementById('token');
        tokenField.select();
        document.execCommand('copy');
        alert('Token copiado para a área de transferência!');
    });
});
