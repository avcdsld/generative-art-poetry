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

const colors = [
  {
    bg: '#000000', // Black
    text: '#FFFF00', // Vivid Yellow
    accent: '#FF6347', // Tomato Red
  },
  {
    bg: '#1D1D1D', // Night Rider Black
    text: '#FF00FF', // Fuchsia pink
    accent: '#7FFF00', // Spring Green
  },
  {
    bg: '#2F4F4F', // Dark Slate Gray
    text: '#FF7F50', // Coral Red
    accent: '#FFD700', // Gold
  },
  {
    bg: '#696969', // Dim Gray
    text: '#00FFFF', // Aquamarine
    accent: '#FF1493', // Deep Pink
  },
  {
    bg: '#000080', // Navy Blue
    text: '#00FF00', // Green
    accent: '#FFA500', // Orange Red
  },
  {
    bg: '#800080', // Purple
    text: '#FFFF00', // Yellow
    accent: '#00FFFF', // Aqua
  },
  {
    bg: '#008000', // Green
    text: '#FFFFFF', // White
    accent: '#FF69B4', // Hot Pink
  },
  {
    bg: '#800000', // Maroon
    text: '#00FFFF', // Aqua
    accent: '#FFD700', // Gold
  },
  {
    bg: '#008080', // Teal
    text: '#FF00FF', // Fuchsia
    accent: '#FFFF00', // Yellow
  },
  {
    bg: '#FF0000', // Red
    text: '#000000', // Black
    accent: '#00FF00', // Green
  },
];
const fonts = [
  "'Source Code Pro', monospace",
  "'VT323', monospace",
  "'Xanh Mono', monospace",
  "'Courier Prime', monospace",
];
const fontsForCode = [
  "'Source Code Pro', monospace",
  //"'VT323', monospace",
  // "'Xanh Mono', monospace",
  //"'Courier Prime', monospace",
];
const fontSizesForCode = [
  14,
  20,
  16,
  14,
];
const codeBoxContainerDiv = document.createElement('div');
codeBoxContainerDiv.id = 'codeBoxContainer';
const codeBoxDiv = document.createElement('div');
codeBoxDiv.id = 'codeBox';
codeBoxContainerDiv.appendChild(codeBoxDiv);
document.body.appendChild(codeBoxContainerDiv);

let windowScale = window.innerWidth / 1000;
let colorIndex;
let fontForCodeIndex;
let drawFinished = false;

function init() {
  $fx.rand.reset();

  colorIndex = Math.floor(random() * colors.length);

  windowScale = window.innerWidth / 1000;
  fontForCodeIndex = Math.floor(random() * fontsForCode.length);
  codeBoxDiv.style.fontFamily = fontsForCode[fontForCodeIndex];
  codeBoxDiv.style.fontSize = `${Math.floor(windowScale * fontSizesForCode[fontForCodeIndex])}px`;
  codeBoxDiv.style.padding = `${20 * windowScale}px`;
  //codeBoxDiv.style.filter = `blur(${1 * windowScale}px)`;

  codeBoxDiv.style.color = colors[colorIndex].accent;
  codeBoxDiv.style.backgroundColor = colors[colorIndex].bg;
  // codeBoxDiv.style.border = `${2 * windowScale}px solid ${colors[colorIndex].accent}`;

  drawFinished = false;
}

async function draw() {
  init();
  const props = Object.getOwnPropertyNames(window)
  const funcs = props.filter(p => typeof window[p] === 'function')
  const func = funcs[Math.floor($fx.rand() * funcs.length)]

  let codeText = `try {
  const props = Object.getOwnPropertyNames(window)
  const funcs = props.filter(p => typeof window[p] === 'function')
  const func = funcs[Math.floor($fx.rand() * funcs.length)]
  window[func]()
  // window.${func}()
} catch (e) {
  e.message
}`;

  const codeSpan = document.createElement('span');
  codeBoxDiv.appendChild(codeSpan);

  const cursorElement = document.createElement('span');
  cursorElement.textContent = '|';
  cursorElement.style.fontFamily = 'VT323';
  cursorElement.style.fontSize = `${Math.floor(windowScale * fontSizesForCode[fontForCodeIndex] * 1.5)}px`;
  if (!drawFinished) {
    codeBoxDiv.appendChild(cursorElement);
  }

  let codeIndex = 0;
  let cursorVisible = true;

  function toggleCursor() {
    cursorVisible = !cursorVisible;
    cursorElement.style.visibility = cursorVisible ? 'visible' : 'hidden';
  }

  function printNextChar() {
    if (drawFinished) {
      return;
    }
    codeSpan.innerHTML += codeText[codeIndex];
    
    codeIndex++;
    if (codeIndex < codeText.length) {
      const randomDelay = Math.floor(Math.random() * 80) + 50;
      setTimeout(printNextChar, randomDelay);
    } else {
      drawFinished = true;
      $fx.preview();
      const cursorInterval = setInterval(toggleCursor, 500);
      // clearInterval(cursorInterval);
    }
  }

  printNextChar();

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
  
  const maxFontSize = 10 * windowScale;
  const minFontSize = 5 * windowScale;
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

  const bgColor = colors[colorIndex].bg;
  const textColor = colors[colorIndex].text;
  const textColorForNoise = colors[colorIndex].accent;
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
    wrapper.style.color = textColor;
    wrapper.style.backgroundColor = bgColor;

    document.body.appendChild(wrapper);
  }

  // $fx.preview();
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

window.addEventListener('resize', () => {
  console.log({drawFinished})
  if (!drawFinished) {
    return;
  }
  drawFinished = false;
  draw();
});

window.onload = _event => {
  draw();
};
