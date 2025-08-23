// Módulo de cálculos para mesa pantográfica
// Baseado nos princípios de engenharia mecânica

class PantographicTableCalculator {
    constructor() {
        // Constantes físicas e de materiais
        this.g = 9.81; // Aceleração da gravidade (m/s²)
        this.E_ASTM_A36 = 200e9; // Módulo de elasticidade do aço ASTM A36 (Pa)
        this.PI = Math.PI;
    }

    /**
     * Converte graus para radianos
     * @param {number} degrees - Ângulo em graus
     * @returns {number} Ângulo em radianos
     */
    degreesToRadians(degrees) {
        return (degrees * this.PI) / 180;
    }

    /**
     * Converte radianos para graus
     * @param {number} radians - Ângulo em radianos
     * @returns {number} Ângulo em graus
     */
    radiansToDegrees(radians) {
        return (radians * 180) / this.PI;
    }

    /**
     * Calcula o comprimento da haste baseado na altura máxima e ângulo máximo
     * @param {number} h_max - Altura máxima (m)
     * @param {number} theta_max - Ângulo máximo (rad)
     * @returns {number} Comprimento da haste (m)
     */
    calculateRodLength(h_max, theta_max) {
        return h_max / (2 * Math.sin(theta_max));
    }

    /**
     * Calcula o ângulo mínimo baseado na altura mínima e comprimento da haste
     * @param {number} h_min - Altura mínima (m)
     * @param {number} L - Comprimento da haste (m)
     * @returns {number} Ângulo mínimo (rad)
     */
    calculateMinAngle(h_min, L) {
        const sinValue = h_min / (2 * L);
        // Verificar se o valor está dentro do domínio válido para arcsin
        if (sinValue > 1 || sinValue < -1) {
            throw new Error('Configuração inválida: altura mínima incompatível com o comprimento da haste');
        }
        return Math.asin(sinValue);
    }

    /**
     * Calcula a força necessária no atuador
     * @param {number} P - Carga vertical (N)
     * @param {number} theta - Ângulo da haste (rad)
     * @returns {number} Força no atuador (N)
     */
    calculateActuatorForce(P, theta) {
        const tanValue = Math.tan(theta);
        if (tanValue === 0) {
            throw new Error('Ângulo inválido: tangente zero');
        }
        return P / (2 * tanValue);
    }

    /**
     * Calcula a força de compressão na haste
     * @param {number} P - Carga vertical (N)
     * @param {number} theta - Ângulo da haste (rad)
     * @returns {number} Força na haste (N)
     */
    calculateRodForce(P, theta) {
        const sinValue = Math.sin(theta);
        if (sinValue === 0) {
            throw new Error('Ângulo inválido: seno zero');
        }
        return P / (4 * sinValue);
    }

    /**
     * Calcula a carga crítica de flambagem (Fórmula de Euler)
     * @param {number} E - Módulo de elasticidade (Pa)
     * @param {number} I - Momento de inércia (m⁴)
     * @param {number} K - Fator de comprimento efetivo
     * @param {number} L - Comprimento da haste (m)
     * @returns {number} Carga crítica de flambagem (N)
     */
    calculateBucklingLoad(E, I, K, L) {
        return (this.PI * this.PI * E * I) / Math.pow(K * L, 2);
    }

    /**
     * Calcula o momento de inércia para uma seção retangular
     * @param {number} b - Largura (m)
     * @param {number} t - Espessura (m)
     * @returns {number} Momento de inércia (m⁴)
     */
    calculateRectangularMomentOfInertia(b, t) {
        // Para uma seção retangular, I = (b * t³) / 12
        // Usamos a menor dimensão como altura para obter o menor I
        const width = Math.max(b, t);
        const height = Math.min(b, t);
        return (width * Math.pow(height, 3)) / 12;
    }

    /**
     * Calcula o torque necessário no fuso
     * @param {number} F_actuator - Força no atuador (N)
     * @param {number} p - Passo da rosca (m)
     * @param {number} mu - Coeficiente de atrito
     * @param {number} d_m - Diâmetro médio da rosca (m)
     * @returns {number} Torque necessário (Nm)
     */
    calculateScrewTorque(F_actuator, p, mu, d_m) {
        const mechanicalAdvantage = p / (2 * this.PI);
        const frictionTorque = (mu * d_m) / 2;
        return F_actuator * mechanicalAdvantage + frictionTorque;
    }

    /**
     * Realiza todos os cálculos principais para a mesa pantográfica
     * @param {Object} inputs - Parâmetros de entrada
     * @returns {Object} Resultados dos cálculos
     */
    calculateAll(inputs) {
        try {
            const {
                carga, // kg
                largura, // mm
                profundidade, // mm
                movimentoVertical, // mm
                alturaMinima, // mm
                anguloMaximo // graus
            } = inputs;

            // Conversões para SI
            const P = carga * this.g; // N
            const h_min = alturaMinima / 1000; // m
            const h_max = (alturaMinima + movimentoVertical) / 1000; // m
            const theta_max = this.degreesToRadians(anguloMaximo); // rad

            // Cálculos geométricos
            const L = this.calculateRodLength(h_max, theta_max);
            const theta_min = this.calculateMinAngle(h_min, L);
            const theta_min_deg = this.radiansToDegrees(theta_min);

            // Forças no ângulo mínimo (condição crítica)
            const F_atuador_min = this.calculateActuatorForce(P, theta_min);
            const F_haste_min = this.calculateRodForce(P, theta_min);

            // Forças no ângulo máximo
            const F_atuador_max = this.calculateActuatorForce(P, theta_max);
            const F_haste_max = this.calculateRodForce(P, theta_max);

            // Dimensionamento da haste (barra chata 20x3mm)
            const b = 0.020; // m
            const t = 0.003; // m
            const I = this.calculateRectangularMomentOfInertia(b, t);
            const K = 1.0; // bi-articulada
            const P_cr = this.calculateBucklingLoad(this.E_ASTM_A36, I, K, L);

            // Fator de segurança contra flambagem
            const FS_flambagem = P_cr / F_haste_min;

            // Dimensionamento do fuso (10mm, passo 2mm)
            const d_nom = 0.010; // m
            const p = 0.002; // m
            const d_m = 0.009; // m
            const mu = 0.2;
            const T = this.calculateScrewTorque(F_atuador_min, p, mu, d_m);

            // Cálculo da distância horizontal máxima da base
            const x_max = 2 * L * Math.cos(theta_max);

            return {
                // Geometria
                L: L * 1000, // mm
                theta_min_deg,
                theta_max_deg: anguloMaximo,
                x_max: x_max * 1000, // mm

                // Forças
                F_atuador_min,
                F_atuador_max,
                F_haste_min,
                F_haste_max,

                // Resistência
                P_cr: P_cr / 1000, // kN
                FS_flambagem,

                // Fuso
                T: T * 1000, // mNm

                // Propriedades da seção
                I: I * 1e12, // mm⁴
                
                // Status de segurança
                isSafe: FS_flambagem > 3, // Fator de segurança mínimo de 3
                
                // Eficiência do mecanismo
                efficiency_min: (F_haste_min * Math.sin(theta_min)) / F_atuador_min,
                efficiency_max: (F_haste_max * Math.sin(theta_max)) / F_atuador_max
            };
        } catch (error) {
            console.error('Erro nos cálculos:', error);
            return {
                error: error.message,
                isValid: false
            };
        }
    }

    /**
     * Gera dados para gráficos baseados nos parâmetros de entrada
     * @param {Object} inputs - Parâmetros de entrada
     * @param {number} steps - Número de pontos para o gráfico
     * @returns {Array} Array de dados para gráficos
     */
    generateGraphData(inputs, steps = 30) {
        try {
            const results = this.calculateAll(inputs);
            if (results.error) {
                return [];
            }

            const { alturaMinima, movimentoVertical, carga } = inputs;
            const P = carga * this.g;
            const h_min = alturaMinima / 1000;
            const h_max = (alturaMinima + movimentoVertical) / 1000;
            const L = results.L / 1000;

            const data = [];
            const stepSize = (h_max - h_min) / (steps - 1);

            for (let i = 0; i < steps; i++) {
                const h = h_min + (i * stepSize);
                const theta = Math.asin(h / (2 * L));
                const theta_deg = this.radiansToDegrees(theta);
                
                const F_atuador = this.calculateActuatorForce(P, theta);
                const F_haste = this.calculateRodForce(P, theta);
                
                // Distância horizontal da base
                const x = 2 * L * Math.cos(theta);
                
                // Eficiência mecânica
                const efficiency = (F_haste * Math.sin(theta)) / F_atuador;

                data.push({
                    altura: h * 1000, // mm
                    angulo: theta_deg,
                    forcaAtuador: F_atuador,
                    forcaHaste: F_haste,
                    distanciaHorizontal: x * 1000, // mm
                    eficiencia: efficiency * 100 // %
                });
            }

            return data;
        } catch (error) {
            console.error('Erro na geração de dados do gráfico:', error);
            return [];
        }
    }

    /**
     * Valida os parâmetros de entrada
     * @param {Object} inputs - Parâmetros de entrada
     * @returns {Object} Resultado da validação
     */
    validateInputs(inputs) {
        const errors = [];
        const warnings = [];

        const { carga, largura, profundidade, movimentoVertical, alturaMinima, anguloMaximo } = inputs;

        // Validações básicas
        if (carga <= 0) errors.push('A carga deve ser maior que zero');
        if (largura <= 0) errors.push('A largura deve ser maior que zero');
        if (profundidade <= 0) errors.push('A profundidade deve ser maior que zero');
        if (movimentoVertical <= 0) errors.push('O movimento vertical deve ser maior que zero');
        if (alturaMinima <= 0) errors.push('A altura mínima deve ser maior que zero');
        if (anguloMaximo <= 0 || anguloMaximo >= 90) errors.push('O ângulo máximo deve estar entre 0 e 90 graus');

        // Validações de engenharia
        if (carga > 50) warnings.push('Carga elevada - considere verificar a estrutura');
        if (anguloMaximo < 30) warnings.push('Ângulo máximo baixo pode resultar em forças elevadas');
        if (anguloMaximo > 75) warnings.push('Ângulo máximo alto pode comprometer a estabilidade');
        if (movimentoVertical > alturaMinima * 5) warnings.push('Movimento vertical muito grande em relação à altura mínima');

        return {
            isValid: errors.length === 0,
            errors,
            warnings
        };
    }
}

// Instância singleton para uso na aplicação
const calculator = new PantographicTableCalculator();

