
const animation_element = document.querySelectorAll(".animation");

let xValue = 0;
let yValue = 0;

let rotateDegree = 0;

function updatePage(cursorPosition){
    animation_element.forEach(el => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        let speedz = el.dataset.speedz;
        let rotateSpeed = el.dataset.rotation;

        //const forTest = document.querySelector(".mountain-2");
          /*let zValue=1000;*/
          //let zValue = e.clientX - parseFloat(getComputedStyle(forTest).left);

      
        //console.log(zValue);
        
        let isInLeft = 
        
        parseFloat(getComputedStyle(el).left)< window.innerWidth / 2 ? 1 : -1;
        let zValue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;
        
        el.style.transform = `
                              translateX(calc(-50% + ${-xValue * speedx}px)) 
                              translateY(calc(-50% + ${yValue * speedy}px)) 
                              perspective(2300px) translateZ(${zValue * speedz}px) rotateY(${rotateDegree * rotateSpeed}deg)`;
                                    //console.log(el.style.transform); // Correctement placé dans la boucle
    });

};
updatePage(0)

window.addEventListener("mousemove", (e) => {
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;
    // console.log(xValue, yValue);

    rotateDegree= (xValue / (window.innerWidth / 2)) * 20;
    console.log(rotateDegree);
    updatePage(e.clientX)


});
