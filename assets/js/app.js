const canvas = document.getElementById("gameScreen");
const context = canvas.getContext("2d");
const fps = 40;
const width = 800;
const height = 300;
const gv = 2;
const vX = 9;

let gameOver = false;

const dinoWidth = 100;
const dinoHeight = 100;
const dinoPosIniX = 100;

const wallWidth = 50;

let record = 0;

const modelGround = {
    posX: 0,
};

const space = () => {
    return 200 * (Math.floor(Math.random() * 4) + 1);
};

const dinoModel = {
    posY: 150,
    pixelJump: 22,
    onAir: false,
};

const modelWall = {
    posCX: width,
    posOX: width + 250,
    posLX: width + 500,
    posAX: width + 750,
    posBX: width + 1000,
};

const jump = () => {
    dinoModel.posY = dinoModel.posY - dinoModel.pixelJump;
    dinoModel.onAir = true;
};

const gravityCanvas = () => {
    if (dinoModel.posY < 150) {
        dinoModel.posY -= dinoModel.pixelJump;
        dinoModel.pixelJump -= gv;
    } else {
        dinoModel.posY = 150;
        dinoModel.pixelJump = 22;
    }
};

const isAlive = (wallPosX, wallHeight) => {
    if (
        dinoPosIniX <= wallPosX &&
        wallPosX <= dinoPosIniX + dinoHeight &&
        dinoModel.posY + dinoWidth > wallHeight
    ) {
        gameOver = true;
        console.log("choco");
    }
};

document.addEventListener("keydown", (event) => {
    const key = event.keyCode || event.code;
    if (key === "Space" || key == 32) {
        jump();
    }
});

const clear = () => {
    canvas.width = width;
    canvas.height = height;
};

const loadImageDino = () => {
    const dino = new Image();
    dino.src = "./assets/img/trex.png";
    context.drawImage(
        dino,
        0,
        0,
        207,
        219,
        dinoPosIniX,
        dinoModel.posY,
        dinoHeight,
        dinoWidth
    );
};

const loadImagC = () => {
    const c = new Image();
    c.src = "./assets/img/C.png";
    context.drawImage(c, 0, 0, 50, 75, modelWall.posCX, 175, 50, 75);
    isAlive(modelWall.posCX, 175);
    isAlive(modelWall.posCX + wallWidth, 235);

    const o = new Image();
    o.src = "./assets/img/O.png";
    context.drawImage(o, 0, 0, 50, 75, modelWall.posOX, 200, 50, 75);
    isAlive(modelWall.posOX, 200);
    isAlive(modelWall.posOX + wallWidth, 255);

    const l = new Image();
    l.src = "./assets/img/L.png";
    context.drawImage(l, 0, 0, 50, 75, modelWall.posLX, 175, 50, 75);
    isAlive(modelWall.posLX, 175);
    isAlive(modelWall.posLX + wallWidth, 235);

    const a = new Image();
    a.src = "./assets/img/A.png";
    context.drawImage(a, 0, 0, 50, 75, modelWall.posAX, 200, 50, 75);
    isAlive(modelWall.posAX, 200);
    isAlive(modelWall.posAX + wallWidth, 255);

    const b = new Image();
    b.src = "./assets/img/B.png";
    context.drawImage(b, 0, 0, 50, 75, modelWall.posBX, 175, 50, 75);
    isAlive(modelWall.posBX, 175);
    isAlive(modelWall.posBX + wallWidth, 235);

    if (modelWall.posCX < -51) {
        modelWall.posCX = modelWall.posBX + space();
    } else {
        modelWall.posCX -= vX;
    }

    if (modelWall.posOX < -51) {
        modelWall.posOX = modelWall.posCX + space();
    } else {
        modelWall.posOX -= vX;
    }

    if (modelWall.posLX < -51) {
        modelWall.posLX = modelWall.posOX + space();
    } else {
        modelWall.posLX -= vX;
    }

    if (modelWall.posAX < -51) {
        modelWall.posAX = modelWall.posLX + space();
    } else {
        modelWall.posAX -= vX;
    }

    if (modelWall.posBX < -51) {
        modelWall.posBX = modelWall.posAX + space();
    } else {
        modelWall.posBX -= vX;
    }
};

const loadGround = () => {
    const ground = new Image();
    ground.src = "./assets/img/suelo.png";
    context.drawImage(ground, modelGround.posX, 0, 1600, 12, 0, 235, 1600, 12);

    if (modelGround.posX > 800) {
        modelGround.posX = 0;
    } else {
        modelGround.posX += vX;
    }
};

const stats = () => {
    context.font = "30px impact";
    context.fillStyle = "#515151";
    context.fillText("record: " + record, 550, 100);
    record += 1;
};

const main = () => {
    gravityCanvas();
    loadImageDino();
    loadGround();
    loadImagC();
    stats();
};

setInterval(() => {
    if (!gameOver) {
        clear();
        main();
    } else {
        context.font = "50px impact";
        context.fillStyle = "#515151";
        context.fillText("Game Over", 250, 50);
    }
}, 1000 / fps);
