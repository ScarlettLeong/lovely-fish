var dataObj = function () {
    this.fruitNum = 0;
    this.double = 1; //blue分值double
    this.score = 0;
    this.gameOver=false;
    this.alpha=0;
}

// dataObj.prototype.reset = function () {
//     this.fruitNum = 0;
//     this.double = 1;
// }

dataObj.prototype.draw = function () {
    ctx1.save();
    ctx1.shadowBlur=10;
    ctx1.shadowColor="white";
    ctx1.fillStyle = "white";
    ctx1.fillText("score: " + this.score, canWidth * 0.5, canHeight - 80);

    if(data.gameOver){
        this.alpha+=deltaTime*0.0005;
        ctx1.fillStyle="rgba(255,255,255,"+this.alpha+")";//alpha值
        ctx1.fillText("GAMEOVER",canWidth*0.5,canHeight*0.5);
    }
    ctx1.restore();
}

dataObj.prototype.addScore = function () {
    this.score += this.fruitNum * 10 * this.double;
    this.fruitNum = 0;
    this.double = 1;
}