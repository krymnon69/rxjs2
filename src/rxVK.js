import './index.css';

import { ajax } from 'rxjs/ajax';
import { fromEvent, interval } from 'rxjs';
import { switchMap, map, debounceTime, distinctUntilChanged, mergeMap, tap, catchError, filter} from 'rxjs/operators';

import Token from './Token';
import MethodRequest from './Request';
import { profileCreate, removeProfile } from './ProfileCreate';
import { resCount, modalCreate } from './ModalCreate';
import { removeStorage } from './Storage';
import listenerCountersProfile from './DOMCountersListener';

if (!localStorage.getItem('token')) removeStorage();

window.profile = (res) => profileCreate(res);
window.followers = (res) => resCount(res, 'followers');
window.photos = (res) => modalCreate(res, 'photos');
window.friends = (res) => modalCreate(res, 'friends');
window.groups = (res) => modalCreate(res, 'groups');

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('token') === 'null') new Token().createToken();

  if (localStorage.getItem('token') !== 'null') {
    const user = {
      method: 'users.get',
      params: 'online,last_seen,bdate,city,universities,photo_200,counters,followers_count',
    };
    new MethodRequest(user).createSendRequest();
  }
});

const autorization = document.querySelector('.autorization');
const counters = document.querySelector('.info__counters');
counters.addEventListener('click', listenerCountersProfile);

autorization.addEventListener('click', (event) => {
  if (event.target.closest('.auto'))
    new Token().login();
  if (event.target.closest('.an_auto')) {
    removeStorage();
    removeProfile();
  }
});

const searchInput = document.querySelector('.autorization__input');

searchInput.onfocus = () => {
  searchInput.value = '';
}

const stream$ = fromEvent(searchInput, 'input')
  .pipe(
    map((element) => element.target.value),
    debounceTime(500),
    distinctUntilChanged(), // есть ли изменения
    // tap(() => result.innerHTML = ''),
    // filter((value) => value.trim()),
    // switchMap(val => ajax.getJSON(url + val + '&v=5.131'))
  );

stream$.subscribe(value => {
  const user = {
    q: value.toString(),
    offset: 0,
    count: 10,
    method: 'users.search',
    params: '',
  };
  new MethodRequest(user).createSendRequest();
  console.log(typeof value);
})
window.search = (res) => srch(res);

function srch (res) {
  console.log(res);
}

const ft = document.querySelector('.fetch');

ft.addEventListener('click', () => {
  const num = fetch(url + 'vasya' + '&v=5.131', {
    credentials: "include"
  })
  console.log(num);
})
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

// const test$ = fromEvent(searchInput, 'input')
// test$.subscribe(value => {
//   console.log(value);
// })


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
