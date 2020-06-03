

module.exports = function renderChart(stockDates, closePrice){
    let chart = document.getElementById("chart").getContext('2d');
    let stockPriceChart = new Chart(chart, {
        type: 'line',
        data: {
            labels: stockDates,
            datasets: [
                {
                    label: "Price",
                    data: closePrice,
                    fill: false,
                    pointRadius: 1.5,
                    borderWidth: 2,
                    borderColor: 'rgb(0,0,0)'
                },
                {
                    borderColor: 'rgb(3,147,255)',
                    fill: false,
                    type: 'line',
                    pointRadius:0,
                    borderWidth: 2,
                    label: "10 Day Moving Average",
                    xAxisID: 'x-axis-2',
                    data: tenDayMovingAvgData
                },
                {
                    borderColor: 'rgb(34,63,87)',
                    fill: false,
                    type: 'line',
                    pointRadius:0,
                    borderWidth: 2,
                    label: "50 Day Moving Average",
                    xAxisID: 'x-axis-2',
                    data: fiftyDayMovingAvgData
                }
            ]
            },
            options: {
                // responsive: true,
                tooltips: {
                    mode: 'nearest',
                    intersect: true,
                  },
                scales: {
                  xAxes: [{
                    gridLines: {
                      offsetGridLines: false,
                      display: false
                    }
                  }, {
                    id: 'x-axis-2',
                    type: 'category',
                    position: 'bottom',
                    display: false,
                    labels: tenDayMovingDates,
                   
                  }]
                }
              }
                 
    });
}