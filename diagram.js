// Módulo para desenhar o diagrama 2D da mesa pantográfica

class PantographicDiagram {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.scale = 1;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    /**
     * Desenha o diagrama da mesa pantográfica
     * @param {number} L - Comprimento da haste (mm)
     * @param {number} theta - Ângulo da haste (graus)
     * @param {boolean} showDimensions - Mostrar dimensões
     */
    draw(L, theta, showDimensions = true) {
        // Limpar canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Configurar escala e posicionamento
        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;
        
        // Converter ângulo para radianos
        const thetaRad = (theta * Math.PI) / 180;
        
        // Calcular dimensões do mecanismo
        const height = 2 * L * Math.sin(thetaRad);
        const baseWidth = 2 * L * Math.cos(thetaRad);
        
        // Calcular escala para caber no canvas
        const margin = 50;
        const scaleX = (canvasWidth - 2 * margin) / baseWidth;
        const scaleY = (canvasHeight - 2 * margin) / (height + 100); // +100 para base
        this.scale = Math.min(scaleX, scaleY, 2); // Máximo 2x
        
        // Calcular offset para centralizar
        this.offsetX = canvasWidth / 2;
        this.offsetY = canvasHeight - margin - 50 * this.scale;
        
        // Configurar estilo
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        
        // Desenhar base fixa
        this.drawBase(baseWidth);
        
        // Desenhar hastes
        this.drawRods(L, thetaRad);
        
        // Desenhar plataforma
        this.drawPlatform(L, thetaRad);
        
        // Desenhar atuadores
        this.drawActuators(L, thetaRad);
        
        // Desenhar dimensões se solicitado
        if (showDimensions) {
            this.drawDimensions(L, thetaRad, height, baseWidth);
        }
        
        // Desenhar legenda
        this.drawLegend();
    }

    /**
     * Desenha a base fixa
     * @param {number} baseWidth - Largura da base (mm)
     */
    drawBase(baseWidth) {
        const baseHeight = 20;
        const x1 = this.offsetX - (baseWidth * this.scale) / 2;
        const x2 = this.offsetX + (baseWidth * this.scale) / 2;
        const y = this.offsetY;
        
        // Base principal
        this.ctx.fillStyle = '#6b7280';
        this.ctx.fillRect(x1, y, x2 - x1, baseHeight * this.scale);
        
        // Parafusos de fixação
        this.ctx.fillStyle = '#374151';
        const screwSize = 4 * this.scale;
        const screwSpacing = baseWidth * this.scale / 6;
        
        for (let i = 1; i <= 5; i++) {
            const screwX = x1 + i * screwSpacing;
            this.ctx.beginPath();
            this.ctx.arc(screwX, y + baseHeight * this.scale / 2, screwSize, 0, 2 * Math.PI);
            this.ctx.fill();
        }
        
        // Texto da base
        this.ctx.fillStyle = '#1f2937';
        this.ctx.font = `${12 * this.scale}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Base Fixa', this.offsetX, y + baseHeight * this.scale + 20);
    }

    /**
     * Desenha as hastes principais
     * @param {number} L - Comprimento da haste (mm)
     * @param {number} thetaRad - Ângulo em radianos
     */
    drawRods(L, thetaRad) {
        const rodWidth = 6 * this.scale;
        
        // Pontos de articulação
        const baseLeft = this.offsetX - L * Math.cos(thetaRad) * this.scale;
        const baseRight = this.offsetX + L * Math.cos(thetaRad) * this.scale;
        const topLeft = this.offsetX - L * Math.cos(thetaRad) * this.scale;
        const topRight = this.offsetX + L * Math.cos(thetaRad) * this.scale;
        const baseY = this.offsetY;
        const topY = this.offsetY - 2 * L * Math.sin(thetaRad) * this.scale;
        
        // Haste esquerda
        this.ctx.strokeStyle = '#10b981';
        this.ctx.lineWidth = rodWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(baseLeft, baseY);
        this.ctx.lineTo(topLeft, topY);
        this.ctx.stroke();
        
        // Haste direita
        this.ctx.beginPath();
        this.ctx.moveTo(baseRight, baseY);
        this.ctx.lineTo(topRight, topY);
        this.ctx.stroke();
        
        // Articulações
        this.drawJoint(baseLeft, baseY);
        this.drawJoint(baseRight, baseY);
        this.drawJoint(topLeft, topY);
        this.drawJoint(topRight, topY);
    }

    /**
     * Desenha uma articulação
     * @param {number} x - Posição X
     * @param {number} y - Posição Y
     */
    drawJoint(x, y) {
        const jointSize = 8 * this.scale;
        
        // Círculo externo
        this.ctx.fillStyle = '#374151';
        this.ctx.beginPath();
        this.ctx.arc(x, y, jointSize, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Círculo interno
        this.ctx.fillStyle = '#9ca3af';
        this.ctx.beginPath();
        this.ctx.arc(x, y, jointSize * 0.6, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    /**
     * Desenha a plataforma móvel
     * @param {number} L - Comprimento da haste (mm)
     * @param {number} thetaRad - Ângulo em radianos
     */
    drawPlatform(L, thetaRad) {
        const platformWidth = L * 1.2 * this.scale;
        const platformHeight = 15 * this.scale;
        const platformY = this.offsetY - 2 * L * Math.sin(thetaRad) * this.scale;
        
        // Plataforma principal
        this.ctx.fillStyle = '#3b82f6';
        this.ctx.fillRect(
            this.offsetX - platformWidth / 2,
            platformY - platformHeight,
            platformWidth,
            platformHeight
        );
        
        // Bordas da plataforma
        this.ctx.strokeStyle = '#1e40af';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(
            this.offsetX - platformWidth / 2,
            platformY - platformHeight,
            platformWidth,
            platformHeight
        );
        
        // Padrão antiderrapante
        this.ctx.strokeStyle = '#1e40af';
        this.ctx.lineWidth = 1;
        const patternSpacing = 20 * this.scale;
        
        for (let i = -platformWidth / 2; i < platformWidth / 2; i += patternSpacing) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.offsetX + i, platformY - platformHeight);
            this.ctx.lineTo(this.offsetX + i, platformY);
            this.ctx.stroke();
        }
        
        // Texto da plataforma
        this.ctx.fillStyle = '#1f2937';
        this.ctx.font = `${10 * this.scale}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Plataforma Móvel', this.offsetX, platformY - platformHeight - 10);
    }

    /**
     * Desenha os atuadores (fusos)
     * @param {number} L - Comprimento da haste (mm)
     * @param {number} thetaRad - Ângulo em radianos
     */
    drawActuators(L, thetaRad) {
        const actuatorWidth = 8 * this.scale;
        const baseY = this.offsetY;
        const topY = this.offsetY - 2 * L * Math.sin(thetaRad) * this.scale;
        const leftX = this.offsetX - L * Math.cos(thetaRad) * this.scale;
        const rightX = this.offsetX + L * Math.cos(thetaRad) * this.scale;
        
        // Atuador esquerdo
        this.ctx.strokeStyle = '#ef4444';
        this.ctx.lineWidth = actuatorWidth;
        this.ctx.setLineDash([10 * this.scale, 5 * this.scale]);
        this.ctx.beginPath();
        this.ctx.moveTo(leftX, baseY);
        this.ctx.lineTo(leftX, topY);
        this.ctx.stroke();
        
        // Atuador direito
        this.ctx.beginPath();
        this.ctx.moveTo(rightX, baseY);
        this.ctx.lineTo(rightX, topY);
        this.ctx.stroke();
        
        // Resetar linha tracejada
        this.ctx.setLineDash([]);
        
        // Motores dos atuadores
        const motorSize = 15 * this.scale;
        this.ctx.fillStyle = '#dc2626';
        this.ctx.fillRect(leftX - motorSize / 2, baseY, motorSize, motorSize);
        this.ctx.fillRect(rightX - motorSize / 2, baseY, motorSize, motorSize);
    }

    /**
     * Desenha as dimensões do mecanismo
     * @param {number} L - Comprimento da haste (mm)
     * @param {number} thetaRad - Ângulo em radianos
     * @param {number} height - Altura total (mm)
     * @param {number} baseWidth - Largura da base (mm)
     */
    drawDimensions(L, thetaRad, height, baseWidth) {
        this.ctx.strokeStyle = '#6b7280';
        this.ctx.fillStyle = '#6b7280';
        this.ctx.lineWidth = 1;
        this.ctx.font = `${10 * this.scale}px Arial`;
        this.ctx.textAlign = 'center';
        
        // Dimensão da altura
        const heightLineX = this.offsetX + (baseWidth * this.scale) / 2 + 30;
        const baseY = this.offsetY;
        const topY = this.offsetY - height * this.scale;
        
        // Linha de cota vertical
        this.drawDimensionLine(
            heightLineX, baseY,
            heightLineX, topY,
            `${height.toFixed(1)} mm`,
            'vertical'
        );
        
        // Dimensão da largura da base
        const widthLineY = this.offsetY + 40;
        const leftX = this.offsetX - (baseWidth * this.scale) / 2;
        const rightX = this.offsetX + (baseWidth * this.scale) / 2;
        
        // Linha de cota horizontal
        this.drawDimensionLine(
            leftX, widthLineY,
            rightX, widthLineY,
            `${baseWidth.toFixed(1)} mm`,
            'horizontal'
        );
        
        // Dimensão do comprimento da haste
        const rodStartX = this.offsetX - L * Math.cos(thetaRad) * this.scale;
        const rodStartY = this.offsetY;
        const rodEndX = this.offsetX - L * Math.cos(thetaRad) * this.scale;
        const rodEndY = this.offsetY - 2 * L * Math.sin(thetaRad) * this.scale;
        
        // Linha da haste com dimensão
        const midX = (rodStartX + rodEndX) / 2 - 40;
        const midY = (rodStartY + rodEndY) / 2;
        
        this.ctx.textAlign = 'center';
        this.ctx.save();
        this.ctx.translate(midX, midY);
        this.ctx.rotate(-thetaRad);
        this.ctx.fillText(`L = ${L.toFixed(1)} mm`, 0, -5);
        this.ctx.restore();
        
        // Ângulo
        this.drawAngle(
            this.offsetX - L * Math.cos(thetaRad) * this.scale,
            this.offsetY,
            thetaRad
        );
    }

    /**
     * Desenha uma linha de cota
     * @param {number} x1 - X inicial
     * @param {number} y1 - Y inicial
     * @param {number} x2 - X final
     * @param {number} y2 - Y final
     * @param {string} text - Texto da dimensão
     * @param {string} orientation - Orientação ('horizontal' ou 'vertical')
     */
    drawDimensionLine(x1, y1, x2, y2, text, orientation) {
        const arrowSize = 5 * this.scale;
        
        // Linha principal
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
        
        // Setas
        if (orientation === 'horizontal') {
            // Seta esquerda
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x1 + arrowSize, y1 - arrowSize / 2);
            this.ctx.lineTo(x1 + arrowSize, y1 + arrowSize / 2);
            this.ctx.closePath();
            this.ctx.fill();
            
            // Seta direita
            this.ctx.beginPath();
            this.ctx.moveTo(x2, y2);
            this.ctx.lineTo(x2 - arrowSize, y2 - arrowSize / 2);
            this.ctx.lineTo(x2 - arrowSize, y2 + arrowSize / 2);
            this.ctx.closePath();
            this.ctx.fill();
            
            // Texto
            this.ctx.fillText(text, (x1 + x2) / 2, y1 - 10);
        } else {
            // Seta superior
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x1 - arrowSize / 2, y1 + arrowSize);
            this.ctx.lineTo(x1 + arrowSize / 2, y1 + arrowSize);
            this.ctx.closePath();
            this.ctx.fill();
            
            // Seta inferior
            this.ctx.beginPath();
            this.ctx.moveTo(x2, y2);
            this.ctx.lineTo(x2 - arrowSize / 2, y2 - arrowSize);
            this.ctx.lineTo(x2 + arrowSize / 2, y2 - arrowSize);
            this.ctx.closePath();
            this.ctx.fill();
            
            // Texto
            this.ctx.save();
            this.ctx.translate(x1 + 15, (y1 + y2) / 2);
            this.ctx.rotate(-Math.PI / 2);
            this.ctx.fillText(text, 0, 0);
            this.ctx.restore();
        }
    }

    /**
     * Desenha o ângulo
     * @param {number} x - Posição X do vértice
     * @param {number} y - Posição Y do vértice
     * @param {number} angle - Ângulo em radianos
     */
    drawAngle(x, y, angle) {
        const radius = 30 * this.scale;
        
        // Arco do ângulo
        this.ctx.strokeStyle = '#f59e0b';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, -Math.PI / 2, -Math.PI / 2 + angle);
        this.ctx.stroke();
        
        // Texto do ângulo
        this.ctx.fillStyle = '#f59e0b';
        this.ctx.font = `${10 * this.scale}px Arial`;
        this.ctx.textAlign = 'center';
        const textAngle = -Math.PI / 2 + angle / 2;
        const textX = x + Math.cos(textAngle) * (radius + 15);
        const textY = y + Math.sin(textAngle) * (radius + 15);
        this.ctx.fillText(`θ = ${(angle * 180 / Math.PI).toFixed(1)}°`, textX, textY);
    }

    /**
     * Desenha a legenda
     */
    drawLegend() {
        const legendX = 20;
        const legendY = 20;
        const lineHeight = 20;
        
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'left';
        
        const legend = [
            { color: '#10b981', text: 'Hastes Principais', width: 6 },
            { color: '#3b82f6', text: 'Plataforma Móvel', width: 15 },
            { color: '#ef4444', text: 'Atuadores (Fusos)', width: 6 },
            { color: '#6b7280', text: 'Base Fixa', width: 15 }
        ];
        
        legend.forEach((item, index) => {
            const y = legendY + index * lineHeight;
            
            // Linha/retângulo da cor
            if (item.width > 10) {
                this.ctx.fillStyle = item.color;
                this.ctx.fillRect(legendX, y - 6, 20, item.width);
            } else {
                this.ctx.strokeStyle = item.color;
                this.ctx.lineWidth = item.width;
                this.ctx.beginPath();
                this.ctx.moveTo(legendX, y);
                this.ctx.lineTo(legendX + 20, y);
                this.ctx.stroke();
            }
            
            // Texto
            this.ctx.fillStyle = '#1f2937';
            this.ctx.fillText(item.text, legendX + 30, y + 4);
        });
    }
}

// Função para atualizar o diagrama
function updateDiagram(L, theta) {
    const diagram = new PantographicDiagram('diagram-canvas');
    diagram.draw(L, theta, true);
}

