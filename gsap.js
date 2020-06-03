const titleLetter = document.querySelector(".title-letter");
const startBtn = document. querySelector(".start");
const line = document.querySelectorAll("line");
const portfolioBtn = document.querySelector(".open-portfolio");
const addToPortfolio = document.querySelector(".add-to-portfolio");
let chart = document.getElementById("chart").getContext('2d');




gsap.from(".start",{opacity: 0,y: 500, duration: 1.2});
let tl = gsap.timeline({repeat: -1, delay:1.2});
let parWrapperTl = gsap.timeline({repeat: -1, delay:1.2});


gsap.from(".overlay h1", {opacity:0, x:-600, duration:1.2 });
gsap.to(".card", {scaleX: 1.1, ease: "power1.out", repeat:-1, duration:.75, delay: 1.5, yoyo: true})


tl.from(" .paragraph-wrapper1", {x:-200, opacity: 0, duration: 1})
.to(".paragraph-wrapper1", {x:200, opacity: 0, duration: .7, delay:4})
.from(".paragraph-wrapper2", {x:-200, opacity: 0, duration: 1})
.to(".paragraph-wrapper2", {x:200, opacity: 0, duration: .7, delay:4})
.from(".paragraph-wrapper3", {x:-200, opacity: 0, duration: 1})
.to(" .paragraph-wrapper3", {x:200, opacity: 0, duration: .7, delay:4});





startBtn.addEventListener("click", ()=> {
    gsap.to(".overlay", { top: -400,height: 0,duration: 1 });
    gsap.from(".title-letter", {rotate: -180, x: -150, y: -200, stagger: .15, duration:.25, delay: 1});

})


// portfolioBtn.addEventListener("click", () =>{
//     gsap.from(".portfolio-container", {height: 0});
//     gsap.to(".add-to-portfolio form", {opacity: 100, duration: 1.5})
//     addToPortfolio.style.display = "block";
//     addToPortfolio.style.padding ="20px 0 20px 0 20px";

    
// })

