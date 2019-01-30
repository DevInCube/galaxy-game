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
    var PIXI, import_example_1, app, stage, mode, width, height, scale, countingText, g, ball, pls, t;
    var __moduleName = context_2 && context_2.id;
    function onKeyDown(key) {
        if (key.keyCode === 32) {
            mode = mode === 0 ? 1 : 0;
        }
    }
    function onScroll(e) {
        scale += e.deltaY / 10;
        if (scale < 0.1) {
            scale = 0.1;
        }
    }
    // Resize function window
    function resize() {
        // Get the p
        var parent = app.view.parentNode;
        // Resize the renderer
        app.renderer.resize(parent.clientWidth, parent.clientHeight);
        // You can use the 'screen' property as the renderer visible
        // area, this is more useful than view.width/height because
        // it handles resolution
        //g.position.set(app.screen.width, app.screen.height);
        width = app.screen.width;
        height = app.screen.height;
    }
    function createPl() {
        var maxDist = 200;
        var distance = Math.random() * (maxDist - 50) + 50;
        var size = Math.sin(distance / maxDist * Math.PI) * 10 + 3;
        var speed = maxDist / distance;
        var pl = {
            position: {
                x: 0,
                y: 0
            },
            distance: distance,
            speed: speed,
            startAngle: Math.random() * 2 * Math.PI,
            angle: 0,
            sprite: (function () {
                var g = new PIXI.Graphics();
                g.beginFill(0x00ffff);
                g.lineStyle(0);
                g.drawCircle(size, size, size);
                g.endFill();
                var sprite = new PIXI.Sprite(g.generateCanvasTexture());
                sprite.anchor.set(.5, .5);
                stage.addChild(sprite);
                return sprite;
            })()
        };
        return pl;
    }
    function update() {
        ball.position.x = width / 2;
        ball.position.y = height / 2;
        for (var _i = 0, pls_1 = pls; _i < pls_1.length; _i++) {
            var pl = pls_1[_i];
            pl.angle = pl.startAngle + pl.speed * t / 1000;
        }
        if (mode === 1) {
            // global tiem
            t += 10;
        }
        setTimeout(update, 10); // 100 UPS
    }
    function render(timestamp) {
        countingText.text = "scale: " + scale.toFixed(1) + ((mode === 1) ? " [paused]" : "");
        //
        ball.sprite.scale.x = scale;
        ball.sprite.scale.y = scale;
        ball.sprite.x = ball.position.x;
        ball.sprite.y = ball.position.y;
        for (var _i = 0, pls_2 = pls; _i < pls_2.length; _i++) {
            var pl = pls_2[_i];
            pl.sprite.scale.x = scale;
            pl.sprite.scale.y = scale;
            //
            pl.sprite.x = ball.position.x + scale * pl.distance * Math.cos(pl.startAngle + pl.speed * t / 1000);
            pl.sprite.y = ball.position.y + scale * pl.distance * Math.sin(pl.startAngle + pl.speed * t / 1000);
        }
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
            app = new PIXI.Application({
                autoResize: true,
                resolution: devicePixelRatio
            });
            document.querySelector('#frame').appendChild(app.view);
            stage = new PIXI.Container();
            mode = 1;
            // Add the 'keydown' event listener to our document
            document.addEventListener('keydown', onKeyDown);
            // Listen for window resize events
            window.addEventListener('resize', resize);
            width = 256;
            height = 256;
            window.addEventListener('wheel', onScroll);
            scale = 0.5;
            // create a text object that will be updated...
            countingText = new PIXI.Text('', {
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
            resize();
            g = new PIXI.Graphics();
            g.beginFill(0xffff00);
            g.lineStyle(0);
            g.drawCircle(10, 10, 10);
            g.endFill();
            ball = {
                position: {
                    x: 0,
                    y: 0
                },
                sprite: (function () {
                    var sprite = new PIXI.Sprite(g.generateCanvasTexture());
                    sprite.anchor.set(.5, .5);
                    stage.addChild(sprite);
                    return sprite;
                })()
            };
            pls = [];
            for (var i = 0; i < 5; i++) {
                pls.push(createPl());
            }
            t = 0;
            setTimeout(update);
            requestAnimationFrame(render);
        }
    };
});
//# sourceMappingURL=app.js.map