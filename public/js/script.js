document.addEventListener('DOMContentLoaded', () => {
    const businessesContainer = document.getElementById('businessesContainer');
    const API_BASE_URL = 'https://guianorte.cocrias.com.br/s/api'; // Usando HTTPS conforme discutido

    // Função para verificar autenticação e redirecionar
    function checkAuthAndRedirect() {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            alert('Você não está autenticado. Por favor, faça login.');
            window.location.href = 'login.html'; // Redireciona para a página de login
            return false;
        }
        return true;
    }

    // Função para buscar os negócios do usuário
    async function fetchBusinesses() {
        if (!checkAuthAndRedirect()) {
            return;
        }

        const accessToken = localStorage.getItem('access_token');
        try {
            const response = await fetch(`${API_BASE_URL}/businesses/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (response.ok) {
                const businesses = await response.json();
                renderBusinesses(businesses);
            } else if (response.status === 401) {
                alert('Sessão expirada. Por favor, faça login novamente.');
                window.location.href = 'login.html';
            } else {
                const errorData = await response.json();
                alert(`Erro ao buscar negócios: ${JSON.stringify(errorData)}`);
                console.error('Erro ao buscar negócios:', errorData);
            }
        } catch (error) {
            alert('Ocorreu um erro de rede ao buscar negócios. Tente novamente.');
            console.error('Erro de rede ao buscar negócios:', error);
        }
    }

    // Função para renderizar os cartões de negócio
    function renderBusinesses(businesses) {
        businessesContainer.innerHTML = ''; // Limpa o container antes de adicionar novos cartões

        if (businesses.length === 0) {
            businessesContainer.innerHTML = '<p class="text-center">Nenhum negócio encontrado. Crie um novo para começar!</p>';
            return;
        }

        businesses.forEach(business => {
            const businessCard = document.createElement('div');
            businessCard.className = 'col-md-6 mb-4';
            businessCard.innerHTML = `
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${business.name}</h5>
                        <p class="card-text text-muted">${business.segment} - ${business.city}/${business.state}</p>

                        <hr>

                        <h6>Etapas do Negócio:</h6>
                        <div class="list-group">
                            ${renderStage('Ideação', business.id, business.stage_status?.ideation_status, business.stage_status?.ideation_progress)}
                            ${renderStage('Plano de Negócios', business.id, business.stage_status?.plan_status, business.stage_status?.plan_progress)}
                            ${renderStage('MVP', business.id, business.stage_status?.mvp_status, business.stage_status?.mvp_progress)}
                        </div>
                    </div>
                </div>
            `;
            businessesContainer.appendChild(businessCard);
        });
    }

    // Função auxiliar para renderizar cada etapa
    function renderStage(stageName, businessId, status = 'Não Iniciado', progress = 0) {
        let statusClass = '';
        let buttonText = 'Iniciar Formulário';
        let buttonAction = `startForm('${stageName}', '${businessId}')`;
        let diagnosisButton = '';

        switch (status) {
            case 'Em Andamento':
                statusClass = 'text-warning';
                buttonText = 'Continuar Formulário';
                break;
            case 'Concluído':
                statusClass = 'text-success';
                buttonText = 'Ver Formulário';
                diagnosisButton = `<button class="btn btn-sm btn-info ms-2" onclick="viewDiagnosis('${stageName}', '${businessId}')">Ver Diagnóstico</button>`;
                break;
            default: // Não Iniciado
                statusClass = 'text-secondary';
                break;
        }

        // Lógica específica para o botão de Ideação
        if (stageName === 'Ideação') {
            buttonAction = `window.location.href='01_formulario_ideacao.html?business_id=${businessId}'`;
        } else {
            // Para outras etapas, por enquanto, apenas um alerta
            buttonAction = `alert('Formulário de ${stageName} ainda não implementado.')`;
        }


        return `
            <div class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <strong>${stageName}:</strong> <span class="${statusClass}">${status}</span>
                    <div class="progress mt-1" style="height: 5px;">
                        <div class="progress-bar" role="progressbar" style="width: ${progress}%;" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                <div>
                    <button class="btn btn-sm btn-primary" onclick="${buttonAction}">${buttonText}</button>
                    ${diagnosisButton}
                </div>
            </div>
        `;
    }

    // Funções globais para serem acessíveis pelos onclicks no HTML
    window.startForm = (stageName, businessId) => {
        // Esta função será substituída pela lógica de redirecionamento real
        // para cada formulário quando eles forem criados.
        alert(`Você clicou em ${stageName} para o negócio ${businessId}.`);
    };

    window.viewDiagnosis = (stageName, businessId) => {
        alert(`Visualizar diagnóstico de ${stageName} para o negócio ${businessId}.`);
        // Implementar redirecionamento para a página de diagnóstico
    };

    // Lógica de logout
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token'); // Se você estiver usando refresh tokens
            alert('Você foi desconectado.');
            window.location.href = 'login.html'; // Redireciona para a página de login
        });
    }

    // Inicia o carregamento dos negócios ao carregar a página
    fetchBusinesses();
});
