const CELL_SIDE = 10;
const ROWS = 50;
const COLS = 50;

const app = new PIXI.Application({
    width: CELL_SIDE * COLS,
    height: CELL_SIDE * ROWS,
});
app.ticker.minFPS = 0;
app.ticker.maxFPS = 4;
document.body.appendChild(app.view);

const graphics = new PIXI.Graphics();
app.stage.addChild(graphics);

const world = new World(ROWS, COLS);
const snake = new Snake(new Cell(world, 25, 24));
world.add_snake(snake);

_.times(10, () => {
    world.add_food_random();
});

let directionChanged = false;

function keyPressed(key) {
    if (directionChanged) {
        console.log("direction already changed in this iteration");
        return;
    }
    if (key.keyCode > 40 || key.keyCode < 37) {
        console.log("invalid key");
        return;
    }
    key = (key.keyCode - 38 + 4) % 4;
    console.log(key);
    if (Math.abs(snake.direction - key) % 2 === 0) {
        console.log("invalid turn");
        return;
    }
    snake.direction = key;
}

function update(delta) {
    world.tick();

    graphics.clear();
    graphics.beginFill(0xaaaaaa);

    // let turn = Math.random() > 0.9;
    // if (turn) {
    //     if (Math.random() >= 0.5) {
    //         world.snakes[0].turn_left();
    //         // console.log("turning left");
    //     } else {
    //         world.snakes[0].turn_right();
    //         // console.log("turning right");
    //     }
    // }

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

    directionChanged = false;
}

const stepButton = document.getElementById("step-button");
stepButton.addEventListener("click", update);
document.addEventListener("keydown", keyPressed);
app.ticker.add(update);

