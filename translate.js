// Δωρεάν Google Translate (web-scraping) – μόνο για δοκιμή
export async function translate(text) {
  const target = document.getElementById('langSelect').value;
  const url =
    'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=' +
    target +
    '&dt=t&q=' +
    encodeURIComponent(text);

  const res = await fetch(url);
  const data = await res.json();
  const translated = data[0]?.map(t => t[0]).join('') || '';
  document.getElementById('translatedText').value = translated;
}
