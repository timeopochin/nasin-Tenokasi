// Constants
let keyCount = 7;
let stenoKeys = 'STKPWHR';

let keys = [];
let current = '';
let valid = false;

function setup() {
    createCanvas(windowWidth - 40, windowHeight - 40);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(width*0.8/(keyCount + 1));

    // Create keys
    for (let i = 0; i < keyCount; i++) {
        keys.push(new Key(stenoKeys[i],
                          width*(i + 1)/(keyCount + 1),
                          width/(keyCount + 1),
                          width*(0.9)/(keyCount + 1)));
    }
}

function draw() {
    background(64);

    // Draw keys
    for (let i = 0; i < keyCount; i++) {
        keys[i].draw();
    }

    // Write word
    if (valid) {
        fill(255);
    } else {
        fill(128);
    }
    text(current, width/2, width*2.5/(keyCount + 1));
}

function mouseClicked() {

    // Toggle keys
    for (let i = 0; i < keyCount; i++) {
        if (keys[i].hover()) {
            keys[i].toggle();
        }
    }

    // Set current word
    setCurrent();
}

function windowResized() {
    resizeCanvas(windowWidth - 40, windowHeight - 40);
    textSize(width*0.8/(keyCount + 1));

    // Resize keys
    for (let i = 0; i < keyCount; i++) {
        keys[i].resize(width*(i + 1)/(keyCount + 1),
                       width/(keyCount + 1),
                       width*(0.9)/(keyCount + 1));
    }
}

function keyPressed() {
    switch (key) {
        case ' ':
            current = '';
            break;
        case '.':
        case ',':
        case ':':
        case '!':
        case '?':
        case 'Enter':
            current = key;
            break;
        case 'a':
        case 'e':
        case 'i':
        case 'o':
        case 'u':
        case 'j':
        case 'k':
        case 'l':
        case 'm':
        case 'n':
        case 'p':
        case 's':
        case 't':
        case 'w':
            if (!match(current, '^[a-z]+$')) {
                current = '';
            }
            current += key;
            break;
        case 'Backspace':
            if (current.length && match(current, '^[a-z][a-z]+$')) {
                current = current.substring(0, current.length - 1);
            } else {
                current = key;
            }
            break;
    }

    // Check if valid
    let chord = Object.keys(chords).find(word => chords[word] === current);
    if (chord) {
        valid = true;

        // Set keys
        for (let i = 0; i < keyCount; i++) {
            if (match(chord, keys[i].key)) {
                keys[i].pressed = true;
            } else {
                keys[i].pressed = false;
            }
        }
    } else {
        valid = false;

        // Unset keys
        for (let i = 0; i < keyCount; i++) {
            keys[i].pressed = false;
        }
    }
}

// My functions
function setCurrent() {
    fill(255);
    let chord = '';
    for (let i = 0; i < keyCount; i++) {
        if (keys[i].pressed) {
            chord += keys[i].key;
        }
    }
    if (chord) {
        current = chords[chord]
        valid = true;
    } else {
        current = '';
    }
}
