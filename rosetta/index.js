const canvas0 = document.createElement('canvas');
const ctx = canvas0.getContext('2d');
canvas0.id = 'canvas0';
canvas0.style.display = 'none';

const canvas = document.createElement('canvas');
canvas.id = 'canvas';

const container = document.createElement('div');
container.id = 'container';

document.body.appendChild(container);
container.appendChild(canvas0);
container.appendChild(canvas);

const canvasSize = 2000;
const canvasScale = canvasSize / 1000;

const poems = [
    ['花', 'hana', 'Flower'],
    ['君', 'kimi', 'You'],
    ['光', 'hikari', 'Light'],
    ['人', 'hito', 'Human'],
    ['桜', 'sakura', 'Cherry blossom'],
    ['霞', 'kasumi', 'Haze'],
    ['春', 'haru', 'Spring'],
    ['雲', 'kumo', 'Cloud'],
    ['時鳥', 'hototogisu', 'Little cuckoo'],
    ['風', 'kaze', 'Breeze'],
    ['露', 'tsuyu', 'Dew'],
    ['聲', 'koe', 'Voice'],
    ['水', 'mizu', 'Water'],
    ['嵐', 'arashi', 'Storm'],
    ['月', 'tsuki', 'Moon'],
    ['心', 'kokoro', 'Mind'],
    ['紅葉', 'momiji', 'Maple'],
    ['玉', 'tama', 'Pearl'],
    ['八重葎', 'yaemugura', 'Wild grass'],
    ['錦', 'nishiki', 'Brocade'],
    ['宿', 'yado', 'House'],
    ['夕', 'yū', 'Evening'],
    ['影', 'kage', 'Light'],
    ['霧', 'kiri', 'Mist'],
    ['霜夜', 'shimoyo', 'Frosty night'],
    ['古里', 'furusato', 'Old capital'],
    ['雪', 'yuki', 'Snow'],
    ['霜', 'simo', 'Star'],
    ['冬', 'fuyu', 'Winter'],
    ['里', 'sato', 'Hometown'],
    ['網代木', 'ajiroki', 'Wickerwork trap'],
    ['夜', 'yo', 'Night'],
];
const seed = 5_7_5_7_7;
const shuffledPoems = shuffleArray([...poems], seed);
const font = new FontFace('Noto Serif JP', 'url(NotoSerifJP-Regular.otf)');

const poemParams = {
    poemIndex: 0,
    divisionNum: 19,
    translationMultiplier: 0.5,
    rotationMultiplier: 1 / 100,
    lightColorNum: 0, // 0: white, 1: sakura, 2: shinbashi, 3: wakakusa
};

let randomOffset = 0;

function seedRandom(seed) {
    return function() {
        const a = 1664525;
        const c = 1013904223;
        const m = 2 ** 32;
        seed = (a * seed + c) % m;
        return seed / m;
    };
}

function shuffleArray(array, seed) {
    const randomFunc = seedRandom(seed);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(randomFunc() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function draw() {
    $fx.rand.reset();
    for (let i = 0; i < randomOffset; i++) {
        $fx.rand();
    }

    poemParams.divisionNum = Math.ceil(random(7, 18));
    poemParams.translationMultiplier = poemParams.divisionNum < 10 ? 1.0 * canvasScale
        : poemParams.divisionNum < 12 ? 1.2 * canvasScale
        : poemParams.divisionNum < 14 ? 1.3 * canvasScale
        : poemParams.divisionNum < 16 ? 1.4 * canvasScale
        : 1.5 * canvasScale;

    canvas0.width = canvasSize;
    canvas0.height = canvasSize;
    ctx.clearRect(0, 0, canvas0.width, canvas0.height);
    drawStone(ctx, 0, 0, canvas0.width, canvas0.height);

    drawSchotterStyle('canvas0', 'canvas');
    addSearchlightEffect('canvas');

    $fx.preview();
}

function drawGradient(ctx, x, y, w, h) {
    const gradient = ctx.createLinearGradient(x, y, x, y + h);
    gradient.addColorStop(0, '#aaa');
    gradient.addColorStop(1, '#222');
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, w, h);
}

function drawStone(ctx, x, y, w, h) {
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = w;
    offscreenCanvas.height = h;
    const offscreenCtx = offscreenCanvas.getContext('2d');

    const stoneData = Uint32Array.from({ length: w * h }, () => random(0, 1) > 0.5 ? 0xFF000000 : 0);
    const stoneImg = new ImageData(new Uint8ClampedArray(stoneData.buffer), w, h);
    offscreenCtx.putImageData(stoneImg, 0, 0);

    offscreenCtx.fillStyle = ctx.createLinearGradient(0, 0, w, h);
    offscreenCtx.fillStyle.addColorStop(0.01, 'black');
    offscreenCtx.fillStyle.addColorStop(0.95, 'black');
    offscreenCtx.globalCompositeOperation = "destination-in";
    offscreenCtx.fillRect(0, 0, w, h);
    offscreenCtx.globalCompositeOperation = "multiply";
    offscreenCtx.fillRect(0, 0, w, h); 
    ctx.drawImage(offscreenCanvas, x, y);

    fillStone(ctx, x, y, w, h);

    addEngravedText(ctx, x, y, w, h);

    ctx.filter = `blur(${Math.floor(1 * canvasScale)}px)`;
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(canvas0, x, y);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    const shadowOffset = 2 * canvasScale;
    ctx.fillRect(x + shadowOffset, y + shadowOffset, w, h);
}

function fillStone(ctx, x, y, w, h) {
    ctx.rect(x, y, w, h);
    ctx.fillStyle = '#7d6e7d';
    ctx.fill();
}

function addEngravedText(ctx, x, y, w, h) {
    const poem = shuffledPoems[poemParams.poemIndex];
    const wordTop = poem[0];
    const wordMiddle = poem[1];
    const wordBottom = poem[2];

    ctx.shadowColor = 'white';
    ctx.shadowBlur = 2 * canvasScale;
    ctx.shadowOffsetX = -2 * canvasScale;
    ctx.shadowOffsetY = 2 * canvasScale;

    const textX = x + w / 2;
    const textY = y + h / 2;
    ctx.fillStyle = '#222';
    ctx.textAlign = 'center';
    drawTextWithAdaptiveSize(ctx, wordTop, textX, textY - (200 * canvasScale), 280 * canvasScale, w - 20 * canvasScale);
    drawTextWithAdaptiveSize(ctx, wordMiddle, textX, textY + 40 * canvasScale, 180 * canvasScale, w - 20 * canvasScale);
    drawTextWithAdaptiveSize(ctx, wordBottom, textX, textY + 400 * canvasScale, 280 * canvasScale, w - 20 * canvasScale);
}

function drawTextWithAdaptiveSize(ctx, text, posX, posY, defaultFontSize, maxWidth) {
    let fontSize = defaultFontSize;
    ctx.font = `${fontSize}px 'Noto Serif JP'`;
    let textWidth = ctx.measureText(text).width;
    while (textWidth > maxWidth && fontSize > 30) {
        fontSize--;
        ctx.font = `${fontSize}px 'Noto Serif JP'`;
        textWidth = ctx.measureText(text).width;
    }
    ctx.fillText(text, posX, posY);
}


function getTokenNumber() {
    return $fx.iteration;
}

function drawSchotterStyle(sourceCanvasId, targetCanvasId) {
    const sourceCanvas = document.getElementById(sourceCanvasId);
    const targetCanvas = document.getElementById(targetCanvasId);
    const tgtCtx = targetCanvas.getContext('2d');

    targetCanvas.width = sourceCanvas.width;
    targetCanvas.height = sourceCanvas.height;

    drawGradient(tgtCtx, 0, 0, targetCanvas.width, targetCanvas.height);

    const columns = poemParams.divisionNum;
    const rows = poemParams.divisionNum;
    const translationMultiplier = poemParams.translationMultiplier;
    const rotationMultiplier = poemParams.rotationMultiplier;
    const squareSize = targetCanvas.width / columns;

    for (let i = 1; i <= columns; i++) {
        for (let j = 1; j <= rows; j++) {
            tgtCtx.save();

            const x = (i - 1) * squareSize;
            const y = (j - 1) * squareSize;
            const displacement = j * translationMultiplier;
            const cx = x + random(-displacement, displacement);
            const cy = y + random(-displacement, displacement);
            tgtCtx.translate(cx + squareSize / 2, cy + squareSize / 2);
            const rotation = j * rotationMultiplier * random(-Math.PI, Math.PI);
            tgtCtx.rotate(rotation);
            
            tgtCtx.shadowBlur = 30 * canvasScale;
            tgtCtx.shadowColor = 'rgba(20, 20, 20, 0.7)';
            tgtCtx.shadowOffsetX = -4;
            tgtCtx.shadowOffsetY = 10;

            tgtCtx.drawImage(sourceCanvas, (i - 1) * squareSize, (j - 1) * squareSize, squareSize, squareSize, -squareSize / 2, -squareSize / 2, squareSize, squareSize);
            tgtCtx.restore();
        }
    }
}

function random(min, max) {
    return $fx.rand() * (max - min) + min;
}

let lightPositions = [];

function addSearchlightEffect(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    function drawSearchlight(x, y) {
        const radius = 300 * canvasScale;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);

        // const colorNum = Math.floor(random(0, 4));
        const colorNum = poemParams.lightColorNum;
        if (colorNum === 0) {
            // White
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        } else if (colorNum === 1) {
            // Sakura color
            gradient.addColorStop(0, 'rgba(255, 183, 197, 0.3)');
            gradient.addColorStop(1, 'rgba(255, 183, 197, 0)');
        } else if (colorNum === 2) {
            // Shinbashi color
            gradient.addColorStop(0, 'rgba(102, 186, 183, 0.3)');
            gradient.addColorStop(1, 'rgba(102, 186, 183, 0)');
        } else {
            // Wakakusa color
            gradient.addColorStop(0, 'rgba(142, 209, 122, 0.3)');
            gradient.addColorStop(1, 'rgba(142, 209, 122, 0)');
        }

        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over'; // Reset to default
    }

    function update() {
        function isTooClose(x, y, threshold) {
            return lightPositions.some(pos => {
                let dx = x - pos.x;
                let dy = y - pos.y;
                return Math.sqrt(dx * dx + dy * dy) < threshold;
            });
        }
        if (lightPositions.length === 0) {
            for (let i = 0; i < 14; i++) {
                let x, y, attempts = 0;
                do {
                    x = random(0, canvas.width);
                    y = random(0, canvas.height);
                    attempts++;
                } while (isTooClose(x, y, canvas.width / 8) && attempts < 10);

                if (attempts < 10) {
                    lightPositions.push({x, y});
                }
                if (lightPositions.length > 5) {
                    lightPositions.shift();
                }
            }
        }
        for (const pos of lightPositions) {
            drawSearchlight(pos.x, pos.y);
        }
    }

    update();
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'n' || event.key === 'N') {
        poemParams.poemIndex = (poemParams.poemIndex + 1) % shuffledPoems.length;
        draw();
    }
    if (event.key === 'r' || event.key === 'R') {
        lightPositions = [];
        randomOffset++;
        draw();
    }
});

window.addEventListener('resize', draw);

window.onload = (event) => {
    font.load().then(function(loadedFont) {
        document.fonts.add(loadedFont);
        poemParams.poemIndex = (getTokenNumber() % shuffledPoems.length) - 1;
        draw();
    });
};
