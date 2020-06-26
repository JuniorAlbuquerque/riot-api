var ctx = document.getElementById('myChart').getContext('2d')

function renderChart(reqFunc, reqNonFunc) {
  var myChart = new Chart(ctx, {
    type: 'pie',
    type: 'pie',
    data: {
      labels: [
        'Requisitos Funcionais: ' + reqFunc,
        'Requisitos Não Funcionais: ' + reqNonFunc,
      ],
      datasets: [
        {
          label: 'Population (millions)',
          backgroundColor: ['#3e95cd', '#8e5ea2'],
          data: [reqFunc, reqNonFunc],
        },
      ],
    },
    options: {
      animation: {
        duration: 0,
      },
      title: {
        display: true,
        text: 'Total de Requisitos do Projeto',
      },
    },
  })
}
