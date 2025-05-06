// Funções utilitárias para parse e formatação
const parseCurrency = (value) => {
    if (typeof value !== 'string') return value;
    return parseFloat(value.replace(/R\$\s?/g, '').replace(/\./g, '').replace(',', '.')) || 0;
};
const parseInteger = (value) => {
    if (typeof value !== 'string') return value;
return parseInt(value.replace(/\./g, '').replace(',', '.'), 10) || 0;
};
const anosFiscais = ['FY23', 'FY24', 'FY25 (YTD)'];
const millions = 1000000;
// --- NOVOS DADOS ---
const desligamentosInvoluntarios = [parseInteger("7.490,00"), parseInteger("5.648,00"), parseInteger("3.262,00")];
const desligamentosVoluntarios = [parseInteger("10.263,00"), parseInteger("12.461,00"), parseInteger("8.178,00")];
const custosDiretosInvoluntarios = [parseCurrency("12.750.186,44") / millions, parseCurrency("8.139.297,20") / millions, parseCurrency("4.474.680,88") / millions];
const custosDiretosVoluntarios = [parseCurrency("18.645.167,66") / millions, parseCurrency("22.631.934,02") / millions, parseCurrency("14.858.456,96") / millions];
const custoRescisaoFolha_Invol = [0, 0, 0];
const custoRescisaoFolha_Vol = [parseCurrency("40.196,00")/millions, parseCurrency("42.384,00")/millions, parseCurrency("33.215,00")/millions];
const custoASOAdmissional_Invol = [parseCurrency("1.020.597,04")/millions, parseCurrency("490.653,52")/millions, parseCurrency("240.611,96")/millions];
const custoASOAdmissional_Vol = [parseCurrency("1.612.933,08")/millions, parseCurrency("1.958.370,76")/millions, parseCurrency("1.285.254,48")/millions];
const custoASODemissional_Invol = [parseCurrency("495.763,10")/millions, parseCurrency("373.841,12")/millions, parseCurrency("215.911,78")/millions];
const custoASODemissional_Vol = [parseCurrency("679.307,97")/millions, parseCurrency("824.793,59")/millions, parseCurrency("541.301,82")/millions];
const custoUniformeEPI_Invol = [parseCurrency("5.733.370,30")/millions, parseCurrency("4.323.374,56")/millions, parseCurrency("2.496.963,14")/millions];
const custoUniformeEPI_Vol = [parseCurrency("7.856.018,61")/millions, parseCurrency("9.538.521,67")/millions, parseCurrency("6.260.013,66")/millions];
const custoHoraGUContratacao_Invol = [parseCurrency("2.428.756,00")/millions, parseCurrency("1.167.628,00")/millions, parseCurrency("572.594,00")/millions];
const custoHoraGUContratacao_Vol = [parseCurrency("3.838.362,00")/millions, parseCurrency("4.660.414,00")/millions, parseCurrency("3.058.572,00")/millions];
const custoHoraGUTreinamento_Invol = [parseCurrency("1.948.200,00")/millions, parseCurrency("936.600,00")/millions, parseCurrency("459.300,00")/millions];
const custoHoraGUTreinamento_Vol = [parseCurrency("3.078.900,00")/millions, parseCurrency("3.738.300,00")/millions, parseCurrency("2.453.400,00")/millions];
const custoHoraGUDesligamento_Invol = [parseCurrency("1.123.500,00")/millions, parseCurrency("847.200,00")/millions, parseCurrency("489.300,00")/millions];
const custoHoraGUDesligamento_Vol = [parseCurrency("1.539.450,00")/millions, parseCurrency("1.869.150,00")/millions, parseCurrency("1.226.700,00")/millions];
const custoFaltasJustificadas = [parseCurrency("12.730.498,00")/millions, parseCurrency("17.616.736,00")/millions, parseCurrency("11.336.238,00")/millions];
const custoHorasExtras = [parseCurrency("52.950.000,00")/millions, parseCurrency("65.031.000,00")/millions, parseCurrency("39.328.000,00")/millions];
// --- FIM NOVOS DADOS ---
const formatInteger = (value) => new Intl.NumberFormat('pt-BR').format(Math.round(value));
const formatMillionsCurrency = (value) => `R$ ${value.toFixed(2).replace('.', ',')} Mi`;
const formatYAxisMillions = (value) => `R$ ${value.toFixed(0)} Mi`;
const componentColors = {
    rescisao: '#a78bfa', asoAdm: '#facc15', asoDem: '#fbbf24',
    uniforme: '#38bdf8', guContr: '#4ade80', guTrein: '#2dd4bf',
    guDeslig: '#94a3b8', invol: '#f87171', vol: '#fb923c'
};
const colorFaltas = '#60a5fa';
const colorHorasExtras = '#c084fc';
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(0, 0, 0, 0.7)';
Chart.defaults.plugins.tooltip.titleFont = { weight: '600' };
Chart.defaults.plugins.tooltip.bodyFont = { weight: '400' };
Chart.defaults.plugins.tooltip.padding = 8;
Chart.defaults.plugins.tooltip.cornerRadius = 4;
// Gráfico 1: Custos Diretos Totais Empilhado
const ctx1 = document.getElementById('custosDiretosEmpilhadoChart').getContext('2d');
new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: anosFiscais,
        datasets: [
            { label: 'Custo Involuntário', data: custosDiretosInvoluntarios, backgroundColor: componentColors.invol },
            { label: 'Custo Voluntário', data: custosDiretosVoluntarios, backgroundColor: componentColors.vol }
        ]
    },
    options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { title: { display: false }, legend: { display: false }, tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${formatMillionsCurrency(context.parsed.y)}` } } },
        scales: { x: { stacked: true, grid: { display: false }, title: { display: true, text: 'Ano Fiscal' } }, y: { stacked: true, beginAtZero: true, grid: { color: '#e5e7eb' }, title: { display: true, text: 'Custo (Milhões R$)' }, ticks: { callback: formatYAxisMillions } } }
    }
});
// Gráfico 2: Desligamentos Empilhado
const ctx2 = document.getElementById('desligamentosEmpilhadoChart').getContext('2d');
new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: anosFiscais,
        datasets: [
            { label: 'Deslig. Involuntários', data: desligamentosInvoluntarios, backgroundColor: componentColors.invol },
            { label: 'Deslig. Voluntários', data: desligamentosVoluntarios, backgroundColor: componentColors.vol }
        ]
    },
    options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { title: { display: false }, legend: { display: false }, tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${formatInteger(context.parsed.y)}` } } },
        scales: { x: { stacked: true, grid: { display: false }, title: { display: true, text: 'Ano Fiscal' } }, y: { stacked: true, beginAtZero: true, grid: { color: '#e5e7eb' }, title: { display: true, text: 'Número de Pessoas' }, ticks: { callback: formatInteger } } }
    }
});
// Gráfico 3: Detalhamento Custos Diretos
const ctx3 = document.getElementById('custosDiretosDetalheChart').getContext('2d');
new Chart(ctx3, {
    type: 'bar',
    data: {
        labels: anosFiscais,
        datasets: [
            { label: 'Hora GU Desligamento (Invol.)', data: custoHoraGUDesligamento_Invol, stack: 'Involuntário', backgroundColor: componentColors.guDeslig },
            { label: 'Hora GU Treinamento (Invol.)', data: custoHoraGUTreinamento_Invol, stack: 'Involuntário', backgroundColor: componentColors.guTrein },
            { label: 'Hora GU Contratação (Invol.)', data: custoHoraGUContratacao_Invol, stack: 'Involuntário', backgroundColor: componentColors.guContr },
            { label: 'Uniforme + EPI (Invol.)', data: custoUniformeEPI_Invol, stack: 'Involuntário', backgroundColor: componentColors.uniforme },
            { label: 'ASO Demissional (Invol.)', data: custoASODemissional_Invol, stack: 'Involuntário', backgroundColor: componentColors.asoDem },
            { label: 'ASO Admissional (Invol.)', data: custoASOAdmissional_Invol, stack: 'Involuntário', backgroundColor: componentColors.asoAdm },
            { label: 'Rescisão Folha (Invol.)', data: custoRescisaoFolha_Invol, stack: 'Involuntário', backgroundColor: componentColors.rescisao },
            { label: 'Hora GU Desligamento (Vol.)', data: custoHoraGUDesligamento_Vol, stack: 'Voluntário', backgroundColor: componentColors.guDeslig },
            { label: 'Hora GU Treinamento (Vol.)', data: custoHoraGUTreinamento_Vol, stack: 'Voluntário', backgroundColor: componentColors.guTrein },
            { label: 'Hora GU Contratação (Vol.)', data: custoHoraGUContratacao_Vol, stack: 'Voluntário', backgroundColor: componentColors.guContr },
            { label: 'Uniforme + EPI (Vol.)', data: custoUniformeEPI_Vol, stack: 'Voluntário', backgroundColor: componentColors.uniforme },
            { label: 'ASO Demissional (Vol.)', data: custoASODemissional_Vol, stack: 'Voluntário', backgroundColor: componentColors.asoDem },
            { label: 'ASO Admissional (Vol.)', data: custoASOAdmissional_Vol, stack: 'Voluntário', backgroundColor: componentColors.asoAdm },
            { label: 'Rescisão Folha (Vol.)', data: custoRescisaoFolha_Vol, stack: 'Voluntário', backgroundColor: componentColors.rescisao }
        ]
    },
    options: {
        responsive: true, maintainAspectRatio: false,
        interaction: { mode: 'point', intersect: true },
        plugins: { title: { display: false }, legend: { display: false }, tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${formatMillionsCurrency(context.parsed.y)}` } } },
        scales: {
            x: { grid: { display: false }, title: { display: true, text: 'Ano Fiscal' } },
            y: { stacked: true, beginAtZero: true, grid: { color: '#e5e7eb' }, title: { display: true, text: 'Custo (Milhões R$)' }, ticks: { callback: formatYAxisMillions } }
        }
    }
});
// Gráfico 4: Custos Indiretos
const ctx4 = document.getElementById('custosIndiretosChart').getContext('2d');
new Chart(ctx4, {
    type: 'bar',
    data: {
        labels: anosFiscais,
        datasets: [
            { label: 'Custo Faltas Justificadas', data: custoFaltasJustificadas, backgroundColor: colorFaltas },
            { label: 'Custo Horas Extras', data: custoHorasExtras, backgroundColor: colorHorasExtras }
        ]
    },
    options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { title: { display: false }, legend: { display: false }, tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${formatMillionsCurrency(context.parsed.y)}` } } },
        scales: {
            x: { stacked: true, grid: { display: false }, title: { display: true, text: 'Ano Fiscal' } },
            y: { stacked: true, beginAtZero: true, grid: { color: '#e5e7eb' }, title: { display: true, text: 'Custo (Milhões R$)' }, ticks: { callback: formatYAxisMillions } }
        }
    }
});

// Garante que todos os gráficos nesta página sejam responsivos
function makeAllChartsResponsive() {
  if (window.custosIndiretosChart) {
    window.custosIndiretosChart.options.responsive = true;
    window.custosIndiretosChart.resize();
  }
  if (window.custosDiretosEmpilhadoChart) {
    window.custosDiretosEmpilhadoChart.options.responsive = true;
    window.custosDiretosEmpilhadoChart.resize();
  }
  if (window.desligamentosEmpilhadoChart) {
    window.desligamentosEmpilhadoChart.options.responsive = true;
    window.desligamentosEmpilhadoChart.resize();
  }
  if (window.custosDiretosDetalheChart) {
    window.custosDiretosDetalheChart.options.responsive = true;
    window.custosDiretosDetalheChart.resize();
  }
}
window.addEventListener('resize', makeAllChartsResponsive);
window.addEventListener('DOMContentLoaded', makeAllChartsResponsive);
