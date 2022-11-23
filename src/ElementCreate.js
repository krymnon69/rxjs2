export default function elementCreate(tag = 'div', innerHTML = '', className = '', src = '') {
  const el = document.createElement(tag);
  if (className !== '') el.className = className;
  if (src !== '') el.src = src;
  if (innerHTML !== '') el.innerHTML = innerHTML;
  document.body.appendChild(el);
  return el;
}
