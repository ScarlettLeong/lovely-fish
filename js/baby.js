var babyObj = function () {
    this.x;
    this.y;
    this.angle;

    this.babyTailTimer = 0; //计时器
    this.babyTailCount = 0; //计数器，控制图片顺序

    this.babyEyeTimer = 0;
    this.babyEyeCount = 0;
    this.babyEyeInterval = 1000; //图片持续时间

    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;

}

babyObj.prototype.init = function () {
    this.x = canWidth * 0.5 - 50;
    this.y = canHeight * 0.5 + 50;
    this.angle = 0;
}

babyObj.prototype.draw = function () {
    this.x = lerpDistance(mom.x, this.x, 0.97);
    this.y = lerpDistance(mom.y, this.y, 0.97);

    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI; //-pi,pi
    this.angle = lerpAngle(beta, this.angle, 0.6);

    //babytail count
    this.babyTailTimer += deltaTime;
    if (this.babyTailTimer > 50) {
        this.babyTailCount = (this.babyTailCount + 1) % 8; //0-7循环
        this.babyTailTimer %= 50; //对50取模，计时器归零
    }

    this.babyEyeTimer += deltaTime;
    if (this.babyEyeTimer > this.babyEyeInterval) {
        this.babyEyeCount = (this.babyEyeCount + 1) % 2;
        this.babyEyeTimer %= this.babyEyeInterval;
        //判断在睁眼闭眼的的时间
        if (this.babyEyeCount == 0) { //睁眼
            this.babyEyeInterval = Math.random() * 1500 + 2000;
        } else {
            this.babyEyeInterval = 200;
        }
    }

    //babybody fade
    this.babyBodyTimer += deltaTime;
    if (this.babyBodyTimer > 300) {
        this.babyBodyCount = this.babyBodyCount + 1;
        this.babyBodyTimer%=300;//计时器归零
        if (this.babyBodyCount > 19) {     
            this.babyBodyCount = 19; //19帧死亡
            data.gameOver=true;
        }
    }

    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);

    var babyTailCount = this.babyTailCount;
    ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width * 0.5 + 23, -babyTail[babyTailCount].height * 0.5);

    var babyBodyCount = this.babyBodyCount;
    ctx1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width * 0.5, -babyBody[babyBodyCount].height * 0.5);

    var babyEyeCount = this.babyEyeCount;
    ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width * 0.5, -babyEye[babyEyeCount].height * 0.5);
    ctx1.restore();
}