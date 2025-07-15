const micBtn = document.getElementById('micBtn');
const sourceTextarea = document.getElementById('sourceText');

let recognizing = false;
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'auto';

micBtn.addEventListener('mousedown', () => {
  recognizing = true;
  sourceTextarea.value = '';
  recognition.start();
  micBtn.classList.add('recording');
});

micBtn.addEventListener('mouseup', () => {
  recognizing = false;
  recognition.stop();
  micBtn.classList.remove('recording');
});

recognition.addEventListener('result', (e) => {
  let transcript = '';
  for (let i = e.resultIndex; i < e.results.length; ++i) {
    transcript += e.results[i][0].transcript;
  }
  sourceTextarea.value = transcript;
  // Αυτόματη μετάφραση
  import('./translate.js').then(mod => mod.translate(transcript));
});
