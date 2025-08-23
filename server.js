const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

// Importar a classe de cálculos (versão Node.js)
const { PantographicTableCalculator } = require('./calculations-node.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Instanciar calculadora
const calculator = new PantographicTableCalculator();

// Middlewares de segurança e otimização
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://unpkg.com", "https://cdn.jsdelivr.net"],
            imgSrc: ["'self'", "data:", "https:"],
            fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
            connectSrc: ["'self'"]
        }
    }
}));

app.use(compression());
app.use(morgan('combined'));

// CORS - permitir acesso de qualquer origem
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Middleware para parsing JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname), {
    maxAge: '1d',
    etag: true
}));

// Rota principal - servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API Routes

/**
 * Rota para validar inputs
 */
app.post('/api/validate', (req, res) => {
    try {
        const inputs = req.body;
        const validation = calculator.validateInputs(inputs);
        
        res.json({
            success: true,
            data: validation
        });
    } catch (error) {
        console.error('Erro na validação:', error);
        res.status(500).json({
            success: false,
            error: 'Erro interno do servidor',
            message: error.message
        });
    }
});

/**
 * Rota para calcular todos os parâmetros
 */
app.post('/api/calculate', (req, res) => {
    try {
        const inputs = req.body;
        
        // Validar inputs primeiro
        const validation = calculator.validateInputs(inputs);
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                error: 'Inputs inválidos',
                validation: validation
            });
        }
        
        // Realizar cálculos
        const results = calculator.calculateAll(inputs);
        
        if (results.error) {
            return res.status(400).json({
                success: false,
                error: 'Erro nos cálculos',
                message: results.error
            });
        }
        
        res.json({
            success: true,
            data: {
                inputs: inputs,
                results: results,
                validation: validation
            }
        });
    } catch (error) {
        console.error('Erro no cálculo:', error);
        res.status(500).json({
            success: false,
            error: 'Erro interno do servidor',
            message: error.message
        });
    }
});

/**
 * Rota para gerar dados de gráficos
 */
app.post('/api/graph-data', (req, res) => {
    try {
        const inputs = req.body;
        const steps = req.body.steps || 30;
        
        const graphData = calculator.generateGraphData(inputs, steps);
        
        res.json({
            success: true,
            data: graphData
        });
    } catch (error) {
        console.error('Erro na geração de dados do gráfico:', error);
        res.status(500).json({
            success: false,
            error: 'Erro interno do servidor',
            message: error.message
        });
    }
});

/**
 * Rota para obter informações do sistema
 */
app.get('/api/info', (req, res) => {
    res.json({
        success: true,
        data: {
            name: 'Mesa Pantográfica Calculator',
            version: '1.0.0',
            description: 'Ferramenta para dimensionamento e análise de mesas pantográficas',
            author: 'Mesa Pantográfica Calculator Team',
            endpoints: [
                'GET /',
                'POST /api/validate',
                'POST /api/calculate',
                'POST /api/graph-data',
                'GET /api/info',
                'GET /api/health'
            ]
        }
    });
});

/**
 * Rota de health check
 */
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

/**
 * Middleware para capturar rotas não encontradas
 */
app.use('*', (req, res) => {
    // Se for uma rota de API, retornar JSON
    if (req.originalUrl.startsWith('/api/')) {
        return res.status(404).json({
            success: false,
            error: 'Endpoint não encontrado',
            path: req.originalUrl
        });
    }
    
    // Para outras rotas, servir o index.html (SPA behavior)
    res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * Middleware global de tratamento de erros
 */
app.use((error, req, res, next) => {
    console.error('Erro não tratado:', error);
    
    res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Algo deu errado'
    });
});

/**
 * Iniciar servidor
 */
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
🚀 Servidor da Calculadora de Mesa Pantográfica iniciado!

📍 Endereço: http://localhost:${PORT}
🌐 Ambiente: ${process.env.NODE_ENV || 'development'}
⏰ Iniciado em: ${new Date().toLocaleString('pt-BR')}

📋 Endpoints disponíveis:
   GET  /                    - Interface principal
   POST /api/validate       - Validar parâmetros de entrada
   POST /api/calculate      - Realizar cálculos completos
   POST /api/graph-data     - Gerar dados para gráficos
   GET  /api/info          - Informações do sistema
   GET  /api/health        - Status de saúde do servidor

🔧 Para parar o servidor: Ctrl+C
    `);
});

// Tratamento graceful de shutdown
process.on('SIGTERM', () => {
    console.log('🛑 Recebido SIGTERM. Encerrando servidor graciosamente...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 Recebido SIGINT. Encerrando servidor graciosamente...');
    process.exit(0);
});

module.exports = app;

