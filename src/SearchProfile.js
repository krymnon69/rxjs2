import MethodRequest from './Request';

function searchProfile(input) {
  const user = {
    q: input,
    cnt: 3,
    method: 'users.search',
    params: 'online,last_seen,bdate,city,universities,photo_200',
  };
  new MethodRequest(user).createSendRequest();
}
