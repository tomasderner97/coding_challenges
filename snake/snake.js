class Snake {
    constructor(firstBodyPart) {
        this.head = firstBodyPart;
        this.bodyParts = new Set([firstBodyPart.value]);
        this.alive = true;
        this.direction = Directions.up
    }

    set_world(world) {
        this.world = world;
    }

    move() {
        const nextCell = this.head.cellInDirection(this.direction);
        let foundFood = false;

        if (this.world.is_collision(nextCell)) {
            this.alive = false;
            console.log("Snake died");
        } else if (this.world.is_food(nextCell)) {
            foundFood = true;
            this.world.remove_food(nextCell);
            this.world.add_food_random();
        }

        this.set_head(nextCell);
        if (!foundFood) {
            this.drop_tail();
        }
    }

    set_head(cell) {
        this.head = cell;
        this.bodyParts.add(cell.value);
    }

    drop_tail() {
        this.bodyParts.delete(this.bodyParts.values().next().value)
    }

    turn_left() {
        this.direction = (this.direction + 4 - 1) % 4
    }

    turn_right() {
        this.direction = (this.direction + 4 + 1) % 4
    }
}