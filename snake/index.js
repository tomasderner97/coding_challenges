const CELL_SIDE = 10;
const ROWS = 50;
const COLS = 50;

const app = new PIXI.Application({
    width: CELL_SIDE * COLS,
    height: CELL_SIDE * ROWS,
});
app.ticker.minFPS = 0;
app.ticker.maxFPS = 0;
document.body.appendChild(app.view);

const graphics = new PIXI.Graphics();
app.stage.addChild(graphics);

const world = new World(ROWS, COLS);
world.add_snake(new Snake(new Cell(world, 25, 24)));

_.times(100, () => {
    world.add_food(
        new Cell(
            world,
            Math.floor(Math.random() * ROWS),
            Math.floor(Math.random() * COLS)
        )
    );
});

let directionChanged = false;

function update(delta) {
    graphics.clear();
    graphics.beginFill(0xaaaaaa);

    let turn = Math.random() > 0.9;
    if (turn) {
        if (Math.random() >= 0.5) {
            world.snakes[0].turn_left();
            // console.log("turning left");
        } else {
            world.snakes[0].turn_right();
            // console.log("turning right");
        }
    }

    for (let s of world.snakes) {
        for (let bp of s.bodyParts) {
            let [bpRow, bpCol] = Cell.from_value(world, bp).unpack();
            graphics.drawRect(
                bpCol * CELL_SIDE,
                bpRow * CELL_SIDE,
                CELL_SIDE, CELL_SIDE
            );
        }
    }

    graphics.endFill();

    graphics.beginFill(0x00ff00);
    for (let f of world.foods) {
        let [fRow, fCol] = Cell.from_value(world, f).unpack();
        graphics.drawRect(
            fCol * CELL_SIDE,
            fRow * CELL_SIDE,
            CELL_SIDE, CELL_SIDE
        );
    }
    graphics.endFill();

    world.tick();
}

document.getElementById("step-button").addEventListener("click", update);
// app.ticker.add(update);

