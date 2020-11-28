var mon,store,distance,time;
var engine,world,earth,one,img,start,rai,pos;
var p,game=0;

function preload(){
    mon = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png",
                       "Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png",
                       "Monkey_09.png","Monkey_10.png");
    img = loadImage("back.jpg");
    rai = loadImage("stone.png");
}
function setup(){

    engine = Matter.Engine.create();
    world = engine.world;


    can = createCanvas(1200,500);

    //firebase linking
    store = firebase.database();

    //linking code with score
    store.ref("score").on("value",function(data){
        distance = data.val();
    });

    //linking code with time
    store.ref("time").on("value",function(data){
        time = data.val();
    });

    //linking code with state
    store.ref("state").on("value",function(data){
        game = data.val();
    })

    //object creation
    earth = new ground();

    one = new player(250,400);

    Matter.Engine.run(engine);
}
function draw(){
    Matter.Engine.update(engine);

    background("red");

    image(img,displayWidth/4120,displayHeight/600,10*displayWidth,displayHeight/1.5);

    //gameState play
    if(game === 0){
        //obstacle
        for(var i = 630;i<15000;i=i+630){
            p = Matter.Bodies.rectangle(i,430,30,30);
            image(rai,i,430,100,100);
        }

        //all the more functions
        increase();
        jump();
        clock();
        one.show();
    }

    end();

    //camera movement
    if(one.pillar.position.x>=600){
        camera.x = one.pillar.position.x;
    }

    console.log(one.pillar.position.y);

    //gameState Win
    if(game===2){
        textSize(30);
        text("YOU WIN!!!",camera.x,camera.y-100);
    }
    if(game===3){
        textSize(30);
        text("YOU LOSE!!!",camera.x,camera.y-100);

       n2 = createButton("h1");
       n2.html("RESET");
    }

    //text for distance and time
    textSize(30)
    text("Time:"+time,camera.x-550,100);
    text("DISTANCE TRAVELLED:"+distance,camera.x-550,50);
}
//to make it move
function jump(){
    if(keyWentDown(UP_ARROW)){
        Matter.Body.setVelocity(one.pillar,{x:0,y:-8});
    };
    if(keyDown(RIGHT_ARROW)){
        Matter.Body.setVelocity(one.pillar,{x:4,y:0});
    };
    if(keyDown(LEFT_ARROW)){
        Matter.Body.setVelocity(one.pillar,{x:-4,y:0});
    }
}
//to increase distance
function increase(){
    if(start === undefined){
        start = one.pillar.position.x;
    };
    distance = Math.round(2*one.pillar.position.x/start);

    store.ref("/").update({
        score:distance
    });
}
//to end the play state
function end(){
    if(distance >= 20){
        game=2;
        store.ref("/").update({
            state:game
        })
    }
    else{
        game=0
    }
    if(time>=50){
        game=3;
        store.ref("/").update({
            state:game
        })
    }
    else{
        game=0
    }
}
//to increase time
function clock(){
    time = Math.round(frameCount/4);

    store.ref("/").update({
        time:time
    })
}

