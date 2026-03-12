// ===================== TTS =====================
let _ttsVoicesLoaded = false;
let _ttsJaVoice = null;

function _loadTTSVoices() {
  const voices = speechSynthesis.getVoices();
  if (voices.length > 0) {
    const jaVoices = voices.filter(v => v.lang === "ja-JP" || v.lang.startsWith("ja"));
    _ttsJaVoice =
      jaVoices.find(v => v.name === "Kyoko") ||
      jaVoices.find(v => v.name.includes("O-Ren")) ||
      jaVoices.find(v => !v.name.includes("Google") && v.lang === "ja-JP") ||
      jaVoices.find(v => v.name.includes("Google") && v.lang === "ja-JP") ||
      jaVoices[0] || null;
    _ttsVoicesLoaded = true;
  }
}

if (window.speechSynthesis) {
  _loadTTSVoices();
  speechSynthesis.addEventListener("voiceschanged", _loadTTSVoices);
}

export function speakJapanese(text, rate = 0.85) {
  if (!window.speechSynthesis || !text) return;
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
      u.onend = () => { if (keepAlive) clearInterval(keepAlive); };
      u.onerror = () => { if (keepAlive) clearInterval(keepAlive); };
      speechSynthesis.speak(u);
    }, 100);
  } catch (e) { console.warn("TTS failed:", e); }
}

export function stopSpeaking() {
  if (window.speechSynthesis) speechSynthesis.cancel();
}
