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
    var PIXI, import_example_1, width, height, app, stage, g, ball;
    var __moduleName = context_2 && context_2.id;
    // Resize function window
    function resize() {
        // Get the p
        var parent = app.view.parentNode;
        // Resize the renderer
        app.renderer.resize(parent.clientWidth, parent.clientHeight);
        // You can use the 'screen' property as the renderer visible
        // area, this is more useful than view.width/height because
        // it handles resolution
        g.position.set(app.screen.width, app.screen.height);
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
    function render(timestamp) {
        ball.sprite.x = ball.position.x;
        ball.sprite.y = ball.position.y;
        app.renderer.render(stage);
        requestAnimationFrame(render);
    }
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
            app = new PIXI.Application({
                autoResize: true,
                resolution: devicePixelRatio
            });
            document.querySelector('#frame').appendChild(app.view);
            stage = new PIXI.Container();
            g = new PIXI.Graphics();
            // Listen for window resize events
            window.addEventListener('resize', resize);
            resize();
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