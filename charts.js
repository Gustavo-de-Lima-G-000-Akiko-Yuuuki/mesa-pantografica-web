// Módulo para gerar gráficos usando Chart.js

class ChartManager {
    constructor() {
        this.charts = {};
    }

    /**
     * Cria o gráfico de forças vs altura
     * @param {Array} data - Dados para o gráfico
     */
    createForcesChart(data) {
        const ctx = document.getElementById('forces-chart').getContext('2d');
        
        // Destruir gráfico existente se houver
        if (this.charts.forces) {
            this.charts.forces.destroy();
        }

        this.charts.forces = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => d.altura.toFixed(0)),
                datasets: [
                    {
                        label: 'Força no Atuador (N)',
                        data: data.map(d => d.forcaAtuador),
                        borderColor: '#f97316',
                        backgroundColor: 'rgba(249, 115, 22, 0.1)',
                        borderWidth: 3,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    },
                    {
                        label: 'Força na Haste (N)',
                        data: data.map(d => d.forcaHaste),
                        borderColor: '#8b5cf6',
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        borderWidth: 3,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Forças vs Altura da Mesa',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y.toFixed(1)} N`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Altura (mm)',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Força (N)',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
    }

    /**
     * Cria o gráfico de eficiência
     * @param {Array} data - Dados para o gráfico
     */
    createEfficiencyChart(data) {
        const ctx = document.getElementById('efficiency-chart').getContext('2d');
        
        // Destruir gráfico existente se houver
        if (this.charts.efficiency) {
            this.charts.efficiency.destroy();
        }

        this.charts.efficiency = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => d.altura.toFixed(0)),
                datasets: [
                    {
                        label: 'Eficiência (%)',
                        data: data.map(d => d.eficiencia),
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.2)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Eficiência Mecânica',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Eficiência: ${context.parsed.y.toFixed(1)}%`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Altura (mm)',
                            font: {
                                size: 12,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Eficiência (%)',
                            font: {
                                size: 12,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        min: 0,
                        max: 100
                    }
                }
            }
        });
    }

    /**
     * Cria o gráfico de geometria
     * @param {Array} data - Dados para o gráfico
     */
    createGeometryChart(data) {
        const ctx = document.getElementById('geometry-chart').getContext('2d');
        
        // Destruir gráfico existente se houver
        if (this.charts.geometry) {
            this.charts.geometry.destroy();
        }

        this.charts.geometry = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => d.altura.toFixed(0)),
                datasets: [
                    {
                        label: 'Ângulo (°)',
                        data: data.map(d => d.angulo),
                        borderColor: '#f59e0b',
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        borderWidth: 3,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Largura Base (mm)',
                        data: data.map(d => d.distanciaHorizontal),
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 3,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Geometria do Mecanismo',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                if (context.datasetIndex === 0) {
                                    return `Ângulo: ${context.parsed.y.toFixed(1)}°`;
                                } else {
                                    return `Largura Base: ${context.parsed.y.toFixed(1)} mm`;
                                }
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Altura (mm)',
                            font: {
                                size: 12,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Ângulo (°)',
                            font: {
                                size: 12,
                                weight: 'bold'
                            },
                            color: '#f59e0b'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        ticks: {
                            color: '#f59e0b'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Largura Base (mm)',
                            font: {
                                size: 12,
                                weight: 'bold'
                            },
                            color: '#3b82f6'
                        },
                        grid: {
                            drawOnChartArea: false,
                        },
                        ticks: {
                            color: '#3b82f6'
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
    }

    /**
     * Atualiza todos os gráficos com novos dados
     * @param {Array} data - Dados para os gráficos
     */
    updateAllCharts(data) {
        if (data && data.length > 0) {
            this.createForcesChart(data);
            this.createEfficiencyChart(data);
            this.createGeometryChart(data);
        }
    }

    /**
     * Destrói todos os gráficos
     */
    destroyAllCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart) {
                chart.destroy();
            }
        });
        this.charts = {};
    }
}

// Instância global do gerenciador de gráficos
const chartManager = new ChartManager();

