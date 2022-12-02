import Token from './Token';
import elementCreate from './ElementCreate';

export default class MethodRequest extends Token {
  constructor(options) {
    super();
    options.usId ? this.usId = options.usId : this.usId = this.userId;
    options.offset ? this.offset = options.offset : this.offset = 0;
    options.count ? this.count = options.count : this.count = '';
    options.owner_id ? this.owner_id = options.owner_id : this.owner_id = '';
    options.order ? this.order = options.order : this.order = '';
    options.params ? this.params = options.params : this.params = '';
    options.extended ? this.extended = options.extended : this.extended = '';
    options.search ? this.search = options.search : this.search = '';

    this.method = options.method;
    this.params = options.params;
  }

  createSendRequest() {
    const url = `https://api.vk.com/method/${this.method}?`
      + `q=${this.search}&`
      + `user_id=${this.usId}&`
      + `extended=${this.extended}&`
      + `offset=${this.offset}&`
      + `count=${this.count}&`
      + `order=${this.count}&`
      + `owner_id=${this.owner_id}&`
      + `fields=${this.params}&`
      + `access_token=${this.token}&photo_sizes=1&v=5.131`;

    if (this.method === 'users.get') elementCreate('script', '', '', `${url}&callback=profile`);
    if (this.method === 'users.getFollowers') elementCreate('script', '', '', `${url}&callback=followers`);
    if (this.method === 'photos.getAll') elementCreate('script', '', '', `${url}&callback=photos`);
    if (this.method === 'friends.get') elementCreate('script', '', '', `${url}&callback=friends`);
    if (this.method === 'groups.get') elementCreate('script', '', '', `${url}&callback=groups`);
    if (this.method === 'users.search') elementCreate('script', '', '', `${url}&callback=search`);
  }
}
