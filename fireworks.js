// used to display what the fireworks look like
var ascii_string = 'X2@adp#r9^kI!CQp&7S$WaT6';

// firework class used to move upward
class ASCIIFirework {
    constructor(xPos, yPos, alpha, size) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.size = size // text size
        this.alpha = alpha; // determines how transparent/opaque text is
        this.isMovingUp = false; // determines if the firework is moving up
        this.readyToSpark = true;  // determines if the fireworks eventually summon the sparks 
        this.symbol = ascii_string[Math.floor(Math.random() * ascii_string.length)]; // determine what the firework looks like by picking a random character in the ASCII string
        this.sparks = []; // list is used to store the number of firework sparks
    }

    // method to draw the firework
    display() {
        // used to change the color of the firework
        if (isRainbow) { 
            fill(are, gee, bee, this.alpha);
        } else {
            fill(225, 75, 35, this.alpha); 
        }

        // determines the size of the firework
        textSize(this.size);
        // displays the firework
        text(this.symbol, this.xPos, this.yPos);

        // create sparks when firework reached a certain height
        if (this.yPos < random(height / 2.5))   { 
            // hide firework
            this.alpha = 0;
            
            // used so that each spark does not "jitter"
            if (this.readyToSpark) {
                // firework generates 8 sparks
                for (let i = 0; i < 8; i++) {
                    this.sparks[i] = new ASCIIFireworkSparks(this.xPos, this.yPos, 255, this.size, this.symbol);
                }
                this.readyToSpark = false; // used to stop drawing more sparks after drawing 8 firework sparks
            }
        }
    }

    // method that moves the firework upwards if isMovingUp is set to true (in other words, if the user clicks on the canvas)
    move() {
        if (this.isMovingUp)   this.yPos -= 10; 
    }

    // method that's used to display the firework sparks
    bang() {
        // activate sparks if the firework is hidden
        if (this.alpha <= 0) {
            /* each spark displays itself, moves in a different direction, and fades out */

            this.sparks[0].display();
            this.sparks[0].moveUp();
            this.sparks[0].decreaseOpacity();

            this.sparks[1].display();
            this.sparks[1].moveUpRight();
            this.sparks[1].decreaseOpacity();

            this.sparks[2].display();
            this.sparks[2].moveRight();
            this.sparks[2].decreaseOpacity();

            this.sparks[3].display();
            this.sparks[3].moveDownRight();
            this.sparks[3].decreaseOpacity();

            this.sparks[4].display();
            this.sparks[4].moveDown();
            this.sparks[4].decreaseOpacity();

            this.sparks[5].display();
            this.sparks[5].moveDownLeft();
            this.sparks[5].decreaseOpacity();

            this.sparks[6].display();
            this.sparks[6].moveLeft();
            this.sparks[6].decreaseOpacity();

            this.sparks[7].display();
            this.sparks[7].moveUpLeft();
            this.sparks[7].decreaseOpacity();

            // reset firework when its sparks becomes hidden
            if (this.sparks.every((s) => s.alpha <= 0))  {
                // make firework stationary again
                this.isMovingUp = false;
                // make firework visible again
                this.alpha = 255;
                // reset the vertical position below the canvas
                this.yPos = height + 24;
                // reset alpha for sparks
                this.sparks.forEach((spark) => {
                    spark.alpha = 255;
                });
                // set back to true so the firework can generate sparks again
                this.readyToSpark = true;
            }
        }
    }
}

// firework sparks class used to move multiple ASCII characters in different directions
class ASCIIFireworkSparks {
    // constructor takes in symbol so that sparks can look exactly like the firework
    constructor(xPos, yPos, alpha, size, symbol) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.size = size
        this.alpha = alpha;
        this.symbol = symbol;
    }

    // method used to display the sparks
    display() {
        // used to toggle between Roy G Biv mode and default mode (the rainbow method is indirectly imported from sketch.js thanks to index.html)
        if (isRainbow) { 
            fill(are, gee, bee, this.alpha)
        } else {
            fill(225, 75, 35, this.alpha); 
        }

        // spark size
        textSize(this.size);
        // display the spark
        text(this.symbol, this.xPos, this.yPos);
        
    }

    // method used for the firework to fade out
    decreaseOpacity() {
        if (this.alpha >= 0)   {
            this.alpha -= 5;
        }
    }

    // moves the spark up (minus means moving in the up direction on the canvas)
    moveUp() {
        this.yPos -= 10;
    }

    // moves the spark in the top-right direction
    moveUpRight() {
        this.xPos += 10;
        this.yPos -= 10;
    }

    // moves the spark right
    moveRight() {
        this.xPos += 10;
    }

    // moves the spark in the bottom-right direction
    moveDownRight() {
        this.xPos += 10;
        this.yPos += 10;
    }

    // moves the spark down
    moveDown() {
        this.yPos += 10;
    }

    // moves the spark in the bottom-left direction
    moveDownLeft() {
        this.xPos -= 10;
        this.yPos += 10;
    }

    // moves the spark left
    moveLeft() {
        this.xPos -= 10;
    }

    // moves the spark in the top-left direction
    moveUpLeft() {
        this.xPos -= 10;
        this.yPos -= 10;
    }

}

