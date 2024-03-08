/*
 * inside window
 * Author: Zeroichi Arakawa
 * License: This project is licensed under the Creative Commons Attribution 4.0 International License (CC BY 4.0). See the LICENSE file for more details.
 *
 * This project includes the following external components:
 * - fxhash.min.js: Created by fxhash, provided under the MIT License.
 * - Google Fonts: Provided under the SIL Open Font License 1.1.
 *
 * Please refer to the respective license terms of each external component.
 */

const bgColors = [
  'rgba(255, 236, 179, 0.66)', // Amber
  'rgba(173, 216, 230, 0.66)', // Light Blue
  'rgba(255, 182, 193, 0.66)', // Light Pink
  'rgba(179, 238, 238, 0.66)', // Light Teal
  'rgba(255, 160, 122, 0.66)', // Light Salmon
  'rgba(144, 238, 144, 0.66)', // Light Green
  'rgba(230, 230, 250, 0.66)', // Lavender
  'rgba(135, 206, 235, 0.66)', // Sky Blue
  'rgba(255, 250, 205, 0.66)', // Lemon Chiffon
  'rgba(255, 127, 80, 0.66)', // Coral
];
const fonts = [
  "'Source Code Pro', monospace",
  "'VT323', monospace",
  "'Xanh Mono', monospace",
  "'Courier Prime', monospace",
];
const fontsForCode = [
  "'Source Code Pro', monospace",
  "'VT323', monospace",
  "'Xanh Mono', monospace",
  "'Courier Prime', monospace",
];
const fontSizesForCode = [
  18,
  24,
  20,
  18,
];
const codeBoxContainerDiv = document.createElement('div');
codeBoxContainerDiv.id = 'codeBoxContainer';
const codeBoxDiv = document.createElement('div');
codeBoxDiv.id = 'codeBox';
codeBoxContainerDiv.appendChild(codeBoxDiv);
document.body.appendChild(codeBoxContainerDiv);

const svgContent = `<svg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg'>
<filter id='noiseFilter'>
  <feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/>
</filter>
<rect width='100%' height='100%' filter='url(#noiseFilter)'/>
</svg>`;
const cssBackground = `background: linear-gradient(to right, black, transparent), url('data:image/svg+xml;base64,${btoa(svgContent)}');`;
document.body.style = cssBackground;

let windowScale = window.innerWidth / 1000;

function init() {
  $fx.rand.reset();

  windowScale = window.innerWidth / 1000;
  const fontForCodeIndex = Math.floor(random() * fontsForCode.length);
  codeBoxDiv.style.fontFamily = fontsForCode[fontForCodeIndex];
  codeBoxDiv.style.fontSize = `${Math.floor(windowScale * fontSizesForCode[fontForCodeIndex])}px`;
  codeBoxDiv.style.border = `${1 * windowScale}px solid rgba(255, 255, 255, 0.2)`;
  codeBoxDiv.style.padding = `${20 * windowScale}px`;
  codeBoxDiv.style.filter = `blur(${1 * windowScale}px)`;
}

async function draw() {
  init();
  const props = Object.getOwnPropertyNames(window)
  const funcs = props.filter(p => typeof window[p] === 'function')
  const func = funcs[Math.floor($fx.rand() * funcs.length)]

  codeBoxDiv.innerHTML = `try {
  const props = Object.getOwnPropertyNames(window)
  const funcs = props.filter(p => typeof window[p] === 'function')
  const func = funcs[Math.floor($fx.rand() * funcs.length)]
  window[func]()
  // window.${func}()
} catch (e) {                                         
  e.message
}`;

  $fx.rand.reset(); // WISYWIG

  let executedResult = func + ' '
  try {
    const props = Object.getOwnPropertyNames(window)
    const funcs = props.filter(p => typeof window[p] === 'function')
    const func = funcs[Math.floor($fx.rand() * funcs.length)]
    window[func]()
  } catch (e) {
    // e.message
    try {
      executedResult += e.toString() + ' ';
    } catch (err) {
      executedResult += err.toString() + ' ';
    }
  }
  
  const maxFontSize = 32 * windowScale;
  const minFontSize = 12 * windowScale;
  const fontSize = Math.floor(random() * (maxFontSize - minFontSize + 1)) + minFontSize;
  const fontFamily = fonts[Math.floor(random() * fonts.length)];
  const stepY = fontSize;

  let repeatedText = executedResult + ' ';
  while (textWidth(repeatedText, fontSize) < window.innerWidth * 2) {
      repeatedText += executedResult + ' ';
  }

  const texts = [];
  const chars = Array.from(repeatedText);
  const offset = Math.floor(random() * 30);
  for (let y = 0; y - stepY < window.innerHeight * 1.2; y += stepY) {
    for (let i = 0; i < offset; i++) {
      chars.push(chars.shift());
    }
    texts.push(chars.join(''));
  }

  const bgColor = bgColors[Math.floor(random() * bgColors.length)];
  const bgColorForNoise = bgColors[Math.floor(random() * bgColors.length)];
  const skewX = Math.floor(random() * 90) - 45;
  for (const text of texts) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    const scrollingText = document.createElement('p');
    scrollingText.classList.add('loop');
    scrollingText.textContent = text;
    wrapper.appendChild(scrollingText);

    const scrollingText2 = document.createElement('p');
    scrollingText2.classList.add('loop');
    scrollingText2.classList.add('loop2');
    scrollingText2.textContent = text;
    wrapper.appendChild(scrollingText2);

    wrapper.style.fontSize = `${fontSize}px`;
    wrapper.style.fontFamily = fontFamily;
    wrapper.style.color = bgColor;
    wrapper.style.filter = `blur(${1 * windowScale}px)`;
    wrapper.style.transform = `skewX(${skewX}deg)`;

    // wrapper.addEventListener('click', function() {
    //   if (scrollingText.style.animation == '') {
    //     const speedSec = 60 + random() * 560;
    //     scrollingText.style.animation = `loop ${speedSec}s linear infinite`;
    //     scrollingText2.style.animation = `loop ${speedSec}s -${speedSec/2}s linear infinite`;
    //   } else {
    //     scrollingText.style.animation = '';
    //     scrollingText2.style.animation = '';
    //   }
    // });

    document.body.appendChild(wrapper);
  }

  $fx.preview();
}

function textWidth(text, fontSize) {
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.float = 'left';
  tempDiv.style.whiteSpace = 'nowrap';
  tempDiv.style.visibility = 'hidden';
  tempDiv.style.fontFamily = "'Source Code Pro', monospace";
  tempDiv.style.fontSize = `${fontSize}px`;
  tempDiv.textContent = text;
  document.body.appendChild(tempDiv);
  const width = tempDiv.offsetWidth;
  document.body.removeChild(tempDiv);
  return width;
}

function random() {
  return $fx.rand();
}

window.addEventListener('resize', draw);

window.onload = _event => {
  draw();
};
