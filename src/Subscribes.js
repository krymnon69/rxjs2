import elementCreate from './ElementCreate';
import { MethodRequest } from './rxVK';

export default function subscribesModalCreate(obj) {
  const source = obj.response.items;
  console.log(obj.response);
  const modalContent = document.querySelector('.modal-content');

  source.forEach((item) => {
    const divSub = modalContent.appendChild(elementCreate('div', '', 'divSub'));
    divSub.appendChild(elementCreate('img', '', '', item.photo_100));
    divSub.appendChild(elementCreate('h3', `${item.first_name} ${item.last_name}`));
  });

  const span = document.querySelector('.close');
  const modal = document.querySelector('.modal');

  modal.addEventListener('click', function close(event) {
    if (event.target === modal || event.target === span) {
      modal.style.display = 'none';
      modalContent.innerHTML = '<span class="close">&times;</span>';
      modal.removeEventListener('click', close);
    }
  });

  // modal.addEventListener('scroll', () => {
  //   // console.log(modal.scrollTop);
  //   const followersList = {
  //     usId: '',
  //     offset: '',
  //     count: '',
  //     method: 'users.getFollowers',
  //     params: 'photo_100',
  //   };
  //   console.log(source.length);
  //   new MethodRequest(followersList).createSendRequest();
  //   // modal.removeEventListener('scroll', scrolled);
  // }, { once: true });
}
