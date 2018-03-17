//碰撞检测,判断大鱼和果实的距离
function momFruitCollision() {
    if (!data.gameOver) {
        for (var i = 0; i < fruit.num; i++) {
            if (fruit.alive[i]) {
                var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y); //计算距离
                if (l < 900) {
                    fruit.dead(i);
                    data.fruitNum++; //吃掉的果实数量
                    mom.bigBodyCount++;
                    if (mom.bigBodyCount > 7) {
                        mom.bigBodyCount = 7;
                    }
                    if (fruit.fruitType[i] == "blue") {
                        data.double = 2;
                    }
                    wave.born(fruit.x[i], fruit.y[i]);
                }
            }
        }
    }
}

//大鱼喂小鱼
function momBabyCollisin() {
    if (data.fruitNum > 0 && !data.gameOver) {
        var l = calLength2(mom.x, mom.y, baby.x, baby.y); //计算距离    
        if (l < 900) {
            //recover
            baby.babyBodyCount = 0;
            // data.reset();
            mom.bigBodyCount = 0;

            //add score
            data.addScore();

            wave2.born(baby.x,baby.y);
        }
    }
}