// This program puts different delays, deforms and barely moves the bubbles

// List of all the bubbles (20 in total)
const bubbles = document.getElementsByClassName('bubble');

// CONSTANTS
const TIME_INTERVAL = 25;
const ANIMATION_MAX_DELAY = 3; //Always half of the duration time of the css animation
const PERCENTAGE_INTERVAL = 10;
const PERCENTAGE_STEPS = 0.5;
const SCALE_INTERVAL = 0.5;
const SCALE_STEPS = 0.001;
const MOVING_INTERVAL = 15;
const MOVING_STEPS = 0.3;

// Function to run the animation details
const setBubbles = () => {

    // CONTROL VARIABLES
    let bubblesBorRad = [];
    let animationRunning = true;

    // LOOP FUNCTION
    const bubblesDeformation = (time) => {
        // While the animation is running (duration of 6 seconds, 6000 miliseconds)
        if (time <= 6000) {
            setTimeout( () => {
                // Setting a border-radius, scale and translateX each time this is called
                for (let i = 0; i < bubblesBorRad.length; i++) {
                    bubbles[i].style.borderRadius = randomBorderRadius(i);
                    bubbles[i].style.transform = `scale( ${bubblesBorRad[i].scale} ) translateX(${bubblesBorRad[i].move}px)`;
                }
                // Calling the function "TIME_INTERVAL" seconds later
                bubblesDeformation( time + TIME_INTERVAL );
            }, TIME_INTERVAL)
        } else {
            // When animation is finished we ask if we still running it
            if (animationRunning) {
                bubblesDeformation( 0 );
            }
        }
    }

    const randomBorderRadius = (i) => {
        const randomPercent = () => {
            return (50 - PERCENTAGE_INTERVAL/2) + Math.random() * PERCENTAGE_INTERVAL;
        }

        if (!bubblesBorRad[i]) {
            // First time calling this function
            bubblesBorRad[i] = {
                radius: [],
                scale: (1 - SCALE_INTERVAL/2) + SCALE_INTERVAL * Math.random(),
                isGrowing: Math.random() > 0.5,
                move: 10 * Math.random(),
                isMovingRight: Math.random() > 0.5
            };
            // To deform the bubble we use 8 parameters
            for (let j = 0; j < 8; j++) {
                bubblesBorRad[i].radius.push({
                    percent: randomPercent(),
                    isIncreasing: Math.random() > 0.5
                });
            }
        } else {
            // Second and fowards calls

            // INCREASE AND DECREASE

            // SIZE (scale)
            if ( bubblesBorRad[i].scale < (1 - SCALE_INTERVAL/2) ) {
                bubblesBorRad[i].isGrowing = true;
            } else if ( bubblesBorRad[i].scale > (1 + SCALE_INTERVAL/2) ) {
                bubblesBorRad[i].isGrowing = false;
            }

            if (bubblesBorRad[i].isGrowing) {
                bubblesBorRad[i].scale += SCALE_STEPS;
            } else {
                bubblesBorRad[i].scale -= SCALE_STEPS;
            }

            // MOVEMENT (traslateX)
            if ( bubblesBorRad[i].move < -MOVING_INTERVAL ) {
                bubblesBorRad[i].isMovingRight = true;
            } else if ( bubblesBorRad[i].move > MOVING_INTERVAL ) {
                bubblesBorRad[i].isMovingRight = false;
            }

            if (bubblesBorRad[i].isMovingRight) {
                bubblesBorRad[i].move += MOVING_STEPS;
            } else {
                bubblesBorRad[i].move -= MOVING_STEPS;
            }

            // BORDER RADIUS
            for (let j = 0; j < bubblesBorRad[i].radius.length; j++) {

                if (bubblesBorRad[i].radius[j].percent < (50 - PERCENTAGE_INTERVAL/2)) {
                    bubblesBorRad[i].radius[j].isIncreasing = true;
                } else if (bubblesBorRad[i].radius[j].percent > (50 + PERCENTAGE_INTERVAL/2)) {
                    bubblesBorRad[i].radius[j].isIncreasing = false;
                }

                if (bubblesBorRad[i].radius[j].isIncreasing) {
                    bubblesBorRad[i].radius[j].percent += PERCENTAGE_STEPS;
                } else {
                    bubblesBorRad[i].radius[j].percent -= PERCENTAGE_STEPS;
                }

            }

        }

        // We return a random value of a border radius to simulate a bubble
        // eg. -> border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%
        return `${bubblesBorRad[i].radius[0].percent}% ${bubblesBorRad[i].radius[1].percent}% ${bubblesBorRad[i].radius[2].percent}% ${bubblesBorRad[i].radius[3].percent}% / ${bubblesBorRad[i].radius[4].percent}% ${bubblesBorRad[i].radius[5].percent}% ${bubblesBorRad[i].radius[6].percent}% ${bubblesBorRad[i].radius[7].percent}%`
    }

    // This for cycle is to access to each bubble div
    for (let i = 0; i < bubbles.length; i++) {

        // Inicialize each bubble in certain random parameters
        if (i < bubbles.length/2) {
            // Spread first 10 bubbles
            bubbles[i].style.animationDelay = `${Math.random() * ANIMATION_MAX_DELAY}s`;
        } else {
            // Spread the last 10 bubbles
            bubbles[i].style.animationDelay = `${ANIMATION_MAX_DELAY + Math.random() * ANIMATION_MAX_DELAY}s`;
        }

        // Set a border-radius
        bubbles[i].style.borderRadius = randomBorderRadius(i);
        // Set scale and translate
        bubbles[i].style.transform = `scale( ${bubblesBorRad[i].scale} ) translateX(${bubblesBorRad[i].move}px)`;

    }

    // Call the loop function
    bubblesDeformation(0);

}

// Initializate the animation when the page is loaded
document.addEventListener("DOMContentLoaded", setBubbles)