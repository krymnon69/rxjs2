import './index.css';
import { ajax } from 'rxjs/ajax';
import { fromEvent, interval } from 'rxjs';
import {
  switchMap, map, debounceTime, distinctUntilChanged, mergeMap, tap, catchError, filter,
} from 'rxjs/operators';

// const btnExit = document.querySelector('.an_autorization');
// localStorage.setItem('token', 'null');
// localStorage.setItem('userId', 'null');
//

if (!localStorage.getItem('token')) {
  localStorage.setItem('token', 'null');
  localStorage.setItem('userId', 'null');
  localStorage.setItem('resultProfile', 'null');
}

function createElement(tag = 'div', className= '', src = '', innerHTML = '') {
  const el = document.createElement(`${tag}`);
  el.className = className;
  el.src = src;
  el.innerHTML = innerHTML
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
      window.location = `http://localhost:${this.#basePort}/#id${ansUrl.get('user_id')}`;
      // window.preventDefault()
    }
  }

  resetToken() {
    localStorage.setItem('token', 'null');
    localStorage.setItem('userId', 'null');
    localStorage.setItem('resultProfile', 'null');
    document.location.hash = ''
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

    createElement('script', '', `${url}&callback=profile`);
  }
}

window.profile = function (res) {
  localStorage.setItem('resultProfile', JSON.stringify(res));
  new GetInfo(res).createProfile();
}

class GetInfo {
  constructor(options) {
    this.source = options.response[0];
  }

  createProfile() {
    const profile = document.querySelector('.profile')
    const profileImg = profile.appendChild(createElement('div','profileImg'))
    profileImg.appendChild(createElement('img','', `${this.source.photo_200}`))
    const profileInfo = profile.appendChild(createElement('div', 'profile__info'))

    const profileName = profileInfo.appendChild(createElement('div', 'profile__name'))


    profileName.appendChild(createElement('h1','', '',
      `${this.source.first_name} ${this.source.last_name}`))


    const options = {
      year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',second: 'numeric', hour12: false
    };
    const date = new Date (this.source.last_seen.time*1000)
    if (this.source.online !== 1)
      profileName.appendChild(createElement('h2','', '', `Заходил ${date.toLocaleDateString('UTC', options)}`))
    if (this.source.online === 1)
      profileName.appendChild(createElement('h2','', '', `Online`))

    const profileInf = profileInfo.appendChild(createElement('div', 'profile__info'))
    const info = `
        <br> День рождения: ${this.source.bdate}
        <br> Город: ${this.source.city.title}
        <br> Образование: ${this.source.universities[0].name}`
    profileInf.appendChild(createElement('p1', '','', info));
  }
}

const btnAutorization = document.getElementById('auto');
const btnExit = document.getElementById('an_auto');

window.addEventListener('load', () => {
  new Token().createToken();

  if (localStorage.getItem('token') !== 'null') {
    const user = {
      method: 'users.get',
      params: 'online,last_seen,bdate,city,universities,photo_200,counters',
    };
    new MethodRequest(user).createSendRequest();
  }
});

btnAutorization.addEventListener('click', () => {
  new Token().login();
});

btnExit.addEventListener('click', () => {
  new Token().resetToken();
});




//   // p.remove()
//   // Для замены элемента применяется метод replaceChild(newNode, oldNode)


// const stream$ = fromEvent(btnAutorization, 'click')
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
