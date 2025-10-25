 // Banco de dados de perguntas e sugestões
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

        // Inicializar a primeira pergunta
        updateQuestion();

        // Evento de input para mostrar sugestões
        inputField.addEventListener('input', function() {
            const value = this.value.toLowerCase();
            const currentQuestion = questions[currentQuestionIndex];
            
            // Limpar erro quando o usuário começar a digitar
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

        // Evento para quando uma sugestão é clicada
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

        // Esconder sugestões
        function hideSuggestions() {
            suggestionsContainer.style.display = 'none';
        }

        // Mostrar erro
        function showError() {
            inputField.classList.add('error');
            errorMessage.style.display = 'block';
        }

        // Limpar erro
        function clearError() {
            inputField.classList.remove('error');
            errorMessage.style.display = 'none';
        }

        // Validar se a resposta está nas sugestões
        function isValidAnswer(answer) {
            const currentQuestion = questions[currentQuestionIndex];
            return currentQuestion.suggestions.includes(answer);
        }

        // Atualizar a pergunta atual
        function updateQuestion() {
            const currentQuestion = questions[currentQuestionIndex];
            questionNumber.textContent = currentQuestion.id;
            questionText.textContent = currentQuestion.text;
            inputField.value = answers[currentQuestion.id] || '';
            inputField.placeholder = `Digite sua resposta...`;
            
            // Atualizar progresso
            const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
            progressBar.style.width = `${progress}%`;
            progressPercent.textContent = `${Math.round(progress)}%`;
            
            // Atualizar estado dos botões
            backButton.disabled = currentQuestionIndex === 0;
            
            // Limpar erros e sugestões
            clearError();
            hideSuggestions();
            
            // Focar no campo de entrada
            inputField.focus();
        }

        // Próxima pergunta
        nextButton.addEventListener('click', function() {
            const answer = inputField.value.trim();
            
            // Validar se a resposta está vazia
            if (answer === '') {
                showError();
                errorMessage.textContent = "Por favor, digite uma resposta.";
                inputField.focus();
                return;
            }
            
            // Validar se a resposta está nas sugestões
            if (!isValidAnswer(answer)) {
                showError();
                errorMessage.textContent = "Por favor, selecione uma das opções sugeridas.";
                inputField.focus();
                return;
            }
            
            // Salvar resposta
            const currentQuestion = questions[currentQuestionIndex];
            answers[currentQuestion.id] = answer;
            
            // Avançar para próxima pergunta ou mostrar resultados
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                updateQuestion();
            } else {
                showResults();
            }
        });

        // Voltar para pergunta anterior
        backButton.addEventListener('click', function() {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                updateQuestion();
            }
        });

        // Mostrar resultados
        function showResults() {
            document.querySelector('.question-container').style.display = 'none';
            document.querySelector('.button-container').style.display = 'none';
            document.querySelector('.progress-container').style.display = 'none';
            
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
            
            resultsContainer.style.display = 'block';
        }

        // Reiniciar triagem
        restartButton.addEventListener('click', function() {
            currentQuestionIndex = 0;
            answers = {};
            
            document.querySelector('.question-container').style.display = 'block';
            document.querySelector('.button-container').style.display = 'flex';
            document.querySelector('.progress-container').style.display = 'block';
            resultsContainer.style.display = 'none';
            
            updateQuestion();
        });

        // Esconder sugestões quando clicar fora
        document.addEventListener('click', function(e) {
            if (!inputField.contains(e.target) && !suggestionsContainer.contains(e.target)) {
                hideSuggestions();
            }
        });

        // Permitir envio com Enter (apenas se a resposta for válida)
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