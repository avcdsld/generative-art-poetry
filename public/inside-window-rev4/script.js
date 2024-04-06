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
    bg: { value: '#000000', name: 'Black' },
    text: { value: '#FFFF00', name: 'Vivid Yellow' },
    accent: { value: '#FF6347', name: 'Tomato Red' },
  },
  {
    bg: { value: '#1D1D1D', name: 'Night Rider Black' },
    text: { value: '#FF00FF', name: 'Fuchsia pink' },
    accent: { value: '#7FFF00', name: 'Spring Green' },
  },
  {
    bg: { value: '#2F4F4F', name: 'Dark Slate Gray' },
    text: { value: '#FF7F50', name: 'Coral Red' },
    accent: { value: '#FFD700', name: 'Gold' },
  },
  {
    bg: { value: '#696969', name: 'Dim Gray' },
    text: { value: '#00FFFF', name: 'Aquamarine' },
    accent: { value: '#FF1493', name: 'Deep Pink' },
  },
  {
    bg: { value: '#000080', name: 'Navy Blue' },
    text: { value: '#00FF00', name: 'Green' },
    accent: { value: '#FFA500', name: 'Orange Red' },
  },
  {
    bg: { value: '#800080', name: 'Purple' },
    text: { value: '#FFFF00', name: 'Yellow' },
    accent: { value: '#00FFFF', name: 'Aqua' },
  },
  {
    bg: { value: '#008000', name: 'Green' },
    text: { value: '#FFFFFF', name: 'White' },
    accent: { value: '#FF69B4', name: 'Hot Pink' },
  },
  {
    bg: { value: '#800000', name: 'Maroon' },
    text: { value: '#00FFFF', name: 'Aqua' },
    accent: { value: '#FFD700', name: 'Gold' },
  },
  {
    bg: { value: '#008080', name: 'Teal' },
    text: { value: '#FF00FF', name: 'Fuchsia' },
    accent: { value: '#FFFF00', name: 'Yellow' },
  },
  {
    bg: { value: '#FF0000', name: 'Red' },
    text: { value: '#000000', name: 'Black' },
    accent: { value: '#00FF00', name: 'Green' },
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
  "'VT323', monospace",
   "'Xanh Mono', monospace",
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

const props = Object.getOwnPropertyNames(window)
const funcs = props.filter(p => typeof window[p] === 'function')
const func = funcs[Math.floor($fx.rand() * funcs.length)]

function init() {
  $fx.rand.reset();

  windowScale = window.innerWidth / 1000;
  fontForCodeIndex = Math.floor(random() * fontsForCode.length);
  codeBoxDiv.style.fontFamily = fontsForCode[fontForCodeIndex];
  codeBoxDiv.style.fontSize = `${Math.floor(windowScale * fontSizesForCode[fontForCodeIndex])}px`;
  codeBoxDiv.style.padding = `${20 * windowScale}px`;
  //codeBoxDiv.style.filter = `blur(${1 * windowScale}px)`;

  codeBoxDiv.style.color = colors[colorIndex].accent.value;
  codeBoxDiv.style.backgroundColor = colors[colorIndex].bg.value;
  if ($fx.getFeature('Border')) {
    codeBoxDiv.style.border = `${1.5 * windowScale}px solid ${colors[colorIndex].accent.value}`;
  }

  drawFinished = false;
}

async function draw() {
  init();

  let codeText = `try {
  window[randomFunc(window)]()\\\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b  window.${func}()
} catch (e) {
  e.message
}`;
//   let codeText = `try {
//   const props = Object.getOwnPropertyNames(window)
//   const funcs = props.filter(p => typeof window[p] === 'function')
//   const func = funcs[Math.floor($fx.rand() * funcs.length)]
//   window[func]()\\  window.${func}()
// } catch (e) {
//   e.message
// }`;

  const codeSpan = document.createElement('span');
  codeBoxDiv.appendChild(codeSpan);

  const cursorElement = document.createElement('span');
  cursorElement.textContent = '|';
  cursorElement.style.fontFamily = 'VT323';
  cursorElement.style.fontSize = `${Math.floor(windowScale * fontSizesForCode[fontForCodeIndex] * 1.5)}px`;
  cursorElement.style.lineHeight = `${fontSizesForCode[fontForCodeIndex]}px`;
  if (!drawFinished) {
    codeBoxDiv.appendChild(cursorElement);
  }

  let codeIndex = 0;
  let cursorVisible = true;

  let toggleCount = 0;
  let cursorInterval;
  function toggleCursor() {
    cursorVisible = !cursorVisible;
    cursorElement.style.visibility = cursorVisible ? 'visible' : 'hidden';
    if (toggleCount++ > 19 && !cursorVisible) {
      clearInterval(cursorInterval);
    }
  }

  let preToggleCount = 0;
  function waitForBackspace() {
    cursorVisible = !cursorVisible;
    cursorElement.style.visibility = cursorVisible ? 'visible' : 'hidden';
    if (preToggleCount++ > 3) {
      cursorElement.style.visibility = 'visible';
      setTimeout(printNextChar, 500);
    } else {
      setTimeout(waitForBackspace, 500);
    }
  }

  function printNextChar() {
    if (drawFinished) {
      return;
    }

    const char = codeText[codeIndex++];
    if (char === '\\') {
      setTimeout(waitForBackspace, 500);
    } else {
      let randomDelay = Math.floor(Math.random() * 80) + 50;
      if (char === '\b') {
        randomDelay = randomDelay / 1.5;
        codeSpan.innerHTML = codeSpan.innerHTML.slice(0, -1);
      } else {
        codeSpan.innerHTML += char;
      }
      if (codeIndex < codeText.length) {
        setTimeout(printNextChar, randomDelay);
      } else {
        drawFinished = true;
        setTimeout(drawBackgroundText, 500); // TODO:
  
        // $fx.preview();
        cursorInterval = setInterval(toggleCursor, 500);
        // clearInterval(cursorInterval);
      }
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
  
  async function drawBackgroundText() {
    const fontSizeDiff = $fx.getFeature('Changing font size') ? (1 + random() * 0.07 + 0.01) : 1;
    const maxFontSize = 10 * windowScale;
    const minFontSize = 5 * windowScale;
    let fontSize = random() * (maxFontSize - minFontSize + 1) + minFontSize;
    const fontFamily = fonts[Math.floor(random() * fonts.length)];
    let stepY = fontSize;
  
    let repeatedText = executedResult + ' ';
    while (textWidth(repeatedText, fontSize, fontFamily) < window.innerWidth * 2) {
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
  
    const bgColor = colors[colorIndex].bg.value;
    const textColor = colors[colorIndex].text.value;
    const textColorForNoise = colors[colorIndex].accent.value;
    
    let textIndex = 0;
    let textElements = [];
    let lastFontSize;
    for (let y = 0; y - stepY < window.innerHeight * 1.2; y += stepY) {
      const text = texts[textIndex++];
      const words = text.split(' ');

      const wrapper = document.createElement('div');
      wrapper.classList.add('wrapper');

      for (const word of words) {
        const textElement = document.createElement('p');
        textElement.textContent = word + ' ';

        // if (word.toLowerCase().includes('error') || word.toLowerCase().includes('illegal') || word.toLowerCase().includes('fail')) {
        if (word.toLowerCase().includes('illegal') || word.toLowerCase().includes('fail')) {
            textElement.style.color = textColorForNoise;
        }
        
        wrapper.appendChild(textElement);
      }

      wrapper.style.top = `${y}px`;
      wrapper.style.left = `-20%`;
  
      fontSize = fontSize * fontSizeDiff;
      stepY = fontSize;
      wrapper.style.fontSize = `${fontSize}px`;
      // wrapper.style.height = `${fontSize}px`;
      wrapper.style.fontFamily = fontFamily;
      wrapper.style.color = textColor;
      wrapper.style.backgroundColor = bgColor;
  
      lastFontSize = fontSize;

      textElements.push(wrapper);
    }

    if (random() > 0.2) {
      for (let i = 0; i < textElements.length; i++) {
        document.body.appendChild(textElements[i]);
      }
    } else {
      stepY = lastFontSize;
      for (let y = -window.innerHeight/10, i = 0; y - stepY < window.innerHeight * 1.2, i < textElements.length; y += stepY, i++) {
        fontSize = fontSize / fontSizeDiff;
        stepY = fontSize;
        textElements[i].style.fontSize = `${fontSize}px`;
        textElements[i].style.top = `${y}px`;
        document.body.appendChild(textElements[i]);
      }
    }

    $fx.preview();
  }

  // drawBackgroundText();

  // $fx.preview();
}

function textWidth(text, fontSize, fontFamily) {
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.float = 'left';
  tempDiv.style.whiteSpace = 'nowrap';
  tempDiv.style.visibility = 'hidden';
  tempDiv.style.fontFamily = fontFamily;
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

colorIndex = Math.floor(random() * colors.length);
$fx.features({
	'Text color': colors[colorIndex].text.name,
	'Backgrond color': colors[colorIndex].bg.name,
	'Accent color': colors[colorIndex].accent.name,
	'Border': $fx.rand() > 0.5 ? true : false,
  'Function': func,
  'Changing font size': $fx.rand() > 0.1 ? true : false,
})

// window.addEventListener('resize', () => {
//   if (!drawFinished) {
//     return;
//   }
//   drawFinished = false;
//   draw();
// });

window.onload = _event => {
  draw();
};
