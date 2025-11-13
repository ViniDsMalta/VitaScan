 
        const questions = [
            {
                id: 1,
                text: "Qual é o principal sintoma que você está sentindo atualmente?",
                suggestions: [
                    "Dor de cabeça", "Febre", "Tosse", "Dor abdominal", 
                    "Fadiga", "Náusea", "Tontura", "Dor nas costas",
                    "Falta de ar", "Dor no peito", "Dor de garganta", "Coriza"
                ]
            },
            {
                id: 2,
                text: "Há quanto tempo você está com esse sintoma?",
                suggestions: [
                    "Menos de 24 horas", "1-2 dias", "3-5 dias", "1 semana",
                    "2 semanas", "1 mês", "Mais de 3 meses", "Mais de 1 ano"
                ]
            },
            {
                id: 3,
                text: "Qual a intensidade do seu sintoma?",
                suggestions: [
                    "Leve (não atrapalha atividades)", "Moderada (atrapalha parcialmente)",
                    "Severa (atrapalha bastante)", "Muito severa (incapacitante)"
                ]
            },
            {
                id: 4,
                text: "O sintoma é contínuo ou vem e vai?",
                suggestions: [
                    "Contínuo", "Vem e vai", "Aparece em crises", "Só em determinadas situações"
                ]
            },
            {
                id: 5,
                text: "Você tem algum outro sintoma associado?",
                suggestions: [
                    "Nenhum", "Febre", "Calafrios", "Sudorese", "Náusea", "Vômito",
                    "Diarreia", "Tontura", "Visão turva", "Palpitações"
                ]
            },
            {
                id: 6,
                text: "Você já teve esse sintoma antes?",
                suggestions: [
                    "Nunca", "Raramente", "Ocasionalmente", "Frequentemente", "Sempre"
                ]
            },
            {
                id: 7,
                text: "O que parece melhorar seu sintoma?",
                suggestions: [
                    "Repouso", "Medicação", "Alimentação", "Exercício", "Nada melhora"
                ]
            }
        ];

        // Variáveis de estado
        let currentQuestionIndex = 0;
        let answers = {};
        const inputField = document.querySelector('.input-field');
        const suggestionsContainer = document.querySelector('.suggestions-container');
        const errorMessage = document.querySelector('.error-message');
        const nextButton = document.getElementById('next-btn');
        const backButton = document.getElementById('back-btn');
        const progressBar = document.getElementById('progress-bar');
        const progressPercent = document.getElementById('progress-percent');
        const questionNumber = document.querySelector('.question-number');
        const questionText = document.querySelector('.question-text');
        const resultsContainer = document.getElementById('results-container');
        const resultsList = document.getElementById('results-list');
        const restartButton = document.getElementById('restart-btn');

      
        updateQuestion();

        
        inputField.addEventListener('input', function() {
            const value = this.value.toLowerCase();
            const currentQuestion = questions[currentQuestionIndex];
            
          
            clearError();
            
            if (value.length > 0) {
                const filteredSuggestions = currentQuestion.suggestions.filter(suggestion => 
                    suggestion.toLowerCase().includes(value)
                );
                
                showSuggestions(filteredSuggestions);
            } else {
                hideSuggestions();
            }
        });

        //sugestão clicada
        function setupSuggestionClick() {
            document.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', function() {
                    inputField.value = this.textContent;
                    hideSuggestions();
                    clearError();
                });
            });
        }

        // Mostrar sugestões
        function showSuggestions(suggestions) {
            if (suggestions.length === 0) {
                hideSuggestions();
                return;
            }
            
            suggestionsContainer.innerHTML = '';
            suggestions.forEach(suggestion => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.textContent = suggestion;
                suggestionsContainer.appendChild(div);
            });
            
            suggestionsContainer.style.display = 'block';
            setupSuggestionClick();
        }

        
        function hideSuggestions() {
            suggestionsContainer.style.display = 'none';
        }

        // mostra erro
        function showError() {
            inputField.classList.add('error');
            errorMessage.style.display = 'block';
        }

        // Limpa erro
        function clearError() {
            inputField.classList.remove('error');
            errorMessage.style.display = 'none';
        }

        // ver se a resposta existe
        function isValidAnswer(answer) {
            const currentQuestion = questions[currentQuestionIndex];
            return currentQuestion.suggestions.includes(answer);
        }

        // trocar pergunta
        function updateQuestion() {
            const currentQuestion = questions[currentQuestionIndex];
            questionNumber.textContent = currentQuestion.id;
            questionText.textContent = currentQuestion.text;
            inputField.value = answers[currentQuestion.id] || '';
            inputField.placeholder = `Digite sua resposta...`;
            
            // barra de progresso
            const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
            progressBar.style.width = `${progress}%`;
            progressPercent.textContent = `${Math.round(progress)}%`;
            
            //resetar botõs
            backButton.disabled = currentQuestionIndex === 0;
            
            
            clearError();
            hideSuggestions();
            
            
            inputField.focus();
        }

        
      nextButton.addEventListener('click', function() {
 
                    const currentQuestionElement = document.querySelector('.question-container');
                    currentQuestionElement.classList.add('question-fade-out');
                    
                   
                    setTimeout(() => {
                        const answer = inputField.value.trim();
                        
                        
                        if (answer === '') {
                            showError();
                            errorMessage.textContent = "Por favor, digite uma resposta.";
                            inputField.focus();
                            currentQuestionElement.classList.remove('question-fade-out'); 
                            return;
                        }
                        
                        if (!isValidAnswer(answer)) {
                            showError();
                            errorMessage.textContent = "Por favor, selecione uma das opções sugeridas.";
                            inputField.focus();
                            currentQuestionElement.classList.remove('question-fade-out'); 
                            return;
                        }
                        
                      
                        const currentQuestion = questions[currentQuestionIndex];
                        answers[currentQuestion.id] = answer;
                        
                        
                        if (currentQuestionIndex < questions.length - 1) {
                            currentQuestionIndex++;
                            updateQuestion(); 
                            
                            
                            const newQuestionElement = document.querySelector('.question-container');
                            newQuestionElement.classList.add('question-fade-in');
                            
                         
                            setTimeout(() => {
                                newQuestionElement.classList.remove('question-fade-in');
                                currentQuestionElement.classList.remove('question-fade-out'); 
                            }, 1000);
                            
                        } else {
                            showResults();
                        }
                        
                    }, 300); 
                });

// 🔙 BACK BUTTON TAMBÉM PRECISA DE ANIMAÇÃO
backButton.addEventListener('click', function() {
    if (currentQuestionIndex > 0) {
        // 🎨 ANIMAÇÃO DE SAÍDA
        const currentQuestionElement = document.querySelector('.question-container');
        currentQuestionElement.classList.add('question-fade-out');
        
        setTimeout(() => {
            // ⬅️ SEU CÓDIGO ORIGINAL
            currentQuestionIndex--;
            updateQuestion();
            
            // 🎨 ANIMAÇÃO DE ENTRADA
            const newQuestionElement = document.querySelector('.question-container');
            newQuestionElement.classList.add('question-fade-in');
            
            setTimeout(() => {
                newQuestionElement.classList.remove('question-fade-in');
            }, 500);
            
        }, 300);
    }
});

        
        backButton.addEventListener('click', function() {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                updateQuestion();
            }
        });

    
    async function showResults() {
        document.querySelector('.question-container').style.display = 'none';
        document.querySelector('.button-container').style.display = 'none';
        document.querySelector('.progress-container').style.display = 'none';
    
        resultsList.innerHTML = '<div class="loading">Salvando triagem...</div>';
        resultsContainer.style.display = 'block';

    
        const salvou = await enviarParaBackend(answers);
        
        if (!salvou) {
            resultsList.innerHTML = `
                <div class="empty-state">
                    <h3>Erro ao salvar triagem</h3>
                    <p>Por favor, tente novamente.</p>
                    <button class="btn btn-primary" onclick="window.location.reload()">Recarregar</button>
                </div>
            `;
            return;
        }

    
        resultsList.innerHTML = '';
        questions.forEach(question => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            
            const questionElem = document.createElement('div');
            questionElem.className = 'result-question';
            questionElem.textContent = question.text;
            
            const answerElem = document.createElement('div');
            answerElem.className = 'result-answer';
            answerElem.textContent = answers[question.id] || 'Não respondida';
            
            resultItem.appendChild(questionElem);
            resultItem.appendChild(answerElem);
            resultsList.appendChild(resultItem);
        });

        
        const successMsg = document.createElement('div');
        successMsg.style.cssText = 'text-align: center; margin-top: 20px; padding: 15px; background: #d4edda; color: #155724; border-radius: 8px;';
        successMsg.innerHTML = `
            <strong>Triagem concluída com sucesso!</strong><br>
            <small>Suas respostas foram salvas no sistema.</small>
        `;
        resultsList.appendChild(successMsg);
}

        
        restartButton.addEventListener('click', function() {
            currentQuestionIndex = 0;
            answers = {};
            
            document.querySelector('.question-container').style.display = 'block';
            document.querySelector('.button-container').style.display = 'flex';
            document.querySelector('.progress-container').style.display = 'block';
            resultsContainer.style.display = 'none';
            
            updateQuestion();
        });

        
        document.addEventListener('click', function(e) {
            if (!inputField.contains(e.target) && !suggestionsContainer.contains(e.target)) {
                hideSuggestions();
            }
        });

       
        inputField.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const answer = inputField.value.trim();
                
                if (answer !== '' && isValidAnswer(answer)) {
                    nextButton.click();
                } else {
                    showError();
                }
            }
        });

       
async function enviarParaBackend(respostas) {
    try {
        const response = await fetch(`${window.API_URL}/api/triagem`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                respostas: respostas
            })
        });

        const result = await response.json();
        
        if (result.success) {
            console.log('Triagem salva no banco de dados ID:', result.id);
            return true;
        } else {
            console.error('Erro ao salvar:', result.message);
            return false;
        }
    } catch (error) {
        console.error('Erro de conexão:', error);
        return false;
    }
}