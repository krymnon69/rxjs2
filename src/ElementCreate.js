import MethodRequest from './Request';

export default function elementCreate(tag = 'div', innerHTML = '', className = '', src = '') {
  const el = document.createElement(tag);
  if (className !== '') el.className = className;
  if (src !== '') el.src = src;
  if (innerHTML !== '') el.innerHTML = innerHTML;
  document.body.appendChild(el);
  return el;
}


//
// function scrolling(nameFunc) {
//   const page = Math.floor(src.count / 24);
//   const modalContent = document.querySelector('.modal-content');
//   const rect = modalContent.getBoundingClientRect();
//
//   // let cnt = 24;
//   // modal.removeEventListener('onscroll', scrolling(nameFunc));
//   // if (ofset > src.count) {
//   //   cnt = ofset - src.count;
//   //   modal.removeEventListener('onscroll', scrolling(nameFunc));
//   // }
//
//   if (rect.bottom < document.documentElement.clientHeight + 150) {
//     let request = {};
//     switch (nameFunc) {
//       case 'followers':
//         request = {
//           offset: 48,
//           count: src.count,
//           method: 'users.getFollowers',
//           params: 'photo_100',
//         };
//         break;
//       case 'photos':
//         request = {
//           owner_id: 24426005,
//           offset: 48,
//           count: src.count,
//           method: 'photos.getAll',
//         };
//         break;
//       default:
//       //   return;
//     }
//     new MethodRequest(request).createSendRequest();
//     // return () => modal.removeEventListener('onscroll', scrolling(nameFunc))
//   }
// }
//
// function throttle(callee, timeout) {
//   // Таймер будет определять, надо ли нам пропускать текущий вызов.
//   let timer = null;
//   // Как результат возвращаем другую функцию. Это нужно, чтобы мы могли не менять другие части кода
//   return function perform(...args) {
//     // Если таймер есть, то функция уже была вызвана, и значит новый вызов следует пропустить.
//     if (timer) return;
//     // Если таймера нет, значит мы можем вызвать функцию:
//     timer = setTimeout(() => {
//       // Аргументы передаём неизменными в функцию-аргумент:
//       callee(...args);
//       // По окончании очищаем таймер:
//       clearTimeout(timer);
//       timer = null;
//     }, timeout);
//   };
// }
