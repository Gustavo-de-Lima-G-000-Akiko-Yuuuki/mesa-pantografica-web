// Aplicação principal da Calculadora de Mesa Pantográfica

class PantographicCalculatorApp {
    constructor() {
        this.inputs = {
            carga: 8,
            largura: 200,
            profundidade: 200,
            movimentoVertical: 150,
            alturaMinima: 50,
            anguloMaximo: 60
        };
        
        this.results = {};
        this.graphData = [];
        this.validation = { isValid: true, errors: [], warnings: [] };
        
        this.init();
    }

    /**
     * Inicializa a aplicação
     */
    init() {
        this.setupEventListeners();
        this.initializeLucideIcons();
        this.calculate();
        
        // Mostrar primeira aba por padrão
        this.showTab('calculator');
    }

    /**
     * Configura os event listeners
     */
    setupEventListeners() {
        // Event listeners para inputs
        const inputIds = ['carga', 'largura', 'profundidade', 'movimentoVertical', 'alturaMinima', 'anguloMaximo'];
        inputIds.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', (e) => {
                    this.handleInputChange(id, e.target.value);
                });
            }
        });

        // Event listeners para tabs
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const tabId = button.getAttribute('data-tab');
                this.showTab(tabId);
            });
        });

        // Event listener para o slider de visualização
        const visualTheta = document.getElementById('visualTheta');
        if (visualTheta) {
            visualTheta.addEventListener('input', (e) => {
                this.updateVisualization(parseFloat(e.target.value));
            });
        }
    }

    /**
     * Inicializa os ícones do Lucide
     */
    initializeLucideIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    /**
     * Manipula mudanças nos inputs
     * @param {string} field - Campo que foi alterado
     * @param {string} value - Novo valor
     */
    handleInputChange(field, value) {
        const numValue = parseFloat(value) || 0;
        this.inputs[field] = numValue;
        this.calculate();
    }

    /**
     * Realiza todos os cálculos
     */
    calculate() {
        // Validar inputs
        this.validation = calculator.validateInputs(this.inputs);
        this.displayValidation();

        if (this.validation.isValid) {
            // Calcular resultados
            this.results = calculator.calculateAll(this.inputs);
            this.displayResults();
            
            // Gerar dados para gráficos
            if (!this.results.error) {
                this.graphData = calculator.generateGraphData(this.inputs);
                this.updateCharts();
                this.updateVisualizationControls();
            }
        }
    }

    /**
     * Exibe alertas de validação
     */
    displayValidation() {
        const alertsContainer = document.getElementById('validation-alerts');
        if (!alertsContainer) return;

        alertsContainer.innerHTML = '';

        // Erros
        if (!this.validation.isValid) {
            const errorAlert = this.createAlert('error', 'Erros encontrados:', this.validation.errors);
            alertsContainer.appendChild(errorAlert);
        }

        // Avisos
        if (this.validation.warnings.length > 0) {
            const warningAlert = this.createAlert('warning', 'Avisos:', this.validation.warnings);
            alertsContainer.appendChild(warningAlert);
        }

        // Status de segurança
        if (this.results.isSafe !== undefined) {
            const safetyType = this.results.isSafe ? 'success' : 'error';
            const safetyMessage = this.results.isSafe ? 
                'Configuração segura - Fator de segurança adequado' : 
                'Atenção - Fator de segurança baixo, considere revisar as dimensões';
            
            const safetyAlert = this.createAlert(safetyType, 'Status de Segurança:', [safetyMessage]);
            alertsContainer.appendChild(safetyAlert);
        }
    }

    /**
     * Cria um elemento de alerta
     * @param {string} type - Tipo do alerta (error, warning, success)
     * @param {string} title - Título do alerta
     * @param {Array} messages - Lista de mensagens
     * @returns {HTMLElement} Elemento do alerta
     */
    createAlert(type, title, messages) {
        const alert = document.createElement('div');
        alert.className = `alert ${type}`;

        const iconName = type === 'error' ? 'alert-triangle' : 
                        type === 'warning' ? 'alert-triangle' : 'check-circle';
        
        alert.innerHTML = `
            <i data-lucide="${iconName}"></i>
            <div class="alert-content">
                <strong>${title}</strong>
                <ul>
                    ${messages.map(msg => `<li>${msg}</li>`).join('')}
                </ul>
            </div>
        `;

        return alert;
    }

    /**
     * Exibe os resultados dos cálculos
     */
    displayResults() {
        if (this.results.error) return;

        // Atualizar elementos de resultado
        this.updateElement('result-L', `${this.results.L?.toFixed(1)} mm`);
        this.updateElement('result-theta-min', `${this.results.theta_min_deg?.toFixed(1)}°`);
        this.updateElement('result-f-atuador-min', `${this.results.F_atuador_min?.toFixed(1)} N`);
        this.updateElement('result-f-atuador-max', `${this.results.F_atuador_max?.toFixed(1)} N`);
        this.updateElement('result-f-haste-min', `${this.results.F_haste_min?.toFixed(1)} N`);
        this.updateElement('result-fs-flambagem', `${this.results.FS_flambagem?.toFixed(0)}x`);
        this.updateElement('result-torque', `${this.results.T?.toFixed(1)} mNm`);
    }

    /**
     * Atualiza o conteúdo de um elemento
     * @param {string} id - ID do elemento
     * @param {string} content - Novo conteúdo
     */
    updateElement(id, content) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = content;
        }
    }

    /**
     * Atualiza os gráficos
     */
    updateCharts() {
        if (this.graphData && this.graphData.length > 0) {
            chartManager.updateAllCharts(this.graphData);
        }
    }

    /**
     * Atualiza os controles de visualização
     */
    updateVisualizationControls() {
        if (!this.results.theta_min_deg) return;

        const visualTheta = document.getElementById('visualTheta');
        const thetaMinLabel = document.getElementById('theta-min-label');
        const thetaMaxLabel = document.getElementById('theta-max-label');

        if (visualTheta) {
            visualTheta.min = this.results.theta_min_deg;
            visualTheta.max = this.inputs.anguloMaximo;
            visualTheta.value = this.results.theta_min_deg;
        }

        if (thetaMinLabel) {
            thetaMinLabel.textContent = `${this.results.theta_min_deg.toFixed(1)}°`;
        }

        if (thetaMaxLabel) {
            thetaMaxLabel.textContent = `${this.inputs.anguloMaximo}°`;
        }

        // Atualizar visualização inicial
        this.updateVisualization(this.results.theta_min_deg);
    }

    /**
     * Atualiza a visualização 2D
     * @param {number} theta - Ângulo em graus
     */
    updateVisualization(theta) {
        if (!this.results.L) return;

        // Atualizar diagrama
        updateDiagram(this.results.L, theta);

        // Atualizar informações do ângulo atual
        const L_m = this.results.L / 1000;
        const theta_rad = (theta * Math.PI) / 180;
        
        const currentHeight = 2 * L_m * Math.sin(theta_rad) * 1000; // mm
        const currentWidth = 2 * L_m * Math.cos(theta_rad) * 1000; // mm

        this.updateElement('current-height', `${currentHeight.toFixed(1)} mm`);
        this.updateElement('current-width', `${currentWidth.toFixed(1)} mm`);
    }

    /**
     * Mostra uma aba específica
     * @param {string} tabId - ID da aba
     */
    showTab(tabId) {
        // Remover classe active de todos os botões e conteúdos
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => button.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Adicionar classe active ao botão e conteúdo selecionados
        const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
        const activeContent = document.getElementById(`${tabId}-tab`);

        if (activeButton) activeButton.classList.add('active');
        if (activeContent) activeContent.classList.add('active');

        // Reinicializar ícones após mudança de aba
        setTimeout(() => {
            this.initializeLucideIcons();
            
            // Se for a aba de gráficos, atualizar os gráficos
            if (tabId === 'graphs' && this.graphData.length > 0) {
                setTimeout(() => {
                    this.updateCharts();
                }, 100);
            }
            
            // Se for a aba de visualização, atualizar o diagrama
            if (tabId === 'visualization' && this.results.L) {
                setTimeout(() => {
                    const visualTheta = document.getElementById('visualTheta');
                    const currentTheta = visualTheta ? parseFloat(visualTheta.value) : this.results.theta_min_deg;
                    this.updateVisualization(currentTheta);
                }, 100);
            }
        }, 50);
    }
}

// Inicializar aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const app = new PantographicCalculatorApp();
    
    // Tornar a aplicação globalmente acessível para debug
    window.pantographicApp = app;
});

