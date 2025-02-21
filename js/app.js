

const animation_element = document.querySelectorAll(".animation");
const main = document.querySelector("main");


let xValue = 0;
let yValue = 0;

let rotateDegree = 0;

function updatePage(cursorPosition) {
    animation_element.forEach(el => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        let speedz = el.dataset.speedz;
        let rotateSpeed = el.dataset.rotation;

        //const forTest = document.querySelector(".mountain-2");
        /*let zValue=1000;*/
        //let zValue = e.clientX - parseFloat(getComputedStyle(forTest).left);


        //console.log(zValue);

        let isInLeft =parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
        let zValue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

        el.style.transform = `perspective(2300px) translateZ(${zValue * speedz}px) rotateY(${rotateDegree * rotateSpeed}deg)
                              translateX(calc(-50% + ${-xValue * speedx}px)) 
                              translateY(calc(-50% + ${yValue * speedy}px)) 
                              `;
        //console.log(el.style.transform); // Correctement placé dans la boucle
    });
   
};

updatePage(0);

/*// ✅ Démarrer l'animation dès le chargement de la page
window.addEventListener("load", () => {
    updatePage(window.innerWidth / 2); // Position initiale au centre
});*/


window.addEventListener("mousemove", (e) => {
    if(timeline.isActive())  return;

    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;
    // console.log(xValue, yValue);

    rotateDegree = (xValue / (window.innerWidth / 2)) * 20;
    // console.log(rotateDegree);
    updatePage(e.clientX);

   
  

});

if(window.innerWidth >= 725){
    main.style.maxHeight=`${window.innerWidth*0.6}px`;

}else{
    main.style.maxHeight=`${window.innerWidth*1.6}px`;

};

/*GSAP Animaion*/

let timeline = gsap.timeline();

/*// Animer `.bg-img` en même temps que les autres éléments


    timeline.from(".bg-img", { 
        //top:"0px",
        top: `${+document.querySelector(".bg-img").offsetHeight/2-200}px`,
        duration: 1,
        
       
    },"1");  // Définir le tag "start" pour synchroniser l'animation*/

Array.from(animation_element)
    .filter((el) => !el.classList.contains("text"))
    .forEach((el) => {
        timeline.from(
            el,
            {
                //top:"0px",
                top: `${el.offsetHeight / 2 + +el.dataset.distance}px`,
                duration: 3.5,
                ease: "power3.out",
            },
            "1"
        );

    });

    timeline.from(".text h1",{
        y: window.innerHeight - document.querySelector(".text h1").getBoundingClientRect().top + 200,
        duration: 2,

    }, "2.5"
    ).from(".text h2",{
        y:-150,
        opacity:0,
        duration: 1.5,

    }, "3"
    ).from(".hide",{
    
        opacity:0,
        duration: 1.5,

    }, "3"
    )

    console.log("Largeur de l'écran :", window.screen.width);
console.log("Hauteur de l'écran :", window.screen.height);
    console.log("Largeur de la fenêtre :", window.innerWidth);
    console.log("Hauteur de la fenêtre :", window.innerHeight);
    
