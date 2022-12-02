function getProfileFromStorage() {
  return JSON.parse(localStorage.getItem('currentProfile'));
}

function removeStorage() {
  localStorage.setItem('token', 'null');
  localStorage.setItem('userId', 'null');
  localStorage.setItem('currentProfile', 'null');
}

export { getProfileFromStorage, removeStorage }
