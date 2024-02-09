
const canvas0 = document.createElement('canvas');
canvas0.id = 'canvas0';
canvas0.style.display = 'none';

const canvas2 = document.createElement('canvas');
canvas2.id = 'canvas2';

const container = document.createElement('div');
container.id = 'container';

document.body.appendChild(container);
container.appendChild(canvas0);
container.appendChild(canvas2);


const canvas = canvas0;
const ctx = canvas.getContext('2d');

let poems = [
    ['愛', 'ai', 'Love'],
    ['夢', 'yume', 'Dream'],
    ['美', 'bi', 'Beauty'],
    ['心', 'kokoro', 'Heart'],
    ['縁', 'en', 'Fate'],
    ['笑', 'emi', 'Smile'],
    ['道', 'michi', 'Way'],
    ['情', 'nasake', 'Mercy'],
    ['志', 'kokorozashi', 'Aspiration'],
    ['熱', 'netsu', 'Hot'],
    ['友', 'tomo', 'Friend'],
    ['知', 'chi', 'Knowledge'],
    ['星', 'hoshi', 'Star'],
    ['海', 'umi', 'Sea'],
    ['水', 'mizu', 'Water'],
    ['空', 'sora', 'Sky'],
    ['日', 'hi', 'Sun'],
    ['光', 'hikari', 'Light'],
    ['木', 'ki', 'Tree'],
    ['声', 'koe', 'Voice'],
    ['歌', 'uta', 'Song'],
    ['鍵', 'kagi', 'Key'],
    ['米', 'kome', 'Rice'],
    ['魚', 'sakana', 'Fish'],
    ['月', 'tsuki', 'Moon'],
    ['命', 'inochi', 'Life'],
    ['桜', 'sakura', 'Sakura'],
    ['虹', 'niji', 'Rainbow'],
    ['恵', 'megumi', 'Blessing'],
    ['本', 'hon', 'Book'],
    ['靴', 'kutsu', 'Shoes'],
    ['家', 'ie', 'House'],
    ['飯', 'meshi', 'Meal'],
    ['雨', 'ame', 'Rain'],
    ['恩', 'on', 'Obligation'],
    ['念', 'nen', 'Sense'],
    ['憩', 'ikoi', 'Rest'],
    ['憧', 'akogare', 'Yearning'],
    ['人', 'hito', 'Human'],
    ['詩', 'shi', 'Poem'],
    ['師', 'shi', 'Teacher'],
    ['森', 'mori', 'Forest'],
    ['和', 'wa', 'Harmony'],
    ['涙', 'namida', 'Tear'],
    ['望', 'nozomi', 'Hope'],
    ['誉', 'homare', 'Honor'],
    ['名', 'na', 'Name'],
    ['春', 'haru', 'Spring'],
    ['柱', 'hashira', 'Pillar'],
    ['朝', 'asa', 'Morning'],
    ['土', 'tsuchi', 'Soil'],
    ['悦', 'etsu', 'Joy'],
];
poems = poems.concat(poems.map(poem => poem.slice().reverse()));
//const seed = 12345678;
const seed = random(0, 100000000);
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

    poemParams.divisionNum = Math.ceil(random(7, 20));
    poemParams.translationMultiplier = poemParams.divisionNum < 10 ? 0.5
        : poemParams.divisionNum < 12 ? random(0.5, 1.0)
        : poemParams.divisionNum < 14 ? random(0.2, 0.9)
        : poemParams.divisionNum < 16 ? random(0.3, 0.8)
        : random(0.3, 0.6);

    canvas.width = 500;
    canvas.height = 500;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStone(ctx, 0, 0, canvas.width, canvas.height);

    drawSchotterStyle('canvas0', 'canvas2');
    addSearchlightEffect('canvas2');

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
    offscreenCtx.fillStyle.addColorStop(0.01, 'transparent');
    offscreenCtx.fillStyle.addColorStop(0.95, 'black');
    offscreenCtx.globalCompositeOperation = "destination-in";
    offscreenCtx.fillRect(0, 0, w, h);
    offscreenCtx.globalCompositeOperation = "multiply";
    offscreenCtx.fillRect(0, 0, w, h); 
    ctx.drawImage(offscreenCanvas, x, y);

    ctx.globalCompositeOperation = "source-atop";

    fillStone(ctx, x, y, w, h);

    addEngravedText(ctx, x, y, w, h);

    ctx.filter = 'blur(5px)';
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(canvas, x, y);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    const shadowOffset = 1;
    ctx.fillRect(x + shadowOffset, y + shadowOffset, w, h);
}

function fillStone(ctx, x, y, w, h) {
    ctx.rect(x, y, w, h);
    ctx.fillStyle = '#8B7B8B';
    ctx.fill();
}

function addEngravedText(ctx, x, y, w, h) {
    const poem = shuffledPoems[poemParams.poemIndex];
    const wordTop = poem[0];
    const wordMiddle = poem[1];
    const wordBottom = poem[2];

    ctx.shadowColor = 'white';
    ctx.shadowBlur = 1;
    ctx.shadowOffsetX = -1;
    ctx.shadowOffsetY = 1;

    const textX = x + w / 2;
    const textY = y + h / 2;
    ctx.fillStyle = '#222';
    ctx.textAlign = 'center';
    // ctx.font = "140px 'Noto Serif JP'";
    // ctx.fillText(wordTop, textX, textY - 100);
    drawTextWithAdaptiveSize(ctx, wordTop, textX, textY - 100, 140, canvas.width - canvas.width / 10);

    // ctx.font = "90px 'Noto Serif JP'";
    // ctx.fillText(wordMiddle, textX, textY + 15);
    drawTextWithAdaptiveSize(ctx, wordMiddle, textX, textY + 15, 90, canvas.width - canvas.width / 10);
    
    // ctx.font = "140px 'Noto Serif JP'";
    // ctx.fillText(wordBottom, textX, textY + 180);
    drawTextWithAdaptiveSize(ctx, wordBottom, textX, textY + 180, 140, canvas.width - canvas.width / 10);

    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
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
            drawRaggedEdgeSquare(tgtCtx, 0, 0, squareSize, i, j, columns, rows);
            
            tgtCtx.shadowBlur = 12;
            tgtCtx.shadowColor = 'rgba(0, 0, 0, 0.7)';
            tgtCtx.shadowOffsetX = 0;
            tgtCtx.shadowOffsetY = 0;

            tgtCtx.drawImage(sourceCanvas, (i - 1) * squareSize, (j - 1) * squareSize, squareSize, squareSize, -squareSize / 2, -squareSize / 2, squareSize, squareSize);
            tgtCtx.restore();
        }
    }
}

function random(min, max) {
    // return Math.random() * (max - min) + min;
    return $fx.rand() * (max - min) + min;
}

function drawRaggedEdgeSquare(ctx, x, y, squareSize, i, j, columns, rows) {
    ctx.beginPath();
    const edgeVariance = 30;
    const stepsPerSide = 60;

    for (let step = 0; step <= stepsPerSide; step++) {
        // Upper edge
        let offsetX = (squareSize / stepsPerSide) * step;
        let offsetY = 0;
        let variance = random(-edgeVariance / 2, edgeVariance / 2);
        ctx.lineTo(x - squareSize / 2 + offsetX, y - squareSize / 2 + offsetY + variance);

        // Right edge
        offsetX = squareSize;
        offsetY = (squareSize / stepsPerSide) * step;
        variance = random(-edgeVariance / 2, edgeVariance / 2);
        ctx.lineTo(x - squareSize / 2 + offsetX + variance, y - squareSize / 2 + offsetY);

        // Bottom edge
        offsetX = squareSize - (squareSize / stepsPerSide) * step;
        offsetY = squareSize;
        variance = random(-edgeVariance / 2, edgeVariance / 2);
        ctx.lineTo(x - squareSize / 2 + offsetX, y - squareSize / 2 + offsetY + variance);

        // Left edge
        offsetX = 0;
        offsetY = squareSize - (squareSize / stepsPerSide) * step;
        variance = random(-edgeVariance / 2, edgeVariance / 2);
        ctx.lineTo(x - squareSize / 2 + offsetX + variance, y - squareSize / 2 + offsetY);
    }
    ctx.closePath();
    ctx.clip();
}

let lightPositions = [];

function addSearchlightEffect(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    function drawSearchlight(x, y) {
        const radius = 150;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);

        //const colorNum = Math.floor(random(0, 4));
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