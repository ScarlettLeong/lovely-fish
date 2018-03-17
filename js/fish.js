var momObj = function () {
    this.x;
    this.y;
    this.angle;

    this.bigTailTimer = 0; //计时器
    this.bigTailCount = 0; //计数器，控制图片顺序

    this.bigEyeTimer = 0;
    this.bigEyeCount = 0;
    this.bigEyeInterval = 1000; //图片持续时间

    this.bigBodyCount=0;
    this.bigBody;
}

momObj.prototype.init = function () {
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    this.angle = 0;
}

momObj.prototype.draw = function () {

    this.x = lerpDistance(mx, this.x, 0.97);
    this.y = lerpDistance(my, this.y, 0.97);

    var deltaY = my - this.y;
    var deltaX = mx - this.x;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI; //-pi,pi
    this.angle = lerpAngle(beta, this.angle, 0.6);

    this.bigTailTimer += deltaTime;
    if (this.bigTailTimer > 50) {
        this.bigTailCount = (this.bigTailCount + 1) % 8; //0-7循环
        this.bigTailTimer %= 50; //对50取模，计时器归零
    }

    this.bigEyeTimer += deltaTime;
    if (this.bigEyeTimer > this.bigEyeInterval) {
        this.bigEyeCount = (this.bigEyeCount + 1) % 2;
        this.bigEyeTimer %= this.bigEyeInterval;
        //判断在睁眼闭眼的的时间
        if (this.bigEyeCount == 0) { //睁眼
            this.bigEyeInterval = Math.random() * 1500 + 2000;
        } else {
            this.bigEyeInterval = 200;
        }
    }

    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);

    var bigTailCount = this.bigTailCount;
    ctx1.drawImage(bigTail[bigTailCount], -bigTail[bigTailCount].width * 0.5 + 30, -bigTail[bigTailCount].height * 0.5);

    var bigBodyCount=this.bigBodyCount;
    if(data.double==1){
        ctx1.drawImage(bigBodyOra[bigBodyCount], -bigBodyOra[bigBodyCount].width * 0.5, -bigBodyOra[bigBodyCount].height * 0.5);
    }
    else{
        ctx1.drawImage(bigBodyBlue[bigBodyCount], -bigBodyBlue[bigBodyCount].width * 0.5, -bigBodyBlue[bigBodyCount].height * 0.5);        
    }
    

    var bigEyeCount = this.bigEyeCount;
    ctx1.drawImage(bigEye[bigEyeCount], -bigEye[bigEyeCount].width * 0.5, -bigEye[bigEyeCount].height * 0.5);
    ctx1.restore();
}