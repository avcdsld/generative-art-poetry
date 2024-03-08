/*
 * inside window
 * Author: Zeroichi Arakawa
 * License: This project is licensed under the Creative Commons Attribution 4.0 International License (CC BY 4.0). See the LICENSE file for more details.
 *
 * This project includes the following external components:
 * - fxhash.min.js: Created by fxhash, provided under the MIT License.
 * - Source Code Pro font: Provided under the SIL Open Font License 1.1.
 *
 * Please refer to the respective license terms of each external component.
 */

const backgroundDiv = document.createElement('div');
backgroundDiv.id = 'background';
const bgColors = [
  'rgba(255, 193, 7, 0.66)', // Amber
  'rgba(13, 71, 161, 0.66)', // Dark Blue
  'rgba(233, 30, 99, 0.66)', // Pink
  'rgba(0, 150, 136, 0.66)', // Teal
  'rgba(255, 87, 34, 0.66)'  // Deep Orange
];
backgroundDiv.style.color = bgColors[Math.floor(random() * bgColors.length)];
// backgroundDiv.style.whiteSpace = 'pre-wrap'; // 複数行のテキストを扱うために変更
// backgroundDiv.style.display = 'inline-block'; // コンテナをインラインブロック要素として扱う
// backgroundDiv.style.width = 'auto'; // 自動で幅を設定
// backgroundDiv.style.animation = 'marquee 20s linear infinite'; // アニメーション適用
// document.body.appendChild(backgroundDiv);

const codeBoxContainerDiv = document.createElement('div');
codeBoxContainerDiv.id = 'codeBoxContainer';
const codeBoxDiv = document.createElement('div');
codeBoxDiv.id = 'codeBox';
codeBoxContainerDiv.appendChild(codeBoxDiv);
document.body.appendChild(codeBoxContainerDiv);

async function draw() {
  const target = window;
  const propNames = Object.getOwnPropertyNames(target);
  const funcNames = propNames.filter(name => typeof target[name] === 'function');
  const funcIndex = Math.floor(random() * funcNames.length);
  const functionName = funcNames[funcIndex];

  codeBoxDiv.innerHTML = `<pre>
try {
  window.${functionName}()
} catch (e) {                     
  e.message
}
</pre>`;

  let executedResult = functionName + ' '
  try {
    await target[funcNames[funcIndex]]();
  } catch (e) {
    try {
      executedResult += e.toString() + ' ';
    } catch (err) {
      executedResult += err.toString() + ' ';
    }
  }

  const stepY = 20;
  const fontSize = backgroundDiv.style.fontSize;
  let bgText = '';
  let bgOneLine = '';
  if (textWidth(bgOneLine + executedResult, fontSize) > window.innerWidth) {
    bgOneLine += executedResult;
  } else {
    while (textWidth(bgOneLine, fontSize) < window.innerWidth + window.innerWidth/5) {
        bgOneLine += executedResult;
    }
  }
  // const chars = Array.from(bgOneLine);
  // const offset = Math.floor(random() * 30);
  // for (let y = 0; y - stepY < window.innerHeight; y += stepY) {
  //   for (let i = 0; i < offset; i++) {
  //     chars.push(chars.shift());
  //   }
  //   bgText += chars.join('') + '\n';
  // }
  // backgroundDiv.textContent = bgText;

  // ----------------

  let repeatedText = executedResult + ' ';
  while (textWidth(repeatedText, fontSize) < window.innerWidth * 2) {
      repeatedText += executedResult + ' ';
  }

  const texts = [];
  const chars = Array.from(repeatedText);
  const offset = Math.floor(random() * 30);
  for (let y = 0; y - stepY < window.innerHeight; y += stepY) {
    for (let i = 0; i < offset; i++) {
      chars.push(chars.shift());
    }
    texts.push(chars.join(''));
  }

  const bgColor = bgColors[Math.floor(random() * bgColors.length)];
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

    wrapper.style.color = bgColor;
    wrapper.addEventListener('click', function() {
      if (scrollingText.style.animation == '') {
        const speedSec = 60 + random() * 560;
        scrollingText.style.animation = `loop ${speedSec}s linear infinite`;
        scrollingText2.style.animation = `loop ${speedSec}s -${speedSec/2}s linear infinite`;
      } else {
        scrollingText.style.animation = '';
        scrollingText2.style.animation = '';
      }
    });

    // const speedSec = 60 + random() * 560;
    // scrollingText.style.animation = `loop ${speedSec}s linear infinite`;
    // scrollingText2.style.animation = `loop ${speedSec}s -${speedSec/2}s linear infinite`;

    document.body.appendChild(wrapper);
  }

  // ----------------

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

window.onload = _event => {
  draw();
};
