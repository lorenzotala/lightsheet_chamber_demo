const backgroundCanvas = document.getElementById('myCanvas');
const backgroundCtx = backgroundCanvas.getContext('2d');
const drawButton = document.getElementById('drawButton');

function drawFOV(fovWidth) {
    backgroundCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
    backgroundCtx.beginPath();
    backgroundCtx.moveTo(backgroundCanvas.width / 2, 0);
    backgroundCtx.lineTo(backgroundCanvas.width / 2, backgroundCanvas.height/2);
    backgroundCtx.lineWidth = fovWidth;
    backgroundCtx.strokeStyle = "rgba(0, 255, 0, 1)"; // 100% opacity
    backgroundCtx.stroke();
}

function drawImageOnCanvas() {
    var f = "D:/git/ls-samplechamber/Media/objectiveZEISS2.png";
    var url = window.URL || window.webkitURL;
    var src = url.createObjectURL(f);
                
    // Load the PNG image
    const image = new Image();
    image.src = src;

    // Handle image load and error events
    image.onload = function() {
        // Clear the canvas
        backgroundCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

        // Draw the image at the center of the canvas
        const centerX = backgroundCanvas.width / 2 - image.width / 2;
        const centerY = backgroundCanvas.height / 2 - image.height / 2;
        backgroundCtx.drawImage(image, centerX, centerY);
        url.revokeObjectURL(src);
    };

    image.onerror = function() {
        console.error('Error loading the image.');
    };
}

// Add a click event listener to the button
drawButton.addEventListener('click', (event) => {
    drawFOV(10);
    drawImageOnCanvas();
});