!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){const o="LWAKDFA9XAQLIEGF",r=document.querySelector("#findBtn"),i=document.querySelector("#stock"),l=document.querySelector(".error p"),c=document.querySelector(".addTenDayMovingAverage"),a=document.querySelector(".addFiftyDayMovingAverage"),s=document.querySelector(".portfolio-error");r.addEventListener("click",(function(e){p=[],f=[],m=[],e.preventDefault,function(){let e;e=i.value,fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${e}&optionsize=compact&apikey=${o}`).then((function(e){return e.json()})).then((function(t){if(""===e)l.innerText="Please enter valid stock ticker",setTimeout((function(){l.innerText=""}),3e3);else{document.querySelector(".container").innerHTML="",document.querySelector(".container").innerHTML='<canvas id="chart"></canvas>',d=Object.keys(t["Time Series (Daily)"]),d=d.reverse();const e=t["Time Series (Daily)"];for(let t in e){let n=e[t];m.unshift(Number(n["4. close"]))}k()}})).catch((function(e){console.log(e),l.innerText="Please enter valid stock ticker",setTimeout((function(){l.innerText=""}),3e3)}))}(),console.log("work")})),c.addEventListener("click",(function(){y(10,p)})),a.addEventListener("click",(function(){y(50,f)}));let u,d,p=[],f=[];function y(e,t){fetch(`https://www.alphavantage.co/query?function=SMA&symbol=${i.value}&interval=daily&time_period=${e}&series_type=open&apikey=${o}`).then((function(e){return e.json()})).then((function(e){let n=e["Technical Analysis: SMA"];for(let e in n)d.indexOf(e)<0&&delete n[e];u=Object.keys(n),u=u.reverse();for(let e in n){let o=n[e];t.unshift(Number(o.SMA))}k()})).catch((function(e){console.log(e)}))}let m=[];const b=document.querySelector(".portfolio-stock"),v=document.querySelector(".add-btn"),h=document.querySelector(".shares");v.addEventListener("click",(function(){if(h<1||""===h||""===v)s.innerHTML="Sorry, you're entries are invaild",setTimeout((function(){s.innerText=""}),3e3);else{const t=new g(b.value,h.value);function e(e,n){fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${e}&apikey=${o}`).then(e=>e.json()).then((function(e){let o=parseFloat(e["Global Quote"]["05. price"]);n(t,o)})).catch((function(e){console.log(e),s.style.display="block",setTimeout((function(){s.style.display="none"}),3e3)}))}e(t.stockName,M)}}));class g{constructor(e,t,n){this.stockName=e,this.shares=t}}let S=0;const x=document.querySelector(".portfolio-list"),T=document.querySelector(".portfolio-headers");function M(e,t){const n=document.querySelector(".portfolio-list"),o=document.createElement("ul");o.setAttribute("class","portfolio-items");const r=document.createElement("li");r.setAttribute("class","portfolio-shares");const i=document.createElement("li");i.setAttribute("class","portfolio-price");const l=document.createElement("li");l.setAttribute("class","portfolio-stockname");const c=document.createElement("button");c.appendChild(document.createTextNode("Sell")),c.setAttribute("class","delete-item"),l.innerHTML=`\n        ${e.stockName.toUpperCase()}\n    `,r.innerHTML=`${e.shares}`,i.innerHTML=`$${t}`,n.appendChild(o),o.appendChild(l),o.appendChild(r),o.appendChild(i),o.appendChild(c),n.appendChild(o),b.value="",h.value="",function(){let n=document.querySelector(".sum"),o=t*e.shares;S+=o,n.innerHTML=`$${Math.round(100*S)/100}`}(),x.style.height="auto",x.style.padding="0px 20px 20px 20px",T.style.display="flex",c.addEventListener("click",(function(e){e.target.parentNode.remove(),function(){let t=document.querySelector(".sum"),n=e.target.previousSibling.innerHTML,o=e.target.previousSibling.previousSibling.innerHTML;o=parseInt(o);let r=n.replace("$","");r&&(r=Number(r),sellItemTotal=r*o,S-=sellItemTotal,t.innerHTML=`$${Math.round(100*S)/100}`)}()}))}let k=n(1)},function(e,t){e.exports=function(){let e=document.getElementById("chart").getContext("2d");new Chart(e,{type:"line",data:{labels:stockDates,datasets:[{label:"Price",data:closePrice,fill:!1,pointRadius:1.5,borderWidth:2,borderColor:"rgb(0,0,0)"},{borderColor:"rgb(3,147,255)",fill:!1,type:"line",pointRadius:0,borderWidth:2,label:"10 Day Moving Average",xAxisID:"x-axis-2",data:tenDayMovingAvgData},{borderColor:"rgb(34,63,87)",fill:!1,type:"line",pointRadius:0,borderWidth:2,label:"50 Day Moving Average",xAxisID:"x-axis-2",data:fiftyDayMovingAvgData}]},options:{tooltips:{mode:"nearest",intersect:!0},scales:{xAxes:[{gridLines:{offsetGridLines:!1,display:!1}},{id:"x-axis-2",type:"category",position:"bottom",display:!1,labels:tenDayMovingDates}]}}})}}]);