// Array to hold words from the text file
let wordsArray = [];

// Function to fetch words from philip.txt and store them in wordsArray
function fetchWords() {
    fetch('philip.txt')
        .then(response => response.text())
        .then(data => {
            wordsArray = data.split(/\s+/);
            generateTextArt();  // Call the function to generate the text art after loading the words
        })
        .catch(error => console.error('Error fetching the text file:', error));
}

// Function to generate a random integer between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random word from the wordsArray
function getRandomWord() {
    if (wordsArray.length > 0) {
        const randomIndex = getRandomInt(0, wordsArray.length - 1);
        return wordsArray[randomIndex];
    } else {
        return generateRandomWord();  // Fallback if wordsArray is empty
    }
}

// Array of CSS classes for different color combinations (updated)
const colorClasses = ['color1', 'color2', 'color3', 'color4'];

// Function to generate the poetic image with words
function generateTextArt() {
    const container = document.getElementById('text-art');
    container.innerHTML = '';  // Clear the container
    
    for (let i = 0; i < 1000; i++) {
        // Create a span element with a random word and color class
        const span = document.createElement('span');
        span.textContent = getRandomWord();
        span.className = colorClasses[getRandomInt(0, colorClasses.length - 1)];
        
        // Add click event to change the word and color on click
        span.addEventListener('click', function() {
            span.textContent = getRandomWord();
            span.className = colorClasses[getRandomInt(0, colorClasses.length - 1)];
        });
        
        // Add the span to the container
        container.appendChild(span);
        container.appendChild(document.createTextNode(' '));  // Add space between words
    }
}

let isAnimating = false;
let animationInterval;

// Function to toggle the animation of words
function toggleAnimation() {
    const spans = document.querySelectorAll('#text-art span');
    if (isAnimating) {
        clearInterval(animationInterval);
        spans.forEach(span => span.classList.remove('animating'));
        isAnimating = false;
    } else {
        animationInterval = setInterval(() => {
            spans.forEach(span => {
                span.classList.add('animating');
                span.style.fontSize = `${getRandomInt(10, 30)}px`;  // Change font size
                span.className = colorClasses[getRandomInt(0, colorClasses.length - 1)];  // Change color
            });
        }, 1000);
        isAnimating = true;
    }
}

// Event listener for the animate button
document.getElementById('animate-button').addEventListener('click', toggleAnimation);

// Load words and generate text art when the page loads
window.onload = fetchWords;
