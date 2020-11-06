const canvas = document.getElementById("gameScreen");
const context = canvas.getContext("2d");
const fps = 40;
const width = 800;
const height = 300;
const gv = 2;
const vX = 9;

const space = () => {
    return 200 * (Math.floor(Math.random() * 5) + 1);
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
    context.drawImage(dino, 0, 0, 207, 219, 100, dinoModel.posY, 100, 100);
};

const loadImagC = () => {
    const c = new Image();
    c.src = "./assets/img/C.png";
    context.drawImage(c, 0, 0, 50, 75, modelWall.posCX, 175, 50, 75);
    const o = new Image();
    o.src = "./assets/img/O.png";
    context.drawImage(o, 0, 0, 50, 75, modelWall.posOX, 200, 50, 75);
    const l = new Image();
    l.src = "./assets/img/L.png";
    context.drawImage(l, 0, 0, 50, 75, modelWall.posLX, 175, 50, 75);
    const a = new Image();
    a.src = "./assets/img/A.png";
    context.drawImage(a, 0, 0, 50, 75, modelWall.posAX, 200, 50, 75);
    const b = new Image();
    b.src = "./assets/img/B.png";
    context.drawImage(b, 0, 0, 50, 75, modelWall.posBX, 175, 50, 75);

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

const main = () => {
    gravityCanvas();
    loadImageDino();
    loadImagC();
};

setInterval(() => {
    clear();
    main();
}, 1000 / fps);
