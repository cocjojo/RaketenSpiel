const app = new PIXI.Application();
const ufolist= [];
document.body.appendChild(app.view);

const rocket = PIXI.Sprite.from('assets/rocket.png');
rocket.x = 350;
rocket.y = 520;
rocket.scale.x = 0.05;
rocket.scale.y = 0.05;
app.stage.addChild(rocket);


gameInterval(function () {
    const ufo = PIXI.Sprite.from('assets/ufo' + random(1, 2) + '.png');
    ufo.x = random(0, 700);
    ufo.y = -25;
    ufo.scale.x = 0.1;
    ufo.scale.y = 0.1;
    app.stage.addChild(ufo);
    ufolist.push(ufo);
    flyDown(ufo, 3);

    waitForCollision(ufo, rocket).then(function () {
        app.stage.removeChild(rocket);
        stopGame();
    });
}, 100);



function leftKeyPressed() {
    rocket.x = rocket.x - 10;
}

function rightKeyPressed() {
    rocket.x = rocket.x + 10;
}

function spaceKeyPressed() {
    const bullet = PIXI.Sprite.from('assets/bullet.png');
    bullet.x = rocket.x + 13;
    bullet.y = 500
    bullet.scale.x = 0.03;
    bullet.scale.y = 0.03;
    flyUp(bullet);
    app.stage.addChild(bullet);

    waitForCollision(bullet, ufolist).then(function ([bullet, ufo]) {
        app.stage.removeChild(bullet);
        app.stage.removeChild(ufo);
    });
}

