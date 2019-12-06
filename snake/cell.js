const Directions = Object.freeze({
    "up": 0,
    "right": 1,
    "down": 2,
    "left": 3,
});


/**
 * Cell is a hack needed because javascript doesn't have tuples and arrays are compared by reference.
 * This uses bitwise operators, here is a great explanation:
 * https://stackoverflow.com/questions/6556961/use-of-the-bitwise-operators-to-pack-multiple-values-in-one-int
 */
class Cell {
    constructor(world, row, col) {
        if (row === undefined || col === undefined) {
            this.value = 0;
        } else {
            this.value = this._pack(row, col);
        }
        this.world = world;
    }

    _pack(row, col) {
        return row << 16 | col;
    }

    unpack() {
        const col = this.value & 0xffff;
        const row = this.value >> 16;

        return [row, col]
    }

    cellInDirection(direction) {
        switch (direction) {
            case Directions.up:
                return this._cellAtRelativePosition(-1, 0);
            case Directions.right:
                return this._cellAtRelativePosition(0, 1);
            case Directions.down:
                return this._cellAtRelativePosition(1, 0);
            case Directions.left:
                return this._cellAtRelativePosition(0, -1);
            default:
                console.error("Problem with direction")
        }
    }

    /**
     * Helper function, which gives a cell that is `rows` down and `cols` to the right from this.
     * @param rows how many rows down
     * @param cols how many cols to the right
     * @returns {Cell} cell at given relative position
     * @private
     */
    _cellAtRelativePosition(rows, cols) {
        const [row, col] = this.unpack();
        let new_row = (row + rows + this.world.width);
        new_row = new_row % this.world.width;
        let new_col = (col + cols + this.world.height);
        new_col = new_col % this.world.height;

        return new Cell(this.world, new_row, new_col);
    }

    static from_value(world, value) {
        let cell = new Cell(world);
        cell.value = value;

        return cell;
    }
}