export async function translate(text) {
  const target = document.getElementById('langSelect').value;
  const res = await fetch('https://api.openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer YOUR_OPENROUTER_KEY`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'moonshotai/k2',
      messages: [{ role: 'user', content: `Translate the following text to ${target}:\n${text}` }]
    })
  });
  const data = await res.json();
  document.getElementById('translatedText').value = data.choices?.[0]?.message?.content?.trim() || '';
}
