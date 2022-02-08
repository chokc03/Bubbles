const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

function Circle(x,y,dx,dy,radius,color){
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.radius=radius;    
    this.color=color;

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, radius, 0, Math.PI*2,false );
        c.fillStyle=this.color;
        c.strokeStyle=this.color;
        c.fill();
        c.stroke();
    }
    this.upadate = function(){
        if (this.x+this.radius>innerWidth || this.x-this.radius < 0){
            this.dx = -this.dx;
        }
        if (this.y+this.radius>innerHeight || this.y-this.radius < 0){
            this.dy = -this.dy;
        }
        this.x+=this.dx;
        this.y+=this.dy;

        this.draw();

    }
}

let circleArray =[];
const coordinate={};
let count=1;
const color={};

function craeteColor(){
    const symbols ="123456789ABCDEF";
    let hex = "#";
    for (let i=0;i<6;i++){
        hex=hex+symbols[Math.floor(Math.random()*16)];
    }
    color.c=hex;
}

canvas.addEventListener("mousemove",(e)=>{
    // console.log(e.clientX);
})

window.addEventListener("click",(e)=>{
    coordinate.x = e.clientX;
    coordinate.y = e.clientY;
    craeteColor();
    const radius = Math.random()*50;
    let dx = Math.random()*5;
    let dy = Math.random()*5;
    circleArray.push(new Circle(coordinate.x,coordinate.y,dx,dy,radius,color.c));
    count++;
    if (circleArray.length>50){
        window.alert("공간이 부족합니다. 초기화 됩니다.")
        count=1;
        circleArray.length=0;
    }
})

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth, innerHeight);
    for (let i =0; i<circleArray.length; i++){
        circleArray[i].upadate();
    }
}
animate();

