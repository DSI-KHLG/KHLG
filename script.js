// Scroll reveal animation

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll(){

reveals.forEach(element => {

const windowHeight = window.innerHeight;
const revealTop = element.getBoundingClientRect().top;
const revealPoint = 100;

if(revealTop < windowHeight - revealPoint){
element.classList.add("active");
}

});

}

window.addEventListener("scroll", revealOnScroll);
