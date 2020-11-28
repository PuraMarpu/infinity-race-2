class ground{
    constructor(){
        var opt={
            isStatic:true
        }

        this.terra = Matter.Bodies.rectangle(250,430,6*displayWidth,10,opt);

        Matter.World.add(world,this.terra);
    }
}
class player{
    constructor(x,y){

        this.pillar = Matter.Bodies.rectangle(x,y,30,30);

        Matter.World.add(world,this.pillar);
    }
    show(){
        var pos = this.pillar.position;

        push();
        translate(pos.x,pos.y);
        animation(mon,0,0,30,30);
        pop();

    }
}