import * as PIXI from "pixi.js";

import { ok } from "./import-example";
console.log(`import ${ok()}`);

const app = new PIXI.Application({
    autoResize: true,
    resolution: devicePixelRatio,
});
document.querySelector('#frame').appendChild(app.view);

const stage = new PIXI.Container();

let mode = 1;

// Add the 'keydown' event listener to our document
document.addEventListener('keydown', onKeyDown);

function onKeyDown(key: KeyboardEvent) {
    if (key.keyCode === 32) {
        mode = mode === 0 ? 1 : 0;
    }
}

// Listen for window resize events
window.addEventListener('resize', resize);

let width = 256;
let height = 256;

// Resize function window
function resize() {

    // Get the p
    const parent = app.view.parentNode as HTMLElement;

    // Resize the renderer
    app.renderer.resize(parent.clientWidth, parent.clientHeight);

    // You can use the 'screen' property as the renderer visible
    // area, this is more useful than view.width/height because
    // it handles resolution
    //g.position.set(app.screen.width, app.screen.height);
    width = app.screen.width;
    height = app.screen.height;
}
resize();


const g = new PIXI.Graphics();
g.beginFill(0xffff00);
g.lineStyle(0);
g.drawCircle(10, 10, 10);
g.endFill();

const ball = {
    position: {
        x: 0,
        y: 0,
    },
    sprite: (() => {
        const sprite = new PIXI.Sprite(g.generateCanvasTexture());
        sprite.anchor.set(.5, .5);
        stage.addChild(sprite);
        return sprite;
    })()
}

const pls: any[] = [];
for (let i = 0; i < 5; i++) {
    pls.push(createPl());
}

function createPl() {
    const distance = Math.random() * 250 + 50;
    const speed = Math.random() - 0.5;
    const pl = {
        position: {
            x: 0,
            y: 0
        },
        distance: distance,
        speed: speed + (speed / Math.abs(speed)) * 0.3,
        startAngle: Math.random() * 2 * Math.PI,
        sprite: (() => {
            const g = new PIXI.Graphics();
            g.beginFill(0x00ffff);
            g.lineStyle(0);
            const size = Math.random() * 15 + 5;
            g.drawCircle(size, size, size);
            g.endFill();
            const sprite = new PIXI.Sprite(g.generateCanvasTexture());
            sprite.anchor.set(.5, .5);
            stage.addChild(sprite);
            return sprite;
        })()
    }
    return pl;
}

let t = 0;

function update() {
    ball.position.x = width / 2;
    ball.position.y = height / 2;

    for (const pl of pls) {
        pl.position.x = ball.position.x + pl.distance * Math.cos(pl.startAngle + pl.speed * t / 1000);
        pl.position.y = ball.position.y + pl.distance * Math.sin(pl.startAngle + pl.speed * t / 1000);
    }

    if (mode === 1) {
        // global tiem
        t += 10;
    }

    setTimeout(update, 10); // 100 UPS
}

function render(timestamp: number) {
    ball.sprite.x = ball.position.x;
    ball.sprite.y = ball.position.y;

    for (const pl of pls) {
        pl.sprite.x = pl.position.x;
        pl.sprite.y = pl.position.y;
    }

    app.renderer.render(stage);
    requestAnimationFrame(render);
}

setTimeout(update);
requestAnimationFrame(render);