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

$fx.rand.reset();

// In a way, it could be said that I am drawing out the poison here.
// I am not convinced of this.
//
// const props = Object.getOwnPropertyNames(window);
// const funcs = props.filter(p => typeof window[p] === 'function').sort();
const funcs = ['AbortController', 'AbortSignal', 'AbstractRange', 'AggregateError', 'AnalyserNode', 'Animation', 'AnimationEffect', 'AnimationEvent', 'AnimationPlaybackEvent', 'AnimationTimeline', 'Array', 'ArrayBuffer', 'Attr', 'Audio', 'AudioBuffer', 'AudioBufferSourceNode', 'AudioContext', 'AudioDestinationNode', 'AudioListener', 'AudioNode', 'AudioParam', 'AudioParamMap', 'AudioProcessingEvent', 'AudioScheduledSourceNode', 'AudioWorklet', 'AudioWorkletNode', 'AuthenticatorAssertionResponse', 'AuthenticatorAttestationResponse', 'AuthenticatorResponse', 'BarProp', 'BaseAudioContext', 'BeforeUnloadEvent', 'BigInt', 'BigInt64Array', 'BigUint64Array', 'BiquadFilterNode', 'Blob', 'BlobEvent', 'Boolean', 'BroadcastChannel', 'ByteLengthQueuingStrategy', 'CDATASection', 'CSSAnimation', 'CSSConditionRule', 'CSSContainerRule', 'CSSCounterStyleRule', 'CSSFontFaceRule', 'CSSFontPaletteValuesRule', 'CSSGroupingRule', 'CSSImportRule', 'CSSKeyframeRule', 'CSSKeyframesRule', 'CSSLayerBlockRule', 'CSSLayerStatementRule', 'CSSMediaRule', 'CSSNamespaceRule', 'CSSPageRule', 'CSSRule', 'CSSRuleList', 'CSSStyleDeclaration', 'CSSStyleRule', 'CSSStyleSheet', 'CSSSupportsRule', 'CSSTransition', 'Cache', 'CacheStorage', 'CanvasGradient', 'CanvasPattern', 'CanvasRenderingContext2D', 'ChannelMergerNode', 'ChannelSplitterNode', 'CharacterData', 'Clipboard', 'ClipboardEvent', 'CloseEvent', 'Comment', 'CompositionEvent', 'CompressionStream', 'ConstantSourceNode', 'ConvolverNode', 'CountQueuingStrategy', 'Credential', 'CredentialsContainer', 'Crypto', 'CryptoKey', 'CustomElementRegistry', 'CustomEvent', 'DOMException', 'DOMImplementation', 'DOMMatrix', 'DOMMatrixReadOnly', 'DOMParser', 'DOMPoint', 'DOMPointReadOnly', 'DOMQuad', 'DOMRect', 'DOMRectList', 'DOMRectReadOnly', 'DOMStringList', 'DOMStringMap', 'DOMTokenList', 'DataTransfer', 'DataTransferItem', 'DataTransferItemList', 'DataView', 'Date', 'DecompressionStream', 'DelayNode', 'DeviceMotionEvent', 'DeviceOrientationEvent', 'Document', 'DocumentFragment', 'DocumentTimeline', 'DocumentType', 'DragEvent', 'DynamicsCompressorNode', 'Element', 'ElementInternals', 'Error', 'ErrorEvent', 'EvalError', 'Event', 'EventSource', 'EventTarget', 'File', 'FileList', 'FileReader', 'FileSystemDirectoryHandle', 'FileSystemFileHandle', 'FileSystemHandle', 'FinalizationRegistry', 'Float32Array', 'Float64Array', 'FocusEvent', 'FontFace', 'FormData', 'FormDataEvent', 'Function', 'GainNode', 'Gamepad', 'GamepadButton', 'GamepadEvent', 'GamepadHapticActuator', 'Geolocation', 'GeolocationCoordinates', 'GeolocationPosition', 'GeolocationPositionError', 'HTMLAllCollection', 'HTMLAnchorElement', 'HTMLAreaElement', 'HTMLAudioElement', 'HTMLBRElement', 'HTMLBaseElement', 'HTMLBodyElement', 'HTMLButtonElement', 'HTMLCanvasElement', 'HTMLCollection', 'HTMLDListElement', 'HTMLDataElement', 'HTMLDataListElement', 'HTMLDetailsElement', 'HTMLDialogElement', 'HTMLDirectoryElement', 'HTMLDivElement', 'HTMLDocument', 'HTMLElement', 'HTMLEmbedElement', 'HTMLFieldSetElement', 'HTMLFontElement', 'HTMLFormControlsCollection', 'HTMLFormElement', 'HTMLFrameElement', 'HTMLFrameSetElement', 'HTMLHRElement', 'HTMLHeadElement', 'HTMLHeadingElement', 'HTMLHtmlElement', 'HTMLIFrameElement', 'HTMLImageElement', 'HTMLInputElement', 'HTMLLIElement', 'HTMLLabelElement', 'HTMLLegendElement', 'HTMLLinkElement', 'HTMLMapElement', 'HTMLMarqueeElement', 'HTMLMediaElement', 'HTMLMenuElement', 'HTMLMetaElement', 'HTMLMeterElement', 'HTMLModElement', 'HTMLOListElement', 'HTMLObjectElement', 'HTMLOptGroupElement', 'HTMLOptionElement', 'HTMLOptionsCollection', 'HTMLOutputElement', 'HTMLParagraphElement', 'HTMLParamElement', 'HTMLPictureElement', 'HTMLPreElement', 'HTMLProgressElement', 'HTMLQuoteElement', 'HTMLScriptElement', 'HTMLSelectElement', 'HTMLSlotElement', 'HTMLSourceElement', 'HTMLSpanElement', 'HTMLStyleElement', 'HTMLTableCaptionElement', 'HTMLTableCellElement', 'HTMLTableColElement', 'HTMLTableElement', 'HTMLTableRowElement', 'HTMLTableSectionElement', 'HTMLTemplateElement', 'HTMLTextAreaElement', 'HTMLTimeElement', 'HTMLTitleElement', 'HTMLTrackElement', 'HTMLUListElement', 'HTMLUnknownElement', 'HTMLVideoElement', 'HashChangeEvent', 'Headers', 'History', 'IDBCursor', 'IDBCursorWithValue', 'IDBDatabase', 'IDBFactory', 'IDBIndex', 'IDBKeyRange', 'IDBObjectStore', 'IDBOpenDBRequest', 'IDBRequest', 'IDBTransaction', 'IDBVersionChangeEvent', 'IIRFilterNode', 'Image', 'ImageBitmap', 'ImageBitmapRenderingContext', 'ImageData', 'InputEvent', 'Int16Array', 'Int32Array', 'Int8Array', 'IntersectionObserver', 'IntersectionObserverEntry', 'KeyboardEvent', 'KeyframeEffect', 'Location', 'Lock', 'LockManager', 'Map', 'MathMLElement', 'MediaCapabilities', 'MediaDeviceInfo', 'MediaDevices', 'MediaElementAudioSourceNode', 'MediaEncryptedEvent', 'MediaError', 'MediaKeyMessageEvent', 'MediaKeySession', 'MediaKeyStatusMap', 'MediaKeySystemAccess', 'MediaKeys', 'MediaList', 'MediaMetadata', 'MediaQueryList', 'MediaQueryListEvent', 'MediaRecorder', 'MediaSession', 'MediaSource', 'MediaStream', 'MediaStreamAudioDestinationNode', 'MediaStreamAudioSourceNode', 'MediaStreamTrack', 'MediaStreamTrackEvent', 'MessageChannel', 'MessageEvent', 'MessagePort', 'MimeType', 'MimeTypeArray', 'MouseEvent', 'MutationEvent', 'MutationObserver', 'MutationRecord', 'NamedNodeMap', 'NavigationPreloadManager', 'Navigator', 'Node', 'NodeFilter', 'NodeIterator', 'NodeList', 'Notification', 'Number', 'Object', 'OfflineAudioCompletionEvent', 'OfflineAudioContext', 'OffscreenCanvas', 'OffscreenCanvasRenderingContext2D', 'Option', 'OscillatorNode', 'PageTransitionEvent', 'PannerNode', 'Path2D', 'Performance', 'PerformanceEntry', 'PerformanceMark', 'PerformanceMeasure', 'PerformanceNavigation', 'PerformanceNavigationTiming', 'PerformanceObserver', 'PerformanceObserverEntryList', 'PerformancePaintTiming', 'PerformanceResourceTiming', 'PerformanceServerTiming', 'PerformanceTiming', 'PeriodicWave', 'PermissionStatus', 'Permissions', 'Plugin', 'PluginArray', 'PointerEvent', 'PopStateEvent', 'ProcessingInstruction', 'ProgressEvent', 'Promise', 'PromiseRejectionEvent', 'Proxy', 'PublicKeyCredential', 'PushManager', 'PushSubscription', 'PushSubscriptionOptions', 'RTCCertificate', 'RTCDTMFSender', 'RTCDTMFToneChangeEvent', 'RTCDataChannel', 'RTCDataChannelEvent', 'RTCDtlsTransport', 'RTCIceCandidate', 'RTCPeerConnection', 'RTCPeerConnectionIceEvent', 'RTCRtpReceiver', 'RTCRtpSender', 'RTCRtpTransceiver', 'RTCSctpTransport', 'RTCSessionDescription', 'RTCStatsReport', 'RTCTrackEvent', 'RadioNodeList', 'Range', 'RangeError', 'ReadableStream', 'ReadableStreamDefaultController', 'ReadableStreamDefaultReader', 'ReferenceError', 'RegExp', 'Request', 'ResizeObserver', 'ResizeObserverEntry', 'ResizeObserverSize', 'Response', 'SVGAElement', 'SVGAngle', 'SVGAnimateElement', 'SVGAnimateMotionElement', 'SVGAnimateTransformElement', 'SVGAnimatedAngle', 'SVGAnimatedBoolean', 'SVGAnimatedEnumeration', 'SVGAnimatedInteger', 'SVGAnimatedLength', 'SVGAnimatedLengthList', 'SVGAnimatedNumber', 'SVGAnimatedNumberList', 'SVGAnimatedPreserveAspectRatio', 'SVGAnimatedRect', 'SVGAnimatedString', 'SVGAnimatedTransformList', 'SVGAnimationElement', 'SVGCircleElement', 'SVGClipPathElement', 'SVGComponentTransferFunctionElement', 'SVGDefsElement', 'SVGDescElement', 'SVGElement', 'SVGEllipseElement', 'SVGFEBlendElement', 'SVGFEColorMatrixElement', 'SVGFEComponentTransferElement', 'SVGFECompositeElement', 'SVGFEConvolveMatrixElement', 'SVGFEDiffuseLightingElement', 'SVGFEDisplacementMapElement', 'SVGFEDistantLightElement', 'SVGFEDropShadowElement', 'SVGFEFloodElement', 'SVGFEFuncAElement', 'SVGFEFuncBElement', 'SVGFEFuncGElement', 'SVGFEFuncRElement', 'SVGFEGaussianBlurElement', 'SVGFEImageElement', 'SVGFEMergeElement', 'SVGFEMergeNodeElement', 'SVGFEMorphologyElement', 'SVGFEOffsetElement', 'SVGFEPointLightElement', 'SVGFESpecularLightingElement', 'SVGFESpotLightElement', 'SVGFETileElement', 'SVGFETurbulenceElement', 'SVGFilterElement', 'SVGForeignObjectElement', 'SVGGElement', 'SVGGeometryElement', 'SVGGradientElement', 'SVGGraphicsElement', 'SVGImageElement', 'SVGLength', 'SVGLengthList', 'SVGLineElement', 'SVGLinearGradientElement', 'SVGMPathElement', 'SVGMarkerElement', 'SVGMaskElement', 'SVGMatrix', 'SVGMetadataElement', 'SVGNumber', 'SVGNumberList', 'SVGPathElement', 'SVGPatternElement', 'SVGPoint', 'SVGPointList', 'SVGPolygonElement', 'SVGPolylineElement', 'SVGPreserveAspectRatio', 'SVGRadialGradientElement', 'SVGRect', 'SVGRectElement', 'SVGSVGElement', 'SVGScriptElement', 'SVGSetElement', 'SVGStopElement', 'SVGStringList', 'SVGStyleElement', 'SVGSwitchElement', 'SVGSymbolElement', 'SVGTSpanElement', 'SVGTextContentElement', 'SVGTextElement', 'SVGTextPathElement', 'SVGTextPositioningElement', 'SVGTitleElement', 'SVGTransform', 'SVGTransformList', 'SVGUnitTypes', 'SVGUseElement', 'SVGViewElement', 'Screen', 'ScreenOrientation', 'ScriptProcessorNode', 'SecurityPolicyViolationEvent', 'Selection', 'ServiceWorker', 'ServiceWorkerContainer', 'ServiceWorkerRegistration', 'Set', 'ShadowRoot', 'SharedWorker', 'SourceBuffer', 'SourceBufferList', 'SpeechSynthesis', 'SpeechSynthesisErrorEvent', 'SpeechSynthesisEvent', 'SpeechSynthesisUtterance', 'SpeechSynthesisVoice', 'StaticRange', 'StereoPannerNode', 'Storage', 'StorageEvent', 'StorageManager', 'String', 'StyleSheet', 'StyleSheetList', 'SubmitEvent', 'SubtleCrypto', 'Symbol', 'SyntaxError', 'Text', 'TextDecoder', 'TextDecoderStream', 'TextEncoder', 'TextEncoderStream', 'TextMetrics', 'TextTrack', 'TextTrackCue', 'TextTrackCueList', 'TextTrackList', 'TimeRanges', 'ToggleEvent', 'TrackEvent', 'TransformStream', 'TransformStreamDefaultController', 'TransitionEvent', 'TreeWalker', 'TypeError', 'UIEvent', 'URIError', 'URL', 'URLSearchParams', 'Uint16Array', 'Uint32Array', 'Uint8Array', 'Uint8ClampedArray', 'UserActivation', 'VTTCue', 'ValidityState', 'VideoPlaybackQuality', 'VisualViewport', 'WaveShaperNode', 'WeakMap', 'WeakRef', 'WeakSet', 'WebGL2RenderingContext', 'WebGLActiveInfo', 'WebGLBuffer', 'WebGLContextEvent', 'WebGLFramebuffer', 'WebGLProgram', 'WebGLQuery', 'WebGLRenderbuffer', 'WebGLRenderingContext', 'WebGLSampler', 'WebGLShader', 'WebGLShaderPrecisionFormat', 'WebGLSync', 'WebGLTexture', 'WebGLTransformFeedback', 'WebGLUniformLocation', 'WebGLVertexArrayObject', 'WebKitCSSMatrix', 'WebSocket', 'WheelEvent', 'Window', 'Worker', 'Worklet', 'WritableStream', 'WritableStreamDefaultController', 'WritableStreamDefaultWriter', 'XMLDocument', 'XMLHttpRequest', 'XMLHttpRequestEventTarget', 'XMLHttpRequestUpload', 'XMLSerializer', 'XPathEvaluator', 'XPathExpression', 'XPathResult', 'XSLTProcessor', 'alert', 'atob', 'blur', 'btoa', 'cancelAnimationFrame', 'captureEvents', 'clearInterval', 'clearTimeout', 'close', 'confirm', 'createImageBitmap', 'decodeURI', 'decodeURIComponent', 'draw', 'drawBackgroundText', 'encodeURI', 'encodeURIComponent', 'escape', 'eval', 'fetch', 'find', 'focus', 'getComputedStyle', 'getSelection', 'init', 'isFinite', 'isNaN', 'matchMedia', 'moveBy', 'moveTo', 'onload', 'open', 'parseFloat', 'parseInt', 'postMessage', 'print', 'prompt', 'queueMicrotask', 'random', 'releaseEvents', 'reportError', 'requestAnimationFrame', 'resizeBy', 'resizeTo', 'scroll', 'scrollBy', 'scrollTo', 'setInterval', 'setTimeout', 'stop', 'structuredClone', 'textWidth', 'unescape', 'webkitURL'];
let func = funcs[Math.floor($fx.rand() * funcs.length)];
const skipFuncs = [
  'alert',
  'confirm',
  'prompt',
  'open',
  'close',
  'print',
  'createImageBitmap',
  'getScreenDetails',
  'queryLocalFonts',
  'showDirectoryPicker',
  'showOpenFilePicker',
  'showSaveFilePicker',
  'draw',
  'drawBackgroundText',
];
while (skipFuncs.includes(func)) {
  func = funcs[Math.floor($fx.rand() * funcs.length)];
}

executedResult = '';

function init() {
  $fx.rand.reset();
  windowScale = window.innerWidth / 1000;
  fontForCodeIndex = Math.floor(random() * fontsForCode.length);
  codeBoxDiv.style.fontFamily = fontsForCode[fontForCodeIndex];
  codeBoxDiv.style.fontSize = `${Math.floor(windowScale * fontSizesForCode[fontForCodeIndex])}px`;
  codeBoxDiv.style.padding = `${20 * windowScale}px`;
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

  const codeSpan = document.createElement('span');
  codeBoxDiv.appendChild(codeSpan);

  const cursorElement = document.createElement('span');
  cursorElement.textContent = '|';
  cursorElement.style.fontFamily = 'VT323';
  cursorElement.style.fontSize = `${Math.floor(windowScale * fontSizesForCode[fontForCodeIndex] * 1.3)}px`;
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
      let randomDelay = Math.floor(Math.random() * 80) + 50; // However, I do not use deterministic random numbers in this line.
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
        setTimeout(drawBackgroundText, 500);
        cursorInterval = setInterval(toggleCursor, 500);
      }
    }
  }

  printNextChar();

  $fx.rand.reset(); // WISYWIG

  executedResult = func + ' ';
  try {
    const func = funcs[Math.floor($fx.rand() * funcs.length)]
    window[func]()
  } catch (e) {
    try {
      executedResult += e.toString() + ' ';
    } catch (err) {
      executedResult += err.toString() + ' ';
    }
  }
}

async function drawBackgroundText() {
  let fontSize = bgTextInitialFontSize;
  let stepY = fontSize;

  let repeatedText = executedResult + ' ';
  while (textWidth(repeatedText, fontSize, bgTextFontFamily) < window.innerWidth * 2) {
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

    fontSize = fontSize * bgTextFontSizeDiff;
    stepY = fontSize;
    wrapper.style.fontSize = `${fontSize}px`;
    wrapper.style.fontFamily = bgTextFontFamily;
    wrapper.style.color = textColor;
    wrapper.style.backgroundColor = bgColor;

    lastFontSize = fontSize;

    textElements.push(wrapper);
  }

  if (bgTextIncreaseOrDecrease) {
    for (let i = 0; i < textElements.length; i++) {
      document.body.appendChild(textElements[i]);
    }
  } else {
    stepY = lastFontSize;
    for (let y = -window.innerHeight/10, i = 0; y - stepY < window.innerHeight * 1.2, i < textElements.length; y += stepY, i++) {
      fontSize = fontSize / bgTextFontSizeDiff;
      stepY = fontSize;
      textElements[i].style.fontSize = `${fontSize}px`;
      textElements[i].style.top = `${y}px`;
      document.body.appendChild(textElements[i]);
    }
  }

  $fx.preview();
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

const bgTextFontSizeDiff = $fx.getFeature('Changing font size') ? (1 + random() * 0.07 + 0.01) : 1;
const bgTextFontFamily = fonts[Math.floor(random() * fonts.length)];
const bgTextMaxFontSize = 10 * windowScale;
const bgTextMinFontSize = 5 * windowScale;
const bgTextInitialFontSize = random() * (bgTextMaxFontSize - bgTextMinFontSize + 1) + bgTextMinFontSize;
const bgTextIncreaseOrDecrease = random() > 0.2;

// window.addEventListener('resize', () => {
//   if (!drawFinished) {
//     return;
//   }
//   drawFinished = false;
//   draw();
// });

let testIndex = 0;
document.addEventListener('keydown', function(event) {
  if (event.key === 'n' || event.key === 'N') {
      func = funcs[testIndex++ % funcs.length];
      console.log(testIndex, func);
      
      executedResult = func + ' '
      try {
        window[func]()
      } catch (e) {
        try {
          executedResult += e.toString() + ' ';
        } catch (err) {
          executedResult += err.toString() + ' ';
        }
      }
      drawBackgroundText();
  }
});

window.onload = _event => {
  draw();
};
