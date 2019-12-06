class World {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.snakes = [];
        this.barriers = new Set();
        this.foods = new Set();
    }

    add_snake(snake) {
        snake.set_world(this);
        this.snakes.push(snake);
    }

    add_food(cell) {
        this.foods.add(cell.value);
    }

    is_food(cell) {
        return this.foods.has(cell.value);
    }

    is_collision(cell) {
        if (this.barriers.has(cell.value)) return true;

        for (let snake of this.snakes)
            if (snake.bodyParts.has(cell.value)) return true;

        return false;
    }

    tick() {
        for (let snake of this.snakes) {
            snake.move();
        }
    }
}