import './index.css';
import { ajax } from 'rxjs/ajax';
import { fromEvent, interval } from 'rxjs';
import {
  switchMap, map, debounceTime, distinctUntilChanged, mergeMap, tap, catchError, filter,
} from 'rxjs/operators';

// VK.UI.button('auto');

// const buttonExit = document.querySelector('.an_autorization');
// localStorage.setItem('token', 'null');


// const basePort = document.location.port;
// const currentUrl = document.location.href;

function createElement(tag = 'div', className = '', src = '') {
  const el = document.createElement(`${tag}`);
  el.className = className;
  el.src = src;
  document.body.appendChild(el);
  return el;
}

class Token {
  #basePort = document.location.port;
  #url = 'https://oauth.vk.com/authorize?client_id=51473070&display=popup&'
    + `redirect_uri=http://localhost:${this.#basePort}/&scope=offline&response_type=token&v=5.131`;
  #Token = localStorage.getItem('token');
  #userId = localStorage.getItem('userId');

  login() {
    if (this.#Token === 'null') {
      window.location = this.#url;
    } else console.log('Вы авторизированы!');
  }

  createToken() {
    if (this.#Token === 'null') {
      const ansUrl = new URLSearchParams(document.location.hash);
      localStorage.setItem('token', ansUrl.get('#access_token'));
      localStorage.setItem('userId', ansUrl.get('user_id'));
      window.location = `http://localhost:${this.#basePort}/#`;
    }
  }

  resetToken() {
    localStorage.setItem('token', 'null');
    localStorage.setItem('userId', 'null');
  }

  get token() {
    return this.#Token;
  }

  get userId() {
    return this.#userId;
  }
}

class MethodRequest extends Token {
  constructor(options) {
    super();
    this.method = options.method;
    this.params = options.params;
  }

  createSendRequest() {
    const url = `https://api.vk.com/method/${this.method}?`
    + `user_ids=${this.userId}&`
    + `fields=${this.params}&`
    + `access_token=${this.token}&v=5.131`;

    createElement('script', '', `${url}&callback=callbackFunc`);
  }
}

class GetInfo {
  callbackFunc (res) {
    // const src = res.response[0];
    // const image = document.createElement('img');
    // image.src = src.photo_200;
    // document.body.appendChild(image);
    const src = res.response[0];
    // createElement('p1').innerHTML = `${src.first_name}
    // ${src.last_name} online: ${src.online}
    // <br> id: ${src.id}
    // <br> Количество друзей: ${src.counters.friends}
    // <br> Количество аудио: ${src.counters.photos}
    // <br> Количество видео: ${src.counters.videos}`
    const profile = createElement('div', 'profile');
    profile.appendChild(createElement('img','',`${src.photo_200}`))
    profile.appendChild(createElement('p1').innerHTML = `${src.first_name}
    ${src.last_name} online: ${src.online}
    <br> id: ${src.id}
    <br> Количество друзей: ${src.counters.friends}
    <br> Количество аудио: ${src.counters.photos}
    <br> Количество видео: ${src.counters.videos}`)
  }
}

window.callbackFunc = (res) => {
  return new GetInfo().callbackFunc(res)
}


const buttonInput = document.getElementById('auto');
const buttonExit = document.getElementById('an_auto');
const user = document.getElementById('user');

window.addEventListener('load', () => {
  new Token().createToken();
});

buttonInput.addEventListener('click', () => {
  new Token().login();
});

buttonExit.addEventListener('click', () => {
  new Token().resetToken();
});

user.addEventListener('click', () => {
  new MethodRequest({
    method: 'users.get',
    params: 'online,photo_200,sex,counters',
  }).createSendRequest();
});





// window.callbackFunc = (res) => {
//   const div = document.createElement('div');
//   const info = document.createElement('div');
//   div.className = 'profile';
//   document.body.appendChild(div);
//   div.appendChild(info);
//   const image = document.createElement('img');
//   const p = document.createElement('p1');
//   const src = res.response[0];
//
//   image.src = src.photo_200;
//
//   div.appendChild(image);
//
//   let sex;
//
//   if (src.sex === 1) { sex = 'Женщина'; } else { sex = 'Мужчина'; }
//
//   p.innerHTML = `${src.first_name}
//     ${src.last_name} (${sex}) online: ${src.online}
//     <br> id: ${src.id}
//     <br> Количество друзей: ${src.counters.friends}
//     <br> Количество аудио: ${src.counters.photos}
//     <br> Количество видео: ${src.counters.videos}`;
//   div.appendChild(p);
//   // p.remove()
//
//   // Для замены элемента применяется метод replaceChild(newNode, oldNode)
// };


function sendRequest(url) {
  // const script = document.createElement('script')
  // script.src = `${url}&callback=callbackFunc`
  // document.getElementsByTagName('head')[0].appendChild(script)
}

function createUrl(method) {
  // return function (params){
  //   const id = localStorage.getItem('userId')
  //   const token = localStorage.getItem('token')
  //   return `https://api.vk.com/method/${method}?`+
  //     `user_ids=${id}&`+
  //     `fields=${params}&`+
  //     `access_token=${token}&v=5.131`
  // }
}

function createToken() {
  // const resUrl = new URLSearchParams(document.location.hash)
  // const token = resUrl.get('#access_token')
  // const user_id = resUrl.get('user_id')
  // localStorage.setItem('token', token)
  // localStorage.setItem('userId', user_id)
  // if(document.location.hash !== 'null') {
  //   document.location = `http://localhost:${basePort}/#`;
  // }
}

// const stream$ = fromEvent(buttonInput, 'click')
//   .pipe(
//     map((element) => element.target.value),
//     debounceTime(500),
//     distinctUntilChanged(), // есть ли изменения
//     tap(() => result.innerHTML = ''),
//     filter((value) => value.trim()),
//   );
//
// stream$.subscribe({
//     next(val) {
//       console.log(val);
//     },
//     error(err) {
//       console.log(err);
//     },
//     complete() {
//       console.log('VSE');
//     }
//   }
// )

//   `fetch (${url}).then(response =>{
//   if(response.ok){
//     return response.json()
//   }
// return response.json().then(error => {
//   const e = new Error('Что-то пошло не так')
//   e.data = error
//   throw e
// })
// })`
