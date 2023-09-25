const backgroundCanvas = document.getElementById("background-canvas");
const chamberCanvas = document.getElementById("chamber-canvas");
const circleCanvas = document.getElementById("circle-canvas");
const backgroundCtx = backgroundCanvas.getContext("2d");
const chamberCtx = chamberCanvas.getContext("2d");
const circleCtx = circleCanvas.getContext("2d");

const verticalSlider = document.getElementById("vertical-slider");
const horizontalSlider = document.getElementById("horizontal-slider");
const circleRadius = document.getElementById("circle-radius");
const verticalsliderValueSpan = document.getElementById("verticalslider-value");
const horizontalsliderValueSpan = document.getElementById("horizontalslider-value");
const radiussliderValueSpan = document.getElementById("radiusslider-value");

let disp_x = 175;
let disp_y = 175;
let circle_radius = 50;
let vertical_bound_L = 100;
let vertical_bound_R = 300;
let horizontal_bound_L = 80;
let horizontal_bound_R = 205;
const chamber_width = 160;
const chamber_height = 240;
const chamber_Xpos = (chamberCanvas.width - chamber_width) / 2;
const chamber_Ypos = 80;

function moveCircleHorizontal(value) {
    const x = parseInt(value, 10); // No need to multiply by 1
    disp_x = x;
    drawCircle(circle_radius);
}

function moveCircleVertical(value) {
    const y = parseInt(value, 10); // No need to multiply by 1
    disp_y = y;
    drawCircle(circle_radius);
}

function resizeCameraFov() {
    const fovWidth = parseInt(document.getElementById("fov-slider").value, 10) * 2;
    drawFOV(fovWidth);
}

function drawCircle(radius = circle_radius) {
    circleCtx.clearRect(0, 0, circleCanvas.width, circleCanvas.height);
    circleCtx.beginPath();
    circleCtx.arc(disp_x + radius / 2, disp_y + radius / 2, radius, 0, Math.PI * 2);
    circleCtx.fillStyle = "rgba(204, 204, 0, 0.4)"; // 30% opacity
    circleCtx.fill();
    circle_radius = radius;
}

function drawFOV(fovWidth) {
    backgroundCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
    backgroundCtx.beginPath();
    backgroundCtx.moveTo(backgroundCanvas.width / 2, 0);
    backgroundCtx.lineTo(backgroundCanvas.width / 2, backgroundCanvas.height/2);
    backgroundCtx.lineWidth = fovWidth;
    backgroundCtx.strokeStyle = "rgba(0, 255, 0, 1)"; // 100% opacity
    backgroundCtx.stroke();
    
    
    drawObjective();
    drawIlluminationObjectives();
}

function drawObjective() {
    // Draw a square
    backgroundCtx.fillStyle = "rgba(0, 0, 0, 0.9)"; // black with 70% opacity
    backgroundCtx.fillRect(backgroundCanvas.width / 2 - 35, 0, 70, 50);

    // Draw a trapezium
    backgroundCtx.beginPath();
    backgroundCtx.moveTo(backgroundCanvas.width / 2 - 35, 50);
    backgroundCtx.lineTo(backgroundCanvas.width / 2 + 35, 50);
    backgroundCtx.lineTo(backgroundCanvas.width / 2 + 25, 60);
    backgroundCtx.lineTo(backgroundCanvas.width / 2 - 25, 60);
    backgroundCtx.closePath();
    backgroundCtx.fillStyle = "rgba(0, 0, 0, 0.9)"; // black with 70% opacity
    backgroundCtx.fill();
}

function drawIlluminationObjectives() {
    // Drawing arcs for lightsheet
    backgroundCtx.beginPath();
    backgroundCtx.lineWidth = 7;
    backgroundCtx.strokeStyle = "rgba(0, 30, 255, 0.6)"; // 30% opacity
    backgroundCtx.arc(backgroundCanvas.width / 2, chamber_Ypos + chamber_height/2-2500, 2500, 0, Math.PI*2);
    backgroundCtx.arc(backgroundCanvas.width / 2, chamber_Ypos + chamber_height/2+2500, 2500, 0, Math.PI*2);
    backgroundCtx.stroke();

    // Draw a square left
    backgroundCtx.fillStyle = "rgba(0, 0, 0, 0.9)"; // black with 70% opacity
    backgroundCtx.fillRect(0, chamber_Ypos + chamber_height/2 - 60, 40, 120);
    
    // Draw a trapezium left
    backgroundCtx.beginPath();
    backgroundCtx.fillStyle = "rgba(0, 0, 0, 0.9)"; // black with 70% opacity
    backgroundCtx.moveTo(40, chamber_Ypos + chamber_height/2 - 60);
    backgroundCtx.lineTo(65, chamber_Ypos + chamber_height/2 - 45);
    backgroundCtx.lineTo(65, chamber_Ypos + chamber_height/2 + 45);
    backgroundCtx.lineTo(40, chamber_Ypos + chamber_height/2 + 60);
    backgroundCtx.closePath();
    backgroundCtx.fill();

    // Draw a square right
    backgroundCtx.fillStyle = "rgba(0, 0, 0, 0.9)"; // black with 70% opacity
    backgroundCtx.fillRect(backgroundCanvas.width - 40, chamber_Ypos + chamber_height/2 - 60, 40, 120);

    // Draw a trapezium right
    backgroundCtx.beginPath();
    backgroundCtx.fillStyle = "rgba(0, 0, 0, 0.9)"; // black with 70% opacity
    backgroundCtx.moveTo(backgroundCanvas.width - 40, chamber_Ypos + chamber_height/2 - 60);
    backgroundCtx.lineTo(backgroundCanvas.width - 65, chamber_Ypos + chamber_height/2 - 45);
    backgroundCtx.lineTo(backgroundCanvas.width - 65, chamber_Ypos + chamber_height/2 + 45);
    backgroundCtx.lineTo(backgroundCanvas.width - 40, chamber_Ypos + chamber_height/2 + 60);
    backgroundCtx.closePath();
    backgroundCtx.fill();
}

function drawChamber() {
    // Draw a square
    chamberCtx.lineWidth = 30;
    chamberCtx.strokeStyle = "rgba(150, 150, 150, 1)"; // black and no opacity
    chamberCtx.strokeRect(chamber_Xpos, chamber_Ypos, chamber_width, chamber_height);
    chamberCtx.stroke();
}

function updateVerticalBoundaries(value_V) {
    verticalSlider.min = chamber_Ypos + value_V/2 + 15;
    verticalSlider.max = chamber_Ypos + chamber_height - value_V*1.5 - 15;
}
function updateHorizontalBoundaries(value_H) {
    horizontalSlider.min = chamber_Xpos + value_H/2 + 15;
    horizontalSlider.max = chamber_Xpos + chamber_width - value_H*1.5 - 15;
}

resizeCameraFov()
drawIlluminationObjectives()
drawChamber();
drawCircle(circle_radius);
updateVerticalBoundaries(circle_radius);
updateHorizontalBoundaries(circle_radius);


circleRadius.addEventListener("input", (event) => {
    circle_radius = event.target.value;
    drawCircle(event.target.value);
    updateVerticalBoundaries(event.target.value);
    updateHorizontalBoundaries(event.target.value);
    const radiussliderValue = event.target.value;
    radiussliderValueSpan.textContent = radiussliderValue;
});
verticalSlider.addEventListener("input", (event) => {
    moveCircleVertical(event.target.value);
    const verticalsliderValue = event.target.value;
    verticalsliderValueSpan.textContent = verticalsliderValue;
});
horizontalSlider.addEventListener("input", (event) => {
    moveCircleHorizontal(event.target.value);
    const horizontalsliderValue = event.target.value;
    horizontalsliderValueSpan.textContent = horizontalsliderValue;
});

document.getElementById("fov-slider").addEventListener("change", resizeCameraFov);