import elementCreate from './ElementCreate';
import MethodRequest from './Request';
import { removeProfile } from './ProfileCreate';

let source;
let func;

function resCount(source, nameFunc) {
  if (source.response.items.length !== 0) return modalCreate(source, nameFunc);
  const request = {
    usId: source.response.id,
    count: source.response.count,
    method: 'users.getFollowers',
    params: 'photo_100',
  };
  new MethodRequest(request).createSendRequest();
}

const modal = document.querySelector('.modal');
const modalBody = document.querySelector('.modal-body');
const modalHeader = document.querySelector('.modal-header');

function modalCreate(obj, nameFunc) {
  source = obj;
  func = nameFunc;

  switch (nameFunc) {
    case 'followers':
    case 'friends':
      console.log(source);
      source.response.items.forEach((item, i) => {
        const divSub = modalBody.appendChild(elementCreate('div', '', 'divSubFollowers'));
        divSub.appendChild(elementCreate('button', '', i));
        divSub.appendChild(elementCreate('img', '', 'followers', item.photo_100));
        divSub.appendChild(elementCreate('h3', `${item.first_name} ${item.last_name}`));
      });

      break;
    case 'groups':
      source.response.items.forEach((item, i) => {
        const divSub = modalBody.appendChild(elementCreate('div', '', 'divSub'));
        divSub.appendChild(elementCreate('img', '', 'followers', item.photo_100));
        divSub.appendChild(elementCreate('h3', item.name));
      });
      break;
    case 'photos':
      source.response.items.forEach((item, i) => {
        const divSub = modalBody.appendChild(elementCreate('div', '', 'divSubPhotos'));
        divSub.appendChild(elementCreate('button', '', i));
        divSub.appendChild(elementCreate('img', '', 'photos', item.sizes[2].url));
      });
      break;
    default:
      console.log('error');
  }

  modal.addEventListener('click', close);
  modal.addEventListener('click', selectionModal);
}

function close(event) {
  if (event.target === modal || event.target === modalHeader.lastElementChild) {
    if (modalHeader.firstElementChild.innerHTML === 'Фото') {
      modalBody.innerHTML = '';
      modalHeader.firstElementChild.innerHTML = 'Фотографии пользователя';
      modal.removeEventListener('click', close);
      modal.removeEventListener('click', selectionModal);
      return modalCreate(source, func);
    }
    modal.style.display = 'none';
    modalBody.innerHTML = '';
    modalHeader.firstElementChild.innerHTML = '';
    modal.removeEventListener('click', close);
    modal.removeEventListener('click', selectionModal);
  }
}

function selectionModal(event) {
  if (event.target.closest('.divSubPhotos')) {
    modalImgCreate(event.target.className);
  }
  if (event.target.closest('.divSubFollowers')) {
    modalProfileCreate(event.target.className);
  }
}

function modalImgCreate(i) {
  modalBody.innerHTML = '';
  modalHeader.firstElementChild.innerHTML = 'Фото';
  // console.log(source.response.items[i]);
  modalBody.appendChild(elementCreate('img', '', 'photos__orig', source.response.items[i].sizes[6].url));
}

function modalProfileCreate(i) {
  const profile = document.querySelector('.profile__img');
  const profileName = document.querySelector('.info__name');
  const profileInfo = document.querySelector('.info__label');
  const profileItem = document.querySelector('.info__item');
  const profileDetail = document.querySelector('.info__detail');
  const profileCounters = document.querySelector('.info__counters');

  profile.innerHTML = '';
  profileName.innerHTML = '';
  profileInfo.innerHTML = '';
  profileItem.innerHTML = '';
  profileDetail.innerHTML = '';
  profileCounters.innerHTML = '';
  // removeProfile()

  const profileCreateId = source.response.items[i].id;
  const user = {
    usId: profileCreateId,
    method: 'users.get',
    params: 'online,last_seen,bdate,city,universities,photo_200,counters',
  };
  new MethodRequest(user).createSendRequest();

  modal.style.display = 'none';
  modalBody.innerHTML = '';
  modalHeader.firstElementChild.innerHTML = '';
  modal.removeEventListener('click', close);
}

export { resCount, modalCreate };
