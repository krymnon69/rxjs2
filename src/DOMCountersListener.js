import MethodRequest from './Request';
import { getProfileFromStorage } from './Storage';

export default function listenerCountersProfile(event) {
  const modal = document.querySelector('.modal');
  const modalHeader = document.querySelector('.modal-header');

  let cnt;

  if (event.target.closest('.counters-followers')) {
    modal.style.display = 'block';
    modalHeader.firstElementChild.innerHTML = 'Подписчики';

    const currentProfile = getProfileFromStorage();

    const followersList = {
      method: 'users.getFollowers',
      usId: currentProfile.id,
    };
    new MethodRequest(followersList).createSendRequest();
  }

  if (event.target.closest('.counters-fotos')) {
    modal.style.display = 'block';
    modalHeader.firstElementChild.innerHTML = 'Фотографии пользователя';

    const currentProfile = getProfileFromStorage();
    cnt = 200;
    if (currentProfile.counters.photos < 200) cnt = currentProfile.counters.photos;

    const photos = {
      method: 'photos.getAll',
      owner_id: currentProfile.id,
      count: cnt,
    };
    new MethodRequest(photos).createSendRequest();
  }

  if (event.target.closest('.counters-friends')) {
    modal.style.display = 'block';
    modalHeader.firstElementChild.innerHTML = 'Список друзей';

    const currentProfile = getProfileFromStorage();
    cnt = 5000;
    if (currentProfile.counters.friends < 5000) cnt = currentProfile.counters.friends;

    const friends = {
      method: 'friends.get',
      usId: currentProfile.id,
      order: 'hints',
      count: cnt,
      params: 'photo_100',
    };
    new MethodRequest(friends).createSendRequest();
  }

  if (event.target.closest('.counters-groups')) {
    modal.style.display = 'block';
    modalHeader.firstElementChild.innerHTML = 'Список сообществ';

    const currentProfile = getProfileFromStorage();
    cnt = 500;
    if (currentProfile.counters.groups < 500) cnt = currentProfile.counters.groups;

    const groups = {
      method: 'groups.get',
      usId: currentProfile.id,
      extended: 1,
      owner_id: currentProfile.id,
      count: cnt,
    };
    new MethodRequest(groups).createSendRequest();
  }
}
