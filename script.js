// Gráfico de Desligamento Voluntário (Seção 10)
const ctx = document.getElementById('turnoverChart').getContext('2d');
const turnoverChart = new Chart(ctx, {
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
