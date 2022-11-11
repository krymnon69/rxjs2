import { fromEvent } from 'rxjs';
import {
  switchMap, map, debounceTime, distinctUntilChanged, mergeMap, tap, catchError, filter,
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
// import {from} from "rxjs/src/internal/observable/from";

const url = 'https://oauth.vk.com/authorize?client_id=51466186&display=popup&redirect_uri=https://oauth.vk.com/blank.html&scope=offline&response_type=token&v=5.131&state=123456';

const search = document.getElementById('search');
const button = document.getElementById('auto');
const buttonExit = document.getElementById('an_auto');
const result = document.getElementById('result');

const stream$ = fromEvent(search, 'input')
  .pipe(
    map((element) => element.target.value),
    debounceTime(500),
    distinctUntilChanged(), // есть ли изменения
    tap(() => result.innerHTML = ''),
    filter((value) => value.trim()),
  ); // Если возвращается что-то помимо пустой строки
// switchMap(value => fetch(`url`)))
// then(response => response)
// switchMap(value => ajax.getJSON(url)))
// .pipe(
//     catchError(err => console.log(err)) // Если есть ошибка то ПРОДОЛЖАЕМ бл!
// ))
// map(response => response.items),
// mergeMap(items => items))

// const auto$ = fromEvent(button, 'click')
// auto$.subscribe(window.open(`${url}`, '_self'))

VK.init({
  apiId: 51473070,
});
VK.UI.button('auto');

button.addEventListener('click', () => {
  VK.Auth.login((response) => {
    console.log(response);
    if (response.status === 'connected') {
      console.log('YES!');
      console.log(response.session.mid);
      VK.Api.call('users.get', { user_ids: response.session.mid, v: '5.131' },
        (r) => {
          console.log(`Здравствуй ${r.response[0].first_name} ${r.response[0].last_name}!`);
          console.log(r);
          console.log(document.location.protocol);
        },
      );
    }
    if (response.status === 'not_authorized') {
      console.log('NO!');
    }
    if (response.status === 'unknown') {
      console.log('NOT!');
    }
  }, VK.access.FRIENDS);
});

buttonExit.addEventListener('click', () => {
  VK.Auth.logout((response) => {
    console.log(response);
  });
});

VK.Observer.subscribe('auth.login', (response) => {
  // console.log('LOG');
});
// изменение статуса
VK.Observer.subscribe('auth.sessionChange', (response) => {
  // console.log('an_LOG');
});

stream$.subscribe((user) => {
  console.log(user);
  const html = `
      <div class="card">
        <div class="card-image">
          <img src="" />
          <span class="card-title"></span>
        </div>
        <div class="card-action">
          <a href="" target="_blank">This is a link</a>
        </div>
      </div>
`;
  result.insertAdjacentHTML('beforeend', html);
});
