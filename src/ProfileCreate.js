import elementCreate from './ElementCreate';

const profileImg = document.querySelector('.profile__img');
const profileInfo = document.querySelector('.profile__info');
const profileName = document.querySelector('.info__name');

function profileCreate(obj) {
  const source = obj.response[0];

  profileImg.style.display = 'flex';
  profileName.style.display = 'flex';
  profileInfo.style.display = 'block';

  profileImg.appendChild(elementCreate('img', '', '', source.photo_200));
  profileName.appendChild(elementCreate('h1', `${source.first_name} ${source.last_name}`));

  const options = {
    month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false,
  };
  const date = new Date(source.last_seen.time * 1000);
  if (source.online !== 1) profileName.appendChild(elementCreate('h2', `Заходил ${date.toLocaleDateString('UTC', options)}`));
  if (source.online === 1) profileName.appendChild(elementCreate('h2', 'Online'));

  const infoLabel = document.querySelector('.info__label');
  infoLabel.appendChild(elementCreate('h2', 'День рождения:'));
  infoLabel.appendChild(elementCreate('h2', 'Город:'));
  infoLabel.appendChild(elementCreate('h2', 'Образование:'));

  const bdate = source.bdate.split('.');
  const resDate = new Date(bdate[2], bdate[1] - 1, bdate[0]);
  const age = new Date((new Date() - resDate.getTime())).getFullYear() - 1970;
  const birthday = resDate.toLocaleDateString('UTC', { year: 'numeric', month: 'long', day: 'numeric' });

  const infoItem = document.querySelector('.info__item');
  infoItem.appendChild(elementCreate('a', `${birthday} (${age} лет)`));
  infoItem.appendChild(elementCreate('a', source.city.title));
  infoItem.appendChild(elementCreate('a', source.universities[0].name));

  const infoDetail = document.querySelector('.info__detail');
  infoDetail.appendChild(elementCreate('a', 'Показать подробную информацию'));

  const infoCounters = document.querySelector('.info__counters');

  const divFollowers = infoCounters.appendChild(elementCreate('div', '', 'button__counters'));
  divFollowers.appendChild(elementCreate('button', '', 'counters-followers'));
  divFollowers.appendChild(elementCreate('label', source.counters.clips_followers));
  divFollowers.appendChild(elementCreate('label', 'подписчиков'));

  const divFotos = infoCounters.appendChild(elementCreate('div', '', 'button__fotos'));
  divFotos.appendChild(elementCreate('button', '', 'counters-fotos'));
  divFotos.appendChild(elementCreate('label', source.counters.photos));
  divFotos.appendChild(elementCreate('label', 'фотографии'));

  const divFriends = infoCounters.appendChild(elementCreate('div', '', 'button__friends'));
  divFriends.appendChild(elementCreate('button', '', 'counters-friends'));
  divFriends.appendChild(elementCreate('label', source.counters.friends));
  divFriends.appendChild(elementCreate('label', 'друзей'));

  const divGroups = infoCounters.appendChild(elementCreate('div', '', 'button__groups'));
  divGroups.appendChild(elementCreate('button', '', 'counters-groups'));
  divGroups.appendChild(elementCreate('label', source.counters.groups));
  divGroups.appendChild(elementCreate('label', 'сообществ'));
}

function removeProfile() {
  profileImg.remove();
  profileInfo.remove();
  profileName.remove();
  document.location.hash = '';
}

export { profileCreate, removeProfile };
