// Gráfico de Desligamento Voluntário (Seção 10)
const turnoverCanvas = document.getElementById('turnoverChart');
if (turnoverCanvas) {
    const ctx = turnoverCanvas.getContext('2d');
    window.turnoverChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['FY24', 'FY25', 'FY26', 'FY27', 'FY28'],
            datasets: [{
                label: 'Desligamento Voluntário (%)',
                data: [27.0, 30.57, 32.61, 34.24, 35.96],
                backgroundColor: 'rgba(0, 114, 198, 0.15)',
                borderColor: '#0072c6',
                borderWidth: 3,
                pointBackgroundColor: '#f9a825',
                pointBorderColor: '#003366',
                pointRadius: 6,
                pointHoverRadius: 8,
                fill: true,
                tension: 0.25
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#003366',
                        font: { size: 16, weight: 'bold' }
                    }
                },
                title: {
                    display: true,
                    text: 'Projeção de Desligamento Voluntário (%)',
                    color: '#003366',
                    font: { size: 18, weight: 'bold' }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 25,
                    max: 38,
                    ticks: {
                        color: '#222',
                        font: { size: 14 }
                    },
                    grid: {
                        color: '#dde2ec'
                    }
                },
                x: {
                    ticks: {
                        color: '#222',
                        font: { size: 14 }
                    },
                    grid: {
                        color: '#dde2ec'
                    }
                }
            }
        }
    });
}

// Back-to-top button behavior
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// --- ROI Chart ---
window.addEventListener('DOMContentLoaded', function() {
    const roiCanvas = document.getElementById('roiChart');
    if (!roiCanvas) return;
    const ctx = roiCanvas.getContext('2d');
    // Dados dos cenários
    const percentuais = [0, 3.8, 5, 7, 10];
    const custoTurnover = 65000000;
    const investimento = 2500000;
    // Corrigir economia para break-even
    const economia = percentuais.map(p => custoTurnover * (p / 100));
    // ROI = (economia - investimento) / investimento * 100
    // break-even: economia = investimento => ROI = 0
    // Para break-even: p = investimento / custoTurnover * 100
    // Para 3.8%: economia = 2.47M, mas investimento = 2.5M, logo ROI = (2.47-2.5)/2.5 = -1.2%
    // Para ROI=0, p = 2.5M/65M = 3.846...% (aprox 3.85%)
    // Ajustar o cenário para mostrar break-even exato
    const percentuaisAjustados = [0, 3.85, 5, 7, 10];
    const economiaAjustada = percentuaisAjustados.map(p => custoTurnover * (p / 100));
    const roiAjustado = economiaAjustada.map(e => ((e - investimento) / investimento) * 100);
    window.roiChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: percentuaisAjustados.map(p => p + '%'),
            datasets: [{
                label: 'ROI (%)',
                data: roiAjustado,
                borderColor: '#177ddc',
                backgroundColor: 'rgba(23, 125, 220, 0.15)',
                pointBackgroundColor: '#177ddc',
                pointBorderColor: '#fff',
                pointRadius: 6,
                pointHoverRadius: 9,
                tension: 0.2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false
                },
                annotation: {
                    annotations: {
                        line1: {
                            type: 'line',
                            yMin: 0,
                            yMax: 0,
                            borderColor: '#faad14',
                            borderWidth: 2,
                            borderDash: [6, 6],
                            label: {
                                content: 'Break-even',
                                enabled: true,
                                position: 'end',
                                backgroundColor: '#faad14',
                                color: '#222',
                                font: { size: 11, weight: 'bold' },
                                yAdjust: -8
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'ROI (%)',
                        color: '#333',
                        font: { size: 14 }
                    },
                    beginAtZero: false,
                    min: -100,
                    max: 180,
                    ticks: {
                        color: '#222',
                        font: { size: 13 }
                    },
                    grid: {
                        color: '#eee'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '% Redução do Turnover',
                        color: '#333',
                        font: { size: 14 }
                    },
                    ticks: {
                        color: '#222',
                        font: { size: 13 }
                    },
                    grid: {
                        color: '#eee'
                    }
                }
            }
        }
    });
});

// Ajusta todos os gráficos para serem responsivos
function makeChartsResponsive() {
  if (window.turnoverChart) {
    window.turnoverChart.options.responsive = true;
    window.turnoverChart.resize();
  }
  if (window.roiChart) {
    window.roiChart.options.responsive = true;
    window.roiChart.resize();
  }
  // Adicione outros gráficos conforme necessário
}
window.addEventListener('resize', makeChartsResponsive);
window.addEventListener('DOMContentLoaded', makeChartsResponsive);
