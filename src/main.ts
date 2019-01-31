import * as PIXI from "pixi.js";

import { ok } from "./import-example";
console.log(`import ${ok()}`);

// utils
function sign(x: number) {
    return x / Math.abs(x);
}
//

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

window.addEventListener('wheel', onScroll);

let scale = 1;

function onScroll(e: WheelEvent) {
    const minScale = 0.3;
    const stepScale = 0.1;
    //
    scale += sign(e.deltaY) * stepScale;
    if (scale < minScale) {
        scale = minScale;
    }
}

// create a text object that will be updated...
var countingText = new PIXI.Text('', {
    // font: 'bold italic 60px Arvo', 
    fill: 'yellow',
    align: 'center',
    stroke: '#a4410e',
    strokeThickness: 1
});

countingText.position.x = 5;
countingText.position.y = 5;
countingText.anchor.x = 0.0;

stage.addChild(countingText);

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


const abs: any[] = [];
for (let i = 0; i < 1; i++) {
    abs.push(createAb(250, 20));
}

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
    const maxDist = 200;
    const distance = Math.random() * (maxDist - 50) + 50;
    const size = Math.sin(distance / maxDist * Math.PI) * 10 + 3;
    const speed = maxDist / distance;
    const pl = {
        position: {
            x: 0,
            y: 0
        },
        distance: distance,
        speed: speed,
        startAngle: Math.random() * 2 * Math.PI,
        angle: 0,
        sprite: (() => {
            const g = new PIXI.Graphics();
            g.beginFill(0x00ffff);
            g.lineStyle(0);
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

function createAb(distance: number, size: number) {
    const pl = {
        distance: distance,
        sprite: (() => {
            const g = createTorus(distance - size, distance + size);
            const sprite = new PIXI.Sprite(g.generateCanvasTexture());
            sprite.anchor.set(.5, .5);
            stage.addChild(sprite);
            return sprite;
        })()
    }
    return pl;
}

function createTorus(innerSize: number, outerSize: number) {
    const g = new PIXI.Graphics();
    g.beginFill(0x00ffff, 0.5);
    g.lineStyle(0);
    g.drawCircle(outerSize / 2, outerSize / 2, outerSize);
    g.endFill();
    g.beginFill(0x000000, 1);
    g.lineStyle(0);
    g.drawCircle(outerSize / 2, outerSize / 2, innerSize);
    g.endFill();
    return g;
}

let t = 0;

function update() {
    ball.position.x = width / 2;
    ball.position.y = height / 2;

    for (const pl of pls) {
        pl.angle = pl.startAngle + pl.speed * t / 1000;
    }

    if (mode === 1) {
        // global tiem
        t += 10;
    }

    setTimeout(update, 10); // 100 UPS
}

function render(timestamp: number) {
    countingText.text = `scale: ${scale.toFixed(1)}` + ((mode === 0) ? " [paused]" : "");
    //
    ball.sprite.scale.x = scale;
    ball.sprite.scale.y = scale;
    ball.sprite.x = ball.position.x;
    ball.sprite.y = ball.position.y;

    for (const pl of pls) {
        pl.sprite.scale.x = scale;
        pl.sprite.scale.y = scale;
        //
        pl.sprite.x = ball.position.x + scale * pl.distance * Math.cos(pl.startAngle + pl.speed * t / 1000);
        pl.sprite.y = ball.position.y + scale * pl.distance * Math.sin(pl.startAngle + pl.speed * t / 1000);
    }
    //
    for (const ab of abs) {
        ab.sprite.scale.x = scale;
        ab.sprite.scale.y = scale;
        //
        ab.sprite.x = ball.position.x;
        ab.sprite.y = ball.position.y;
    }
    //
    app.renderer.render(stage);
    requestAnimationFrame(render);
}

setTimeout(update);
requestAnimationFrame(render);