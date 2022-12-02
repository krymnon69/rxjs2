export default class Token {
  #basePort = document.location.port;

  #url = 'https://oauth.vk.com/authorize?client_id=51473070&display=popup&'
    + `redirect_uri=http://localhost:${this.#basePort}/&scope=300,photos,friends,groups&response_type=token&v=5.131`;

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
