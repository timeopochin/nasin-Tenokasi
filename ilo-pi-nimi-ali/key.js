class Key {
    constructor(key, x, y, size) {
        this.key = key;
        this.x = x;
        this.y = y;
        this.size = size;
        this.pressed = false;
    }

    hover() {
        return mouseX > this.x - this.size/2 &&
               mouseX < this.x + this.size/2 &&
               mouseY > this.y - this.size/2 &&
               mouseY < this.y + this.size/2;
    }

    toggle() {
        this.pressed = !this.pressed;
    }

    resize(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    draw() {
        if (this.pressed) {
            fill(64, 255, 128);
        } else {
            fill(128);
        }
        rect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
    }
}
