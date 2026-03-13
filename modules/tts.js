// ===================== TTS =====================
let _ttsVoicesLoaded = false;
let _ttsJaVoice = null;
let _ttsJaVoiceMale = null;
let _ttsJaVoiceFemale = null;

function _loadTTSVoices() {
  const voices = speechSynthesis.getVoices();
  if (voices.length > 0) {
    const jaVoices = voices.filter(v => v.lang === "ja-JP" || v.lang.startsWith("ja"));
    // Default voice
    _ttsJaVoice =
      jaVoices.find(v => v.name === "Kyoko") ||
      jaVoices.find(v => v.name.includes("O-Ren")) ||
      jaVoices.find(v => !v.name.includes("Google") && v.lang === "ja-JP") ||
      jaVoices.find(v => v.name.includes("Google") && v.lang === "ja-JP") ||
      jaVoices[0] || null;
    // Male voice (Otoya on macOS, or lower-pitch fallback)
    _ttsJaVoiceMale =
      jaVoices.find(v => v.name === "Otoya") ||
      jaVoices.find(v => /male/i.test(v.name) && !/female/i.test(v.name)) ||
      jaVoices.find(v => v.name === "Hattori") ||
      null;
    // Female voice
    _ttsJaVoiceFemale =
      jaVoices.find(v => v.name === "Kyoko") ||
      jaVoices.find(v => v.name.includes("O-Ren")) ||
      jaVoices.find(v => /female/i.test(v.name)) ||
      null;
    _ttsVoicesLoaded = true;
  }
}

if (window.speechSynthesis) {
  _loadTTSVoices();
  speechSynthesis.addEventListener("voiceschanged", _loadTTSVoices);
}

export function speakJapanese(text, rate = 0.85, onDone) {
  if (!window.speechSynthesis || !text) { if (onDone) onDone(); return; }
  try {
    speechSynthesis.cancel();
    setTimeout(() => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "ja-JP"; u.rate = rate; u.volume = 1; u.pitch = 1;
      if (!_ttsVoicesLoaded) _loadTTSVoices();
      if (_ttsJaVoice) u.voice = _ttsJaVoice;
      let keepAlive = null;
      u.onstart = () => {
        keepAlive = setInterval(() => {
          if (!speechSynthesis.speaking) { clearInterval(keepAlive); return; }
          speechSynthesis.pause(); speechSynthesis.resume();
        }, 5000);
      };
      u.onend = () => { if (keepAlive) clearInterval(keepAlive); if (onDone) onDone(); };
      u.onerror = () => { if (keepAlive) clearInterval(keepAlive); if (onDone) onDone(); };
      speechSynthesis.speak(u);
    }, 100);
  } catch (e) { console.warn("TTS failed:", e); if (onDone) onDone(); }
}

// Play a sequence of lines without cancel() between them
// items: [{text, gender}]  gender: "male"|"female"|undefined
export function speakSequence(items, rate = 0.85, onAllDone) {
  if (!window.speechSynthesis || !items.length) { if (onAllDone) onAllDone(); return; }
  if (!_ttsVoicesLoaded) _loadTTSVoices();
  speechSynthesis.cancel();
  let i = 0;
  function next() {
    if (i >= items.length) { if (onAllDone) onAllDone(); return; }
    const item = items[i++];
    setTimeout(() => {
      const u = new SpeechSynthesisUtterance(item.text);
      u.lang = "ja-JP"; u.volume = 1;
      // Voice, pitch & rate by gender
      if (item.gender === "male") {
        u.pitch = 0.01; u.rate = rate * 0.85;
        if (_ttsJaVoiceMale) u.voice = _ttsJaVoiceMale;
        else if (_ttsJaVoice) u.voice = _ttsJaVoice;
      } else if (item.gender === "female") {
        u.pitch = 1.2; u.rate = rate * 1.05;
        if (_ttsJaVoiceFemale) u.voice = _ttsJaVoiceFemale;
        else if (_ttsJaVoice) u.voice = _ttsJaVoice;
      } else {
        u.pitch = 1; u.rate = rate;
        if (_ttsJaVoice) u.voice = _ttsJaVoice;
      }
      let keepAlive = null;
      u.onstart = () => {
        keepAlive = setInterval(() => {
          if (!speechSynthesis.speaking) { clearInterval(keepAlive); return; }
          speechSynthesis.pause(); speechSynthesis.resume();
        }, 5000);
      };
      u.onend = () => { if (keepAlive) clearInterval(keepAlive); setTimeout(next, 400); };
      u.onerror = () => { if (keepAlive) clearInterval(keepAlive); setTimeout(next, 400); };
      speechSynthesis.speak(u);
    }, i === 1 ? 100 : 0);
  }
  next();
}

export function stopSpeaking() {
  if (window.speechSynthesis) speechSynthesis.cancel();
}
