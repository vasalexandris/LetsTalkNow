// emergency-test.js
const btn = document.getElementById('micBtn');
if (!btn) {
  alert('ΔΕΝ ΒΡΗΚΑ ΚΟΥΜΠΙ!');
} else {
  btn.addEventListener('click', () => {
    alert('Κουμπί πιάστηκε!');
  });
}
