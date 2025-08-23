# Calculadora de Mesa Pantográfica

Uma aplicação web completa para dimensionamento e análise de mesas pantográficas, desenvolvida em HTML, CSS, JavaScript e Node.js.

## 📋 Sobre o Projeto

A Calculadora de Mesa Pantográfica é uma ferramenta de engenharia que permite calcular e analisar os parâmetros de projeto de mesas pantográficas, incluindo:

- Dimensionamento geométrico das hastes
- Análise de forças nos atuadores e hastes
- Verificação de segurança contra flambagem
- Cálculo do torque necessário nos fusos
- Visualização 2D do mecanismo
- Gráficos de análise de desempenho

## 🚀 Funcionalidades

### 1. Calculadora Principal
- Interface intuitiva para entrada de parâmetros
- Validação automática dos dados de entrada
- Cálculos em tempo real
- Alertas de segurança e avisos

### 2. Visualização 2D
- Diagrama esquemático interativo do mecanismo
- Representação das dimensões calculadas
- Controles para ajuste do ângulo de visualização
- Legenda com identificação dos componentes

### 3. Gráficos de Análise
- **Forças vs Altura**: Variação das forças em função da altura
- **Eficiência Mecânica**: Análise da eficiência do mecanismo
- **Geometria**: Variação das dimensões geométricas

### 4. Informações Técnicas
- Princípio de funcionamento
- Descrição dos componentes
- Detalhes dos cálculos realizados
- Considerações de projeto

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura da aplicação
- **CSS3**: Estilização e layout responsivo
- **JavaScript**: Lógica da aplicação e interatividade
- **Chart.js**: Geração de gráficos
- **Lucide Icons**: Ícones da interface

### Backend
- **Node.js**: Runtime JavaScript
- **Express.js**: Framework web
- **CORS**: Suporte a requisições cross-origin
- **Helmet**: Segurança HTTP
- **Morgan**: Logging de requisições
- **Compression**: Compressão de respostas

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm (versão 8 ou superior)

### Passos para instalação

1. **Clone ou baixe o projeto**
   ```bash
   # Se usando git
   git clone <url-do-repositorio>
   cd mesa-pantografica-web
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute a aplicação**
   ```bash
   npm start
   ```

4. **Acesse a aplicação**
   - Abra o navegador e acesse: `http://localhost:3000`

### Scripts disponíveis

- `npm start`: Inicia o servidor em modo produção
- `npm run dev`: Inicia o servidor em modo desenvolvimento (com nodemon)

## 🏗️ Estrutura do Projeto

```
mesa-pantografica-web/
├── index.html              # Página principal
├── styles.css              # Estilos da aplicação
├── app.js                  # Lógica principal da aplicação
├── calculations.js         # Módulo de cálculos (frontend)
├── calculations-node.js    # Módulo de cálculos (backend)
├── diagram.js              # Módulo de visualização 2D
├── charts.js               # Módulo de gráficos
├── server.js               # Servidor Node.js
├── package.json            # Configurações do projeto
└── README.md               # Documentação
```

## 🔧 API Endpoints

O servidor fornece os seguintes endpoints:

- `GET /` - Página principal da aplicação
- `POST /api/validate` - Validação de parâmetros de entrada
- `POST /api/calculate` - Cálculos completos
- `POST /api/graph-data` - Dados para gráficos
- `GET /api/info` - Informações do sistema
- `GET /api/health` - Status de saúde do servidor

## 📊 Parâmetros de Entrada

- **Carga Máxima (kg)**: Peso máximo suportado pela mesa
- **Largura da Plataforma (mm)**: Dimensão horizontal da plataforma
- **Profundidade da Plataforma (mm)**: Dimensão de profundidade da plataforma
- **Movimento Vertical (mm)**: Curso de movimento vertical
- **Altura Mínima (mm)**: Altura mínima de trabalho
- **Ângulo Máximo (graus)**: Ângulo máximo das hastes

## 📈 Resultados Calculados

- **Comprimento da Haste**: Dimensão das hastes principais
- **Ângulo Mínimo**: Ângulo mínimo de operação
- **Forças no Atuador**: Forças mínima e máxima nos atuadores
- **Força na Haste**: Força de compressão nas hastes
- **Fator de Segurança**: Segurança contra flambagem
- **Torque no Fuso**: Torque necessário para acionamento

## 🔒 Considerações de Segurança

- Fator de segurança mínimo de 3 para flambagem
- Material das hastes: Aço ASTM A36
- Seção das hastes: Barra chata 20x3mm
- Fuso: M10 com passo de 2mm
- Validação automática de parâmetros críticos

## 🎨 Interface Responsiva

A aplicação foi desenvolvida com design responsivo, funcionando adequadamente em:
- Desktops e laptops
- Tablets
- Smartphones

## 🤝 Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

## 👥 Autores

- Mesa Pantográfica Calculator Team

## 📞 Suporte

Para suporte técnico ou dúvidas sobre o projeto, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para a comunidade de engenharia mecânica**

