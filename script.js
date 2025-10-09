document.querySelector('.btn-primary').addEventListener('click', function() {
            const inputField = document.querySelector('.input-field');
            if (inputField.value.trim() === '') {
                inputField.style.borderColor = '#ff4757';
                inputField.focus();
            } else {

                alert('Resposta registrada: ' + inputField.value);
                inputField.value = '';
            }
        });
        
        document.querySelector('.input-field').addEventListener('input', function() {
            this.style.borderColor = '#e1e5ee';
        });