const CELL_SIDE = 10;
const ROWS = 50;
const COLS = 50;

const app = new PIXI.Application({
    width: CELL_SIDE * COLS,
    height: CELL_SIDE * ROWS,
});
document.body.appendChild(app.view);

const graphics = new PIXI.Graphics().lineStyle(0).beginFill(0xffffff).drawRect(0, 0, 1, 1).endFill();
const texture = app.renderer.generateTexture(graphics);

const points = [];

console.log(points);
app.ticker.add((delta) => {
    _.times(100, () => {
        let point;
        while (true) {
            point = [Math.floor(Math.random() * CELL_SIDE * ROWS), Math.floor(Math.random() * CELL_SIDE * COLS)];
            if (_.findIndex(points, point) < 0) break;
            // console.log(point);
        }

        let sprite = new PIXI.Sprite(texture);
        sprite.x = point[0];
        sprite.y = point[1];
        app.stage.addChild(sprite);

        points.push(point);
    });

});