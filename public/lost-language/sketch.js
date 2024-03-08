/*
 * Lost Language
 * Author: Zeroichi Arakawa
 * License: This project is licensed under the Creative Commons Attribution 4.0 International License (CC BY 4.0). See the LICENSE file for more details.
 *
 * This project includes the following external components:
 * - fxhash.min.js: Created by fxhash, provided under the MIT License.
 * - p5.min.js: Provided under the GNU Lesser General Public License v2.1 (LGPL-2.1).
 * - Voinich fonts: Provided under the SIL Open Font License 1.1.
 *
 * Please refer to the respective license terms of each external component.
 */

const chars = [];
const allChars = [
  'a', '8', 'c', 'C', 'h', 'H', 'i', 'I', 'k', 'o',
  '9', 's', 't', 'w', 'x', 'y', 'Y', '^',
];
let fonts;
let canvas;
let frameBorder;
let camera;
let cameraPositionZ;
let isZoomMode;

let fadeAmount = 0;
let autoSwitchMode = false;

function preload() {
  fonts = [
    loadFont('VoynichBlackLetter.ttf'),
    loadFont('VoynichGrotesque.ttf'),
    loadFont('VoynichInscriptional.ttf'),
    loadFont('VoynichModern.ttf'),
    loadFont('VoynichOld.ttf'),
    loadFont('VoynichSlab.ttf'),
  ];
}

function setup() {
  randomSeed(stringToNumber($fx.hash));
  frameRate(30);
  isZoomMode = true;
  canvas = createCanvas(1080, 1080, WEBGL);
  init();
  nextSwitchTime = millis() + 6000;
}

function stringToNumber(str) {
  let num = 0;
  for (let i = 0; i < str.length; i++) {
    num += str.charCodeAt(i);
  }
  return num;
}

function init() {
  frameBorder = 50;

  camera = createCamera();
  cameraPositionZ = random(150, 500);
  camera.setPosition(width/2, height/2, cameraPositionZ);

  chars.splice(0);
  for (let i = 1; i < 250; i++) {
    const size = random(16, 90);
    chars.push({
      x: random(0, width),
      y: random(0, height),
      z: random(0, 0),
      char: random(allChars),
      size: size,
      fontNum: floor(random(0, fonts.length)),
      speedX: random(1, 5) * 0.1 * random([-1, 1]),
      speedY: random(1, 5) * 0.1 * random([-1, 1]),
      rotate: random(PI),
      speedRotate: random(0, 0.005) * random([-1, 1]),
      color: color(random(128) + random(128), random(128) + random(128), random(128) + random(128), map(size, 16, 80, 150, 255)),
    });
  }
}

function draw() {
  const fadeFrame = 30;
  const cycleFrame = frameCount % (30*10 + fadeFrame + fadeFrame);
  
  let alpha;
  if (cycleFrame < fadeFrame) {
    alpha = map(cycleFrame, 0, fadeFrame-1, 0, 255);
  } else if (cycleFrame < fadeFrame + fadeFrame) {
    alpha = map(cycleFrame, fadeFrame, fadeFrame*2-1, 255, 0);
  } else {
    alpha = 0;
  }
  
  background(0);

  if (!isZoomMode) {
    camera.setPosition(width/2, height/2, 1000);
  } else {
    camera.setPosition(width/2, height/2, cameraPositionZ);
  }

  for (const char of chars) {
    drawChar(char);
    moveChar(char);
  }
  drawFrame();

  if (autoSwitchMode) {
    if (frameCount < 30*10) {
      alpha = 0;
    } else if (cycleFrame === fadeFrame) {
      isZoomMode = !isZoomMode;
      cameraPositionZ = random(150, 500);
    }
    fill(0, alpha);
    rect(-frameBorder, -frameBorder, width+frameBorder*2, height+frameBorder*2);
  }

  $fx.preview();
  // noLoop();
}

function drawFrame() {
  noStroke();

  fill(20);
  rect(0, 0, width, frameBorder);
  rect(0, 0, frameBorder, height);
  rect(0, height-frameBorder, width, frameBorder);
  rect(width-frameBorder, 0, frameBorder, height);

  fill(40);
  rect(0-frameBorder, 0-frameBorder, width+frameBorder*2, frameBorder + frameBorder * 0.8);
  rect(0-frameBorder, 0, frameBorder + frameBorder * 0.8, height + frameBorder);
  rect(0, height - frameBorder * 0.8, width + frameBorder, frameBorder + frameBorder * 0.8);
  rect(width - frameBorder * 0.8, 0, frameBorder + frameBorder * 0.8, height);
}

function drawChar(char) {
  noStroke();
  push();
  translate(char.x, char.y, char.z);
  // rotateZ(char.rotate + frameCount * char.speedRotate);
  textSize(char.size);
  textFont(fonts[char.fontNum]);

  // const shadowOffsetX = -1;
  // const shadowOffsetY = 1;
  // // fill(255, 255, 255, 255);
  // fill(100, 100, 100, 150);
  // text(char.char, shadowOffsetX, shadowOffsetY);

  // オリジナルのテキストを描画
  fill(char.color); // オリジナルのテキストの色に戻す
  text(char.char, 0, 0); // オリジナルのテキストを描画
  
  text(char.char, 0, 0);
  pop();
}

function moveChar(char) {
  // cont noiseScale = 0.02;
  // char.x += map(noise(char.x * noiseScale, char.y * noiseScale, frameCount * noiseScale), 0, 1, -2, 2);
  // char.y += map(noise(char.x * noiseScale, char.y * noiseScale, frameCount * noiseScale + 10000), 0, 1, -2, 2);
  
  char.x += char.speedX;
  if (char.x > width) {
    char.x = 0;
  }
  if (char.x < 0) {
    char.x = width;
  }

  char.y += char.speedY;
  if (char.y > height) {
    char.y = 0;
  }
  if (char.y < 0) {
    char.y = height;
  }
}

function keyPressed() {
  if (key === 'z' || key === 'Z') {
    isZoomMode = !isZoomMode;
  }
  if (key === 'a' || key === 'A') {
    autoSwitchMode = !autoSwitchMode;
  }
}
