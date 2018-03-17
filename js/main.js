var can1;
var can2;

var ctx1;
var ctx2;

var lastTime;
var deltaTime;

var canWidth;
var canHeight;


var bgpic = new Image();

var ane;
var fruit;
var mom;
var baby;

//鼠标的变量
var mx;
var my;

var babyTail = [];
var babyEye = [];
var babyBody = [];

var bigTail = [];
var bigEye = [];
var bigBodyOra = [];
var bigBodyBlue = [];

var data;

var wave;
var wave2;

var dust;
var dustPic = [];

document.body.onload = game;

function game() {
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameloop();
}

function init() {
    //获得canvas content
    can1 = document.getElementById("canvas1"); //fish,dust,UI,circle
    ctx1 = can1.getContext("2d");
    can2 = document.getElementById("canvas2");
    ctx2 = can2.getContext("2d");

    can1.addEventListener('mousemove', onMouseMove, false);

    bgpic.src = "./src/background.jpg";

    canWidth = can1.width;
    canHeight = can1.height;

    ane = new aneObj();
    ane.init();

    fruit = new fruitObj();
    fruit.init();

    mom = new momObj();
    mom.init();

    mx = canWidth * 0.5;
    my = canHeight * 0.5;

    baby = new babyObj();
    baby.init();

    for (var i = 0; i < 8; i++) {
        babyTail[i] = new Image();
        babyTail[i].src = "./src/babyTail" + i + ".png"; //图片数组
    }

    for (var i = 0; i < 2; i++) {
        babyEye[i] = new Image();
        babyEye[i].src = "./src/babyEye" + i + ".png";
    }

    for (var i = 0; i < 20; i++) {
        babyBody[i] = new Image();
        babyBody[i].src = "./src/babyFade" + i + ".png";
    }

    for (var i = 0; i < 8; i++) {
        bigTail[i] = new Image();
        bigTail[i].src = "./src/bigTail" + i + ".png"; //图片数组
    }

    for (var i = 0; i < 2; i++) {
        bigEye[i] = new Image();
        bigEye[i].src = "./src/bigEye" + i + ".png";
    }

    data = new dataObj();

    for (var i = 0; i < 8; i++) {
        bigBodyOra[i] = new Image();
        bigBodyBlue[i] = new Image();
        bigBodyOra[i].src = "./src/bigSwim" + i + ".png";
        bigBodyBlue[i].src = "./src/bigSwimBlue" + i + ".png";
    }
    ctx1.font = "30px Microsoft Yahei";
    ctx1.textAlign = "center";

    wave = new waveObj();
    wave.init();

    wave2 = new wave2Obj();
    wave2.init();

    for (var i = 0; i < 7; i++) {
        dustPic[i] = new Image();
        dustPic[i].src = "./src/dust" + i + ".png";
    }
    dust = new dustObj();
    dust.init();

}

function gameloop() {
    window.requestAnimationFrame(gameloop); //刷新频率
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    if (deltaTime > 40) {
        deltaTime = 40;
    }

    drawBackground();

    ane.draw();

    fruitMonitor();
    fruit.draw();

    ctx1.clearRect(0, 0, canWidth, canHeight);
    mom.draw();
    baby.draw();

    momFruitCollision();
    momBabyCollisin()

    data.draw();

    wave.draw();
    wave2.draw();

    dust.draw();
}

function onMouseMove(e) {
    if (!data.gameOver) {
        if (e.offSetX || e.layerX) {
            mx = e.offSetX == undefined ? e.layerX : e.offSetX;
            my = e.offSetY == undefined ? e.layerY : e.offSetY;
        }
    }
}