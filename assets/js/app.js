const canvas = document.getElementById("gameScreen");
const context = canvas.getContext("2d");
const fps = 40;
const width = 800;
const height = 300;
const gv = 2;

const dinoModel = {
    posY: 150,
    velY: 0,
    pixelJump: 26,
    res: 10,
    onAir: false,
};

const jump = () => {
    dinoModel.onAir = true;
    dinoModel.velY = dinoModel.pixelJump;
};

const gravityCanvas = () => {
    if (dinoModel.onAir) {
        if (dinoModel.posY > 200) {
            console.log("if: " + dinoModel.posY);
            dinoModel.onAir = false;
            dinoModel.velY = 0;
            dinoModel.posY = 150;
        } else {
            console.log("else: " + dinoModel.posY);
            dinoModel.velY -= gv;
            dinoModel.posY -= dinoModel.velY;
        }
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

const prepareImage = () => {
    dino.src = "../img/trex.png";
};

const loadImageDino = () => {
    const dino = new Image();
    dino.src = "./assets/img/trex.png";
    context.drawImage(dino, 0, 0, 207, 219, 100, dinoModel.posY, 100, 100);
};

const loadImagC = () => {
    const c = new Image();
    c.src = "./assets/img/C.png";
    context.drawImage(c, 0, 0, 50, 75, 200, 175, 50, 75);
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
