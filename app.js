const API_KEY = 'LWAKDFA9XAQLIEGF';
const findBtn = document.querySelector('#findBtn');
const stock = document.querySelector("#stock");
const errorOutput = document.querySelector(".error p");
const tenDaySMAbtn = document.querySelector('.addTenDayMovingAverage');
const fiftyDaySMAbtn = document.querySelector('.addFiftyDayMovingAverage');
const portfolioError = document.querySelector('.portfolio-error');


findBtn.addEventListener("click", function (e) {
    clearValues();
    e.preventDefault;
    getFetchCall();
    // console.log("work")

});
tenDaySMAbtn.addEventListener('click', function(){
    getSimpleMovingAvg(10,tenDayMovingAvgData);
});
fiftyDaySMAbtn.addEventListener('click', function(){
    getSimpleMovingAvg(50,fiftyDayMovingAvgData);
});

function clearValues(){
    tenDayMovingAvgData = [];
    fiftyDayMovingAvgData = [];
    tenDayMovingDates;
    stockDates;
    closePrice = [];
    
}



let tenDayMovingAvgData = [];
let fiftyDayMovingAvgData = [];
let tenDayMovingDates;
function getSimpleMovingAvg(timePeriodSMA , SMAdata) {
    fetch(`https://www.alphavantage.co/query?function=SMA&symbol=${stock.value}&interval=daily&time_period=${timePeriodSMA}&series_type=open&apikey=${API_KEY}`)
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        let dates = data["Technical Analysis: SMA"];
        
        for(let el in dates){
            if(stockDates.indexOf(el) < 0){
                delete dates[el];
            }
            
        }
        tenDayMovingDates = Object.keys(dates);
        tenDayMovingDates = tenDayMovingDates.reverse();

        for (let date in dates) {
            let currentDate = dates[date];
            
            SMAdata.unshift(Number(currentDate["SMA"]));
        }
        renderChart();

    })
    .catch(function (err) {
        console.log(err);
    })
}


let stockDates;
let closePrice = [];


function getFetchCall() {
    let stockValue;
    let open;
    stockValue = stock.value;
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockValue}&optionsize=compact&apikey=${API_KEY}`)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {

            if (stockValue === "") {
                errorOutput.innerText = "Please enter valid stock ticker";
                setTimeout(function () {
                    errorOutput.innerText = "";
                }, 3000);
            } else {
                document.querySelector('.container').innerHTML = "";
                document.querySelector('.container').innerHTML = '<canvas id="chart"></canvas>';
                stockDates = Object.keys(data["Time Series (Daily)"]);
                 
                stockDates = stockDates.reverse();
              
                const dates = data["Time Series (Daily)"];
                      
                for (let date in dates) {
                    let currentDate = dates[date];

                    closePrice.unshift(Number(currentDate["4. close"]));
                }
                renderChart();
               
            }
        })
        .catch(function (err) {
            console.log(err);
            errorOutput.innerText = "Please enter valid stock ticker";
            setTimeout(function () {
                errorOutput.innerText = "";
            }, 3000);
        })
}







let portfolio =[];


const portfolioStock = document.querySelector(".portfolio-stock");
const portfolioAddStock = document.querySelector(".add-btn");
const numberShares = document.querySelector(".shares");

portfolioAddStock.addEventListener('click', addToPortofolio);


class Portfolio {
    constructor(stockName, shares, price){
        this.stockName = stockName;
        this.shares = shares;

    }
}

function addToPortofolio(){
    if(numberShares < 1 || numberShares === null){
        portfolioError.innerHTML = "Sorry, you're entries are invaild";
        setTimeout(function () {
            portfolioError.innerText = "";
        }, 3000);
    }else{
        const addedStock = new Portfolio(portfolioStock.value, numberShares.value);
        function currentPrice(stock, callback){
            fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=${API_KEY}`)
            .then(res => res.json())
            .then(function(data){
                let price = parseFloat(data["Global Quote"]["05. price"]);
                callback(addedStock, price);
            })
            .catch(function(err){
                console.log(err);
                portfolioError.style.display = "block";
            setTimeout(function () {
                portfolioError.style.display = "none";
            }, 3000);
                
            })
        }
        currentPrice(addedStock.stockName, UIportfolioList);
    }
}


let total = 0;
const portfolioListDisplay = document.querySelector(".portfolio-list");
const portfolioHeaders = document.querySelector(".portfolio-headers")

function displayPortfolio(){
    portfolioListDisplay.style.height = "auto";
    portfolioListDisplay.style.padding = "0px 20px 20px 20px";
    portfolioHeaders.style.display = "flex";
}





function UIportfolioList(addedStock, price){

    const portfolioList = document.querySelector('.portfolio-list');
    const ul = document.createElement("ul");
    ul.setAttribute('class', 'portfolio-items');

    const liShares = document.createElement("li");
    liShares.setAttribute('class','portfolio-shares');
    const liPrice = document.createElement("li"); 
    liPrice.setAttribute('class', 'portfolio-price');
    const liStockName = document.createElement("li");
    liStockName.setAttribute('class', 'portfolio-stockname');
    

    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Sell"));
    deleteBtn.setAttribute('class', 'delete-item');

    liStockName.innerHTML = `
        ${addedStock.stockName.toUpperCase()}
    `;

    liShares.innerHTML =`${addedStock.shares}`;

    liPrice.innerHTML = `$${price}`
    portfolioList.appendChild(ul);
    ul.appendChild(liStockName);
    ul.appendChild(liShares);
    ul.appendChild(liPrice);
    ul.appendChild(deleteBtn);
    portfolioList.appendChild(ul);

    portfolioStock.value= ""; 
    numberShares.value = "";

    function totalAssetsFnc(){
        
        let sum = document.querySelector('.sum');
    
        let totalAssetsCurrentStock = price * addedStock.shares;

        
        total += totalAssetsCurrentStock;
        sum.innerHTML = `$${Math.round(total *100) / 100}`;
       
        
    }
    totalAssetsFnc()
    displayPortfolio()
    
    deleteBtn.addEventListener('click', function(e){
        let parent = e.target.parentNode;
        parent.remove();

        function removeAssetAmount(){
            
            let totalAssets = document.querySelector('.sum');
            let price = e.target.previousSibling.innerHTML;
            let shares = e.target.previousSibling.previousSibling.innerHTML;
            shares = parseInt(shares);
            let price2 = price.replace("$", ""); 
            if (price2) { 
                price2 = Number(price2);
                sellItemTotal = price2 * shares;
                total = total - sellItemTotal;

                totalAssets.innerHTML = `$${Math.round(total *100) / 100}`;

            } 
    
        }
        removeAssetAmount()
        
    
    })
}










function renderChart(){
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