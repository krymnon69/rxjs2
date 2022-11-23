import './index.css';
// import { ajax } from 'rxjs/ajax';
// import { fromEvent, interval } from 'rxjs';
// import {
//   switchMap, map, debounceTime, distinctUntilChanged, mergeMap, tap, catchError, filter, window,
// } from 'rxjs/operators';
import elementCreate from './ElementCreate';
import { profileCreate, removeProfile } from './ProfileCreate';
import subscribesModalCreate from './Subscribes';

function resetStorage() {
  localStorage.setItem('token', 'null');
  localStorage.setItem('userId', 'null');
  localStorage.setItem('resultProfile', 'null');
}

if (!localStorage.getItem('token')) resetStorage();

class Token {
  #basePort = document.location.port;

  #url = 'https://oauth.vk.com/authorize?client_id=51473070&display=popup&'
    + `redirect_uri=http://localhost:${this.#basePort}/&scope=offline&response_type=token&v=5.131`;

  #Token = localStorage.getItem('token');

  #userId = localStorage.getItem('userId');

  login() {
    if (this.#Token === 'null') {
      window.location = this.#url;
      return;
    }
    const btnLogin = document.querySelector('.auto');
    btnLogin.nextElementSibling.style.transform = 'scaleX(1)';
    setTimeout(() => btnLogin.nextElementSibling.style.transform = 'scaleX(0)', 800);
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

  get token() {
    return this.#Token;
  }

  get userId() {
    return this.#userId;
  }
}

const autorization = document.querySelector('.autorization');

autorization.addEventListener('click', (event) => {
  if (event.target.closest('.auto')) new Token().login();
  if (event.target.closest('.an_auto')) {
    resetStorage();
    removeProfile();
  }
});

class MethodRequest extends Token {
  constructor(options) {
    super();
    this.usId = options.usId;
    this.method = options.method;
    this.offset = options.offset;
    this.count = options.count;
    this.params = options.params;
  }

  createSendRequest() {
    if (this.usId === '') this.usId = this.userId;
    const url = `https://api.vk.com/method/${this.method}?`
      + `user_ids=${this.usId}&`
      + `offset=${this.offset}&`
      + `count=${this.count}&`
      + `fields=${this.params}&`
      + `access_token=${this.token}&v=5.131`;

    if (this.method === 'users.get') elementCreate('script', '', '', `${url}&callback=profile`);
    if (this.method === 'users.getFollowers') elementCreate('script', '', '', `${url}&callback=followers`);
  }
}

window.profile = (res) => profileCreate(res);
window.followers = (res) => subscribesModalCreate(res);

const counters = document.querySelector('.info__counters');

counters.addEventListener('click', (event) => {
  if (event.target.closest('.counters-followers')) {
    const modal = document.querySelector('.modal');
    modal.style.display = 'block';

    const followersList = {
      usId: '',
      offset: '',
      count: `${event.target.nextSibling.innerHTML}`,
      method: 'users.getFollowers',
      params: 'photo_100',
    };
    console.log();
    new MethodRequest(followersList).createSendRequest();
  }

  if (event.target.closest('.counters-fotos')) {
    console.log('2');
  }

  if (event.target.closest('.counters-friends')) {
    console.log('3');
  }

  if (event.target.closest('.counters-groups')) {
    console.log('4');
  }
});

window.addEventListener('load', () => {
  new Token().createToken();

  if (localStorage.getItem('token') !== 'null') {
    const user = {
      usId: '',
      offset: '',
      count: '',
      method: 'users.get',
      params: 'online,last_seen,bdate,city,universities,photo_200,counters',
    };
    new MethodRequest(user).createSendRequest();
  }
});

// eslint-disable-next-line import/prefer-default-export
export { MethodRequest };

// btn[0].addEventListener('click', () => {
//   console.log('YES!');
// })

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
