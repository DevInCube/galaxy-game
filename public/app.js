System.register("import-example", [], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    function ok() {
        return "ok";
    }
    exports_1("ok", ok);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("main", ["pixi.js", "import-example"], function (exports_2, context_2) {
    var __moduleName = context_2 && context_2.id;
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
    function render(timestamp) {
        ball.sprite.x = ball.position.x;
        ball.sprite.y = ball.position.y;
        renderer.render(stage);
        requestAnimationFrame(render);
    }
    var PIXI, import_example_1, width, height, renderer, stage, g, ball;
    return {
        setters: [
            function (PIXI_1) {
                PIXI = PIXI_1;
            },
            function (import_example_1_1) {
                import_example_1 = import_example_1_1;
            }
        ],
        execute: function () {
            console.log("import " + import_example_1.ok());
            width = 256;
            height = 256;
            renderer = PIXI.autoDetectRenderer(width, height);
            document.body.appendChild(renderer.view);
            stage = new PIXI.Container();
            g = new PIXI.Graphics();
            g.beginFill(0x00ff00);
            g.lineStyle(0);
            g.drawCircle(0, 0, 10);
            g.endFill();
            ball = {
                velocity: {
                    x: 5,
                    y: 3
                },
                position: {
                    x: 100,
                    y: 200
                },
                sprite: (function () {
                    var sprite = new PIXI.Sprite(g.generateCanvasTexture());
                    sprite.anchor.set(.5, .5);
                    stage.addChild(sprite);
                    return sprite;
                })()
            };
            setTimeout(update);
            requestAnimationFrame(render);
        }
    };
});
//# sourceMappingURL=app.js.map