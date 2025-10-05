# Calculadora de Mesa Pantográfica: Aplicação Web para Dimensionamento e Análise

Este projeto apresenta uma aplicação web completa e interativa para o dimensionamento e análise de mesas pantográficas. Desenvolvida com uma combinação robusta de tecnologias frontend e backend, a ferramenta permite que engenheiros, designers e entusiastas calculem parâmetros críticos, visualizem o mecanismo em 2D e analisem o desempenho de forma intuitiva.

![Imagem de Propaganda](https://github.com/Gustavo-de-Lima-G-000-Akiko-Yuuuki/mesa-pantografica-web/blob/main/Capturar.PNG?raw=true
)

## 📋 Sobre o Projeto

A Calculadora de Mesa Pantográfica é uma solução de engenharia que simplifica o processo de projeto, oferecendo funcionalidades para:

*   **Dimensionamento Geométrico:** Cálculos precisos das hastes e outros componentes.
*   **Análise de Forças:** Determinação das forças nos atuadores e hastes.
*   **Verificação de Segurança:** Análise de flambagem e fatores de segurança.
*   **Cálculo de Torque:** Determinação do torque necessário para os fusos.
*   **Visualização Interativa:** Diagrama 2D do mecanismo com representação das dimensões.
*   **Gráficos de Desempenho:** Visualização de dados como forças vs. altura e eficiência mecânica.

## 🚀 Funcionalidades Detalhadas

### 1. Calculadora Principal

*   **Interface Intuitiva:** Entrada de parâmetros simplificada com validação automática.
*   **Cálculos em Tempo Real:** Resultados atualizados instantaneamente conforme os parâmetros são ajustados.
*   **Alertas e Avisos:** Notificações para garantir a segurança e a viabilidade do projeto.

### 2. Visualização 2D

*   **Diagrama Esquemático Interativo:** Representação visual clara do mecanismo.
*   **Controles de Visualização:** Ajuste do ângulo para diferentes perspectivas.
*   **Legenda de Componentes:** Identificação fácil de cada parte da mesa pantográfica.

### 3. Gráficos de Análise

*   **Forças vs. Altura:** Entenda como as forças variam com a elevação da mesa.
*   **Eficiência Mecânica:** Avalie a eficiência do sistema em diferentes condições.
*   **Geometria:** Visualize as mudanças nas dimensões geométricas durante a operação.

### 4. Informações Técnicas

*   **Princípio de Funcionamento:** Explicação detalhada de como a mesa pantográfica opera.
*   **Descrição de Componentes:** Detalhes sobre cada parte do mecanismo.
*   **Cálculos Realizados:** Transparência sobre as fórmulas e métodos utilizados.
*   **Considerações de Projeto:** Orientações importantes para um projeto seguro e eficiente.

## 🛠️ Tecnologias Utilizadas

### Frontend

*   **HTML5:** Estrutura semântica da aplicação.
*   **CSS3:** Estilização moderna e layout responsivo.
*   **JavaScript:** Lógica interativa e manipulação do DOM.
*   **Chart.js:** Biblioteca para criação de gráficos dinâmicos.
*   **Lucide Icons:** Conjunto de ícones para uma interface limpa e moderna.

### Backend

*   **Node.js:** Ambiente de execução JavaScript robusto.
*   **Express.js:** Framework web para construção de APIs RESTful.
*   **CORS:** Habilita requisições cross-origin para integração flexível.
*   **Helmet:** Coleção de middlewares para segurança HTTP.
*   **Morgan:** Logger de requisições HTTP para monitoramento.
*   **Compression:** Middleware para compressão de respostas HTTP, melhorando o desempenho.

## 📦 Instalação e Execução

### Pré-requisitos

*   Node.js (versão 16 ou superior)
*   npm (versão 8 ou superior)

### Passos para Instalação

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/Gustavo-de-Lima-G-000-Akiko-Yuuuki/mesa-pantografica-web.git
    cd mesa-pantografica-web
    ```
2.  **Instale as Dependências:**
    ```bash
    npm install
    ```
3.  **Execute a Aplicação:**
    ```bash
    npm start
    ```
4.  **Acesse no Navegador:**
    Abra seu navegador e acesse: `http://localhost:3000`

### Scripts Disponíveis

*   `npm start`: Inicia o servidor em modo de produção.
*   `npm run dev`: Inicia o servidor em modo de desenvolvimento (com `nodemon` para recarregamento automático).

## 🏗️ Estrutura do Projeto

```
mesa-pantografica-web/
├── index.html              # Página principal da interface do usuário
├── styles.css              # Folha de estilos CSS
├── app.js                  # Lógica principal do frontend
├── calculations.js         # Módulo de cálculos (frontend)
├── calculations-node.js    # Módulo de cálculos (backend)
├── diagram.js              # Módulo de visualização 2D
├── charts.js               # Módulo de gráficos
├── server.js               # Servidor Node.js (backend)
├── package.json            # Configurações e dependências do projeto
├── package-lock.json       # Bloqueio de dependências
└── README.md               # Documentação do projeto
```

## 🔧 API Endpoints

O servidor backend expõe os seguintes endpoints:

*   `GET /` - Página principal da aplicação.
*   `POST /api/validate` - Validação de parâmetros de entrada.
*   `POST /api/calculate` - Realiza cálculos completos da mesa pantográfica.
*   `POST /api/graph-data` - Fornece dados para a geração de gráficos.
*   `GET /api/info` - Retorna informações do sistema.
*   `GET /api/health` - Verifica o status de saúde do servidor.

## 📊 Parâmetros de Entrada

Os principais parâmetros que podem ser configurados na calculadora incluem:

*   **Carga Máxima (kg):** Peso máximo que a mesa deve suportar.
*   **Largura da Plataforma (mm):** Dimensão horizontal da plataforma superior.
*   **Profundidade da Plataforma (mm):** Dimensão de profundidade da plataforma superior.
*   **Movimento Vertical (mm):** Curso total de elevação da mesa.
*   **Altura Mínima (mm):** Altura da mesa em sua posição mais baixa.
*   **Ângulo Máximo (graus):** Ângulo máximo de abertura das hastes.

## 📈 Resultados Calculados

Com base nos parâmetros de entrada, a aplicação calcula e exibe:

*   **Comprimento da Haste:** Dimensão das hastes principais do mecanismo.
*   **Ângulo Mínimo:** Ângulo de operação da mesa em sua altura mínima.
*   **Forças no Atuador:** Forças mínima e máxima necessárias para acionar a mesa.
*   **Força na Haste:** Força de compressão que as hastes suportam.
*   **Fator de Segurança:** Indicador de segurança contra flambagem das hastes.
*   **Torque no Fuso:** Torque necessário para o acionamento do fuso.

## 🔒 Considerações de Segurança

O projeto incorpora considerações de segurança, como:

*   Fator de segurança mínimo de 3 para flambagem.
*   Material das hastes: Aço ASTM A36.
*   Seção das hastes: Barra chata 20x3mm.
*   Fuso: M10 com passo de 2mm.
*   Validação automática de parâmetros críticos para prevenir erros.

## 🎨 Interface Responsiva

A aplicação foi desenvolvida com um design responsivo, garantindo uma experiência de usuário consistente e agradável em diversos dispositivos:

*   Desktops e Laptops
*   Tablets
*   Smartphones

## 🤝 Contribuição

Contribuições são muito bem-vindas! Se você deseja aprimorar este projeto, siga os passos:

1.  Faça um fork do repositório.
2.  Crie uma nova branch para sua feature (`git checkout -b feature/sua-nova-feature`).
3.  Commit suas mudanças (`git commit -am 'Adiciona sua nova feature'`).
4.  Envie para a branch (`git push origin feature/sua-nova-feature`).
5.  Abra um Pull Request detalhando suas alterações.

## 📝 Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.

## 👥 Autores

*   Mesa Pantográfica Calculator Team

## 📞 Suporte

Para suporte técnico, dúvidas ou sugestões, por favor, abra uma [issue](https://github.com/Gustavo-de-Lima-G-000-Akiko-Yuuuki/mesa-pantografica-web/issues) no repositório. Estamos aqui para ajudar!

**Desenvolvido com ❤️ para a comunidade de engenharia mecânica.**
