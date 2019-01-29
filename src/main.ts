import * as PIXI from "pixi.js";

import { ok } from "./import-example";
console.log(`import ${ok()}`);

const width = 256;
const height = 256;

const app = new PIXI.Application({
    autoResize: true,
    resolution: devicePixelRatio,
});
document.querySelector('#frame').appendChild(app.view);

const stage = new PIXI.Container();

const g = new PIXI.Graphics();

// Listen for window resize events
window.addEventListener('resize', resize);

// Resize function window
function resize() {

    // Get the p
    const parent = app.view.parentNode as HTMLElement;

    // Resize the renderer
    app.renderer.resize(parent.clientWidth, parent.clientHeight);

    // You can use the 'screen' property as the renderer visible
    // area, this is more useful than view.width/height because
    // it handles resolution
    g.position.set(app.screen.width, app.screen.height);
}
resize();

const ball = {
    velocity: {
        x: 5,
        y: 3,
    },
    position: {
        x: 100,
        y: 200
    },
    sprite: (() => {
        const sprite = new PIXI.Sprite(g.generateCanvasTexture());
        sprite.anchor.set(.5, .5);
        stage.addChild(sprite);
        return sprite;
    })()
}



function update() {
    ball.velocity.y += .1; // gravity
    ball.position.x += ball.velocity.x;
    ball.position.y += ball.velocity.y;
    if (ball.position.x < 0) {
        ball.position.x = -ball.position.x;
        ball.velocity.x = -ball.velocity.x;
    }
    if (ball.position.y < 0) {
        ball.position.y = -ball.position.y;
        ball.velocity.y = -ball.velocity.y;
    }
    if (ball.position.x >= width) {
        ball.position.x = width - ball.position.x + width;
        ball.velocity.x = -ball.velocity.x;
    }
    if (ball.position.y >= width) {
        ball.position.y = height - ball.position.y + height;
        ball.velocity.y = -ball.velocity.y;
    }

    setTimeout(update, 10); // 100 UPS
}

function render(timestamp: number) {
    ball.sprite.x = ball.position.x;
    ball.sprite.y = ball.position.y;

    app.renderer.render(stage);
    requestAnimationFrame(render);
}

setTimeout(update);
requestAnimationFrame(render);