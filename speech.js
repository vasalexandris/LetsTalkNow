// ===============================
//  TalkEase – Web-Speech handler
// ===============================

const micBtn  = document.getElementById('micBtn');
const source  = document.getElementById('sourceText');

let rec;                       // SpeechRecognition instance
let listening = false;         // internal flag

/* 1️⃣  Browser support */
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
  alert('Sorry – your browser does not support Speech Recognition 😢');
}

/* 2️⃣  Create & configure the recogniser */
rec = new SpeechRecognition();
rec.continuous      = true;   // keep listening until we stop
rec.interimResults  = true;   // stream partial results
rec.lang            = 'el-GR';// auto-detect or set your default language

/* 3️⃣  Events */
rec.onstart = () => {
  console.log('[SPEECH] started');
  micBtn.textContent = '🔴 listening…';
  listening = true;
};

rec.onend = () => {
  console.log('[SPEECH] ended');
  micBtn.textContent = '🎤 Hold';
  listening = false;
};

rec.onresult = (e) => {
  const last = e.results[e.results.length - 1];
  const text = last[0].transcript;
  source.value = text;
  console.log('[SPEECH] heard →', text);

  /* 4️⃣  Auto-translate */
  import('./translate.js').then(m => m.translate(text));
};

rec.onerror = (e) => {
  console.error('[SPEECH] error →', e.error);
  micBtn.textContent = '🎤 Hold';
  listening = false;
};

/* 5️⃣  Hold button logic */
micBtn.addEventListener('mousedown', () => {
  navigator.mediaDevices.getUserMedia({ audio: true })   // ask for permission
    .then(() => rec.start())
    .catch(err => alert('Microphone permission denied\n' + err));
});

micBtn.addEventListener('mouseup', () => rec.stop());
