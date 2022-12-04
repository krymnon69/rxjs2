/*! For license information please see bundle.js.LICENSE.txt */
(()=>{"use strict";var e=function(t,n){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])},e(t,n)};function t(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}function n(e){return"function"==typeof e}var r=!1,o={Promise:void 0,set useDeprecatedSynchronousErrorHandling(e){e&&(new Error).stack,r=e},get useDeprecatedSynchronousErrorHandling(){return r}};function i(e){setTimeout((function(){throw e}),0)}var s={closed:!0,next:function(e){},error:function(e){if(o.useDeprecatedSynchronousErrorHandling)throw e;i(e)},complete:function(){}},c=function(){return Array.isArray||function(e){return e&&"number"==typeof e.length}}(),u=function(){function e(e){return Error.call(this),this.message=e?e.length+" errors occurred during unsubscription:\n"+e.map((function(e,t){return t+1+") "+e.toString()})).join("\n  "):"",this.name="UnsubscriptionError",this.errors=e,this}return e.prototype=Object.create(Error.prototype),e}(),l=function(){function e(e){this.closed=!1,this._parentOrParents=null,this._subscriptions=null,e&&(this._ctorUnsubscribe=!0,this._unsubscribe=e)}return e.prototype.unsubscribe=function(){var t;if(!this.closed){var r,o=this,i=o._parentOrParents,s=o._ctorUnsubscribe,l=o._unsubscribe,h=o._subscriptions;if(this.closed=!0,this._parentOrParents=null,this._subscriptions=null,i instanceof e)i.remove(this);else if(null!==i)for(var d=0;d<i.length;++d)i[d].remove(this);if(n(l)){s&&(this._unsubscribe=void 0);try{l.call(this)}catch(e){t=e instanceof u?a(e.errors):[e]}}if(c(h)){d=-1;for(var p=h.length;++d<p;){var f=h[d];if(null!==(r=f)&&"object"==typeof r)try{f.unsubscribe()}catch(e){t=t||[],e instanceof u?t=t.concat(a(e.errors)):t.push(e)}}}if(t)throw new u(t)}},e.prototype.add=function(t){var n=t;if(!t)return e.EMPTY;switch(typeof t){case"function":n=new e(t);case"object":if(n===this||n.closed||"function"!=typeof n.unsubscribe)return n;if(this.closed)return n.unsubscribe(),n;if(!(n instanceof e)){var r=n;(n=new e)._subscriptions=[r]}break;default:throw new Error("unrecognized teardown "+t+" added to Subscription.")}var o=n._parentOrParents;if(null===o)n._parentOrParents=this;else if(o instanceof e){if(o===this)return n;n._parentOrParents=[o,this]}else{if(-1!==o.indexOf(this))return n;o.push(this)}var i=this._subscriptions;return null===i?this._subscriptions=[n]:i.push(n),n},e.prototype.remove=function(e){var t=this._subscriptions;if(t){var n=t.indexOf(e);-1!==n&&t.splice(n,1)}},e.EMPTY=function(e){return e.closed=!0,e}(new e),e}();function a(e){return e.reduce((function(e,t){return e.concat(t instanceof u?t.errors:t)}),[])}var h=function(){return"function"==typeof Symbol?Symbol("rxSubscriber"):"@@rxSubscriber_"+Math.random()}(),d=function(e){function n(t,r,o){var i=e.call(this)||this;switch(i.syncErrorValue=null,i.syncErrorThrown=!1,i.syncErrorThrowable=!1,i.isStopped=!1,arguments.length){case 0:i.destination=s;break;case 1:if(!t){i.destination=s;break}if("object"==typeof t){t instanceof n?(i.syncErrorThrowable=t.syncErrorThrowable,i.destination=t,t.add(i)):(i.syncErrorThrowable=!0,i.destination=new p(i,t));break}default:i.syncErrorThrowable=!0,i.destination=new p(i,t,r,o)}return i}return t(n,e),n.prototype[h]=function(){return this},n.create=function(e,t,r){var o=new n(e,t,r);return o.syncErrorThrowable=!1,o},n.prototype.next=function(e){this.isStopped||this._next(e)},n.prototype.error=function(e){this.isStopped||(this.isStopped=!0,this._error(e))},n.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},n.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,e.prototype.unsubscribe.call(this))},n.prototype._next=function(e){this.destination.next(e)},n.prototype._error=function(e){this.destination.error(e),this.unsubscribe()},n.prototype._complete=function(){this.destination.complete(),this.unsubscribe()},n.prototype._unsubscribeAndRecycle=function(){var e=this._parentOrParents;return this._parentOrParents=null,this.unsubscribe(),this.closed=!1,this.isStopped=!1,this._parentOrParents=e,this},n}(l),p=function(e){function r(t,r,o,i){var c,u=e.call(this)||this;u._parentSubscriber=t;var l=u;return n(r)?c=r:r&&(c=r.next,o=r.error,i=r.complete,r!==s&&(n((l=Object.create(r)).unsubscribe)&&u.add(l.unsubscribe.bind(l)),l.unsubscribe=u.unsubscribe.bind(u))),u._context=l,u._next=c,u._error=o,u._complete=i,u}return t(r,e),r.prototype.next=function(e){if(!this.isStopped&&this._next){var t=this._parentSubscriber;o.useDeprecatedSynchronousErrorHandling&&t.syncErrorThrowable?this.__tryOrSetError(t,this._next,e)&&this.unsubscribe():this.__tryOrUnsub(this._next,e)}},r.prototype.error=function(e){if(!this.isStopped){var t=this._parentSubscriber,n=o.useDeprecatedSynchronousErrorHandling;if(this._error)n&&t.syncErrorThrowable?(this.__tryOrSetError(t,this._error,e),this.unsubscribe()):(this.__tryOrUnsub(this._error,e),this.unsubscribe());else if(t.syncErrorThrowable)n?(t.syncErrorValue=e,t.syncErrorThrown=!0):i(e),this.unsubscribe();else{if(this.unsubscribe(),n)throw e;i(e)}}},r.prototype.complete=function(){var e=this;if(!this.isStopped){var t=this._parentSubscriber;if(this._complete){var n=function(){return e._complete.call(e._context)};o.useDeprecatedSynchronousErrorHandling&&t.syncErrorThrowable?(this.__tryOrSetError(t,n),this.unsubscribe()):(this.__tryOrUnsub(n),this.unsubscribe())}else this.unsubscribe()}},r.prototype.__tryOrUnsub=function(e,t){try{e.call(this._context,t)}catch(e){if(this.unsubscribe(),o.useDeprecatedSynchronousErrorHandling)throw e;i(e)}},r.prototype.__tryOrSetError=function(e,t,n){if(!o.useDeprecatedSynchronousErrorHandling)throw new Error("bad call");try{t.call(this._context,n)}catch(t){return o.useDeprecatedSynchronousErrorHandling?(e.syncErrorValue=t,e.syncErrorThrown=!0,!0):(i(t),!0)}return!1},r.prototype._unsubscribe=function(){var e=this._parentSubscriber;this._context=null,this._parentSubscriber=null,e.unsubscribe()},r}(d),f=function(){return"function"==typeof Symbol&&Symbol.observable||"@@observable"}();function b(e){return e}function y(e){return 0===e.length?b:1===e.length?e[0]:function(t){return e.reduce((function(e,t){return t(e)}),t)}}var m=function(){function e(e){this._isScalar=!1,e&&(this._subscribe=e)}return e.prototype.lift=function(t){var n=new e;return n.source=this,n.operator=t,n},e.prototype.subscribe=function(e,t,n){var r=this.operator,i=function(e,t,n){if(e){if(e instanceof d)return e;if(e[h])return e[h]()}return e||t||n?new d(e,t,n):new d(s)}(e,t,n);if(r?i.add(r.call(i,this.source)):i.add(this.source||o.useDeprecatedSynchronousErrorHandling&&!i.syncErrorThrowable?this._subscribe(i):this._trySubscribe(i)),o.useDeprecatedSynchronousErrorHandling&&i.syncErrorThrowable&&(i.syncErrorThrowable=!1,i.syncErrorThrown))throw i.syncErrorValue;return i},e.prototype._trySubscribe=function(e){try{return this._subscribe(e)}catch(t){o.useDeprecatedSynchronousErrorHandling&&(e.syncErrorThrown=!0,e.syncErrorValue=t),function(e){for(;e;){var t=e,n=t.closed,r=t.destination,o=t.isStopped;if(n||o)return!1;e=r&&r instanceof d?r:null}return!0}(e)?e.error(t):console.warn(t)}},e.prototype.forEach=function(e,t){var n=this;return new(t=_(t))((function(t,r){var o;o=n.subscribe((function(t){try{e(t)}catch(e){r(e),o&&o.unsubscribe()}}),r,t)}))},e.prototype._subscribe=function(e){var t=this.source;return t&&t.subscribe(e)},e.prototype[f]=function(){return this},e.prototype.pipe=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return 0===e.length?this:y(e)(this)},e.prototype.toPromise=function(e){var t=this;return new(e=_(e))((function(e,n){var r;t.subscribe((function(e){return r=e}),(function(e){return n(e)}),(function(){return e(r)}))}))},e.create=function(t){return new e(t)},e}();function _(e){if(e||(e=o.Promise||Promise),!e)throw new Error("no Promise impl found");return e}function v(e,t){return function(n){if("function"!=typeof e)throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");return n.lift(new g(e,t))}}var g=function(){function e(e,t){this.project=e,this.thisArg=t}return e.prototype.call=function(e,t){return t.subscribe(new w(e,this.project,this.thisArg))},e}(),w=function(e){function n(t,n,r){var o=e.call(this,t)||this;return o.project=n,o.count=0,o.thisArg=r||o,o}return t(n,e),n.prototype._next=function(e){var t;try{t=this.project.call(this.thisArg,e,this.count++)}catch(e){return void this.destination.error(e)}this.destination.next(t)},n}(d);function S(e,t,n,r,o){var i;if(function(e){return e&&"function"==typeof e.addEventListener&&"function"==typeof e.removeEventListener}(e)){var s=e;e.addEventListener(t,n,o),i=function(){return s.removeEventListener(t,n,o)}}else if(function(e){return e&&"function"==typeof e.on&&"function"==typeof e.off}(e)){var c=e;e.on(t,n),i=function(){return c.off(t,n)}}else if(function(e){return e&&"function"==typeof e.addListener&&"function"==typeof e.removeListener}(e)){var u=e;e.addListener(t,n),i=function(){return u.removeListener(t,n)}}else{if(!e||!e.length)throw new TypeError("Invalid event target");for(var l=0,a=e.length;l<a;l++)S(e[l],t,n,r,o)}r.add(i)}var E=function(e){function n(t,n){var r=e.call(this,t,n)||this;return r.scheduler=t,r.work=n,r.pending=!1,r}return t(n,e),n.prototype.schedule=function(e,t){if(void 0===t&&(t=0),this.closed)return this;this.state=e;var n=this.id,r=this.scheduler;return null!=n&&(this.id=this.recycleAsyncId(r,n,t)),this.pending=!0,this.delay=t,this.id=this.id||this.requestAsyncId(r,this.id,t),this},n.prototype.requestAsyncId=function(e,t,n){return void 0===n&&(n=0),setInterval(e.flush.bind(e,this),n)},n.prototype.recycleAsyncId=function(e,t,n){if(void 0===n&&(n=0),null!==n&&this.delay===n&&!1===this.pending)return t;clearInterval(t)},n.prototype.execute=function(e,t){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;var n=this._execute(e,t);if(n)return n;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))},n.prototype._execute=function(e,t){var n=!1,r=void 0;try{this.work(e)}catch(e){n=!0,r=!!e&&e||new Error(e)}if(n)return this.unsubscribe(),r},n.prototype._unsubscribe=function(){var e=this.id,t=this.scheduler,n=t.actions,r=n.indexOf(this);this.work=null,this.state=null,this.pending=!1,this.scheduler=null,-1!==r&&n.splice(r,1),null!=e&&(this.id=this.recycleAsyncId(t,e,null)),this.delay=null},n}(function(e){function n(t,n){return e.call(this)||this}return t(n,e),n.prototype.schedule=function(e,t){return void 0===t&&(t=0),this},n}(l)),k=function(){function e(t,n){void 0===n&&(n=e.now),this.SchedulerAction=t,this.now=n}return e.prototype.schedule=function(e,t,n){return void 0===t&&(t=0),new this.SchedulerAction(this,e).schedule(n,t)},e.now=function(){return Date.now()},e}(),T=new(function(e){function n(t,r){void 0===r&&(r=k.now);var o=e.call(this,t,(function(){return n.delegate&&n.delegate!==o?n.delegate.now():r()}))||this;return o.actions=[],o.active=!1,o.scheduled=void 0,o}return t(n,e),n.prototype.schedule=function(t,r,o){return void 0===r&&(r=0),n.delegate&&n.delegate!==this?n.delegate.schedule(t,r,o):e.prototype.schedule.call(this,t,r,o)},n.prototype.flush=function(e){var t=this.actions;if(this.active)t.push(e);else{var n;this.active=!0;do{if(n=e.execute(e.state,e.delay))break}while(e=t.shift());if(this.active=!1,n){for(;e=t.shift();)e.unsubscribe();throw n}}},n}(k))(E),C=function(){function e(e,t){this.dueTime=e,this.scheduler=t}return e.prototype.call=function(e,t){return t.subscribe(new x(e,this.dueTime,this.scheduler))},e}(),x=function(e){function n(t,n,r){var o=e.call(this,t)||this;return o.dueTime=n,o.scheduler=r,o.debouncedSubscription=null,o.lastValue=null,o.hasValue=!1,o}return t(n,e),n.prototype._next=function(e){this.clearDebounce(),this.lastValue=e,this.hasValue=!0,this.add(this.debouncedSubscription=this.scheduler.schedule(L,this.dueTime,this))},n.prototype._complete=function(){this.debouncedNext(),this.destination.complete()},n.prototype.debouncedNext=function(){if(this.clearDebounce(),this.hasValue){var e=this.lastValue;this.lastValue=null,this.hasValue=!1,this.destination.next(e)}},n.prototype.clearDebounce=function(){var e=this.debouncedSubscription;null!==e&&(this.remove(e),e.unsubscribe(),this.debouncedSubscription=null)},n}(d);function L(e){e.debouncedNext()}var I=function(){function e(e,t){this.compare=e,this.keySelector=t}return e.prototype.call=function(e,t){return t.subscribe(new q(e,this.compare,this.keySelector))},e}(),q=function(e){function n(t,n,r){var o=e.call(this,t)||this;return o.keySelector=r,o.hasKey=!1,"function"==typeof n&&(o.compare=n),o}return t(n,e),n.prototype.compare=function(e,t){return e===t},n.prototype._next=function(e){var t;try{var n=this.keySelector;t=n?n(e):e}catch(e){return this.destination.error(e)}var r=!1;if(this.hasKey)try{r=(0,this.compare)(this.key,t)}catch(e){return this.destination.error(e)}else this.hasKey=!0;r||(this.key=t,this.destination.next(e))},n}(d);class H{#e=document.location.port;#t="https://oauth.vk.com/authorize?client_id=51473070&display=popup&redirect_uri=https://krymnon69.github.io/rxjs2/&scope=300,photos,friends,groups&response_type=token&v=5.131";#n=localStorage.getItem("token");#r=localStorage.getItem("userId");login(){if("null"===this.#n)return void(window.location=this.#t);const e=document.querySelector(".auto");e.nextElementSibling.style.transform="scaleX(1)",setTimeout((()=>e.nextElementSibling.style.transform="scaleX(0)"),800)}createToken(){if("null"===this.#n){const e=new URLSearchParams(document.location.hash);localStorage.setItem("token",e.get("#access_token")),localStorage.setItem("userId",e.get("user_id"))}}get token(){return this.#n}get userId(){return this.#r}}function O(e="div",t="",n="",r=""){const o=document.createElement(e);return""!==n&&(o.className=n),""!==r&&(o.src=r),""!==t&&(o.innerHTML=t),document.body.appendChild(o),o}class P extends H{constructor(e){super(),e.usId?this.usId=e.usId:this.usId=this.userId,e.offset?this.offset=e.offset:this.offset=0,e.count?this.count=e.count:this.count="",e.owner_id?this.owner_id=e.owner_id:this.owner_id="",e.order?this.order=e.order:this.order="",e.params?this.params=e.params:this.params="",e.extended?this.extended=e.extended:this.extended="",e.search?this.search=e.search:this.search="",this.method=e.method,this.params=e.params}createSendRequest(){const e=`https://api.vk.com/method/${this.method}?q=${this.search}&user_id=${this.usId}&extended=${this.extended}&offset=${this.offset}&count=${this.count}&order=${this.count}&owner_id=${this.owner_id}&fields=${this.params}&access_token=${this.token}&photo_sizes=1&v=5.131`;"users.get"===this.method&&O("script","","",`${e}&callback=profile`),"users.getFollowers"===this.method&&O("script","","",`${e}&callback=followers`),"photos.getAll"===this.method&&O("script","","",`${e}&callback=photos`),"friends.get"===this.method&&O("script","","",`${e}&callback=friends`),"groups.get"===this.method&&O("script","","",`${e}&callback=groups`),"users.search"===this.method&&O("script","","",`${e}&callback=search`)}}const M=document.querySelector(".profile__img"),$=document.querySelector(".profile__info"),D=document.querySelector(".info__name");let A,j;const V=document.querySelector(".modal"),R=document.querySelector(".modal-body"),U=document.querySelector(".modal-header");function N(e,t){switch(A=e,j=t,t){case"followers":case"friends":console.log(A),A.response.items.forEach(((e,t)=>{const n=R.appendChild(O("div","","divSubFollowers"));n.appendChild(O("button","",t)),n.appendChild(O("img","","followers",e.photo_100)),n.appendChild(O("h3",`${e.first_name} ${e.last_name}`))}));break;case"groups":A.response.items.forEach(((e,t)=>{const n=R.appendChild(O("div","","divSub"));n.appendChild(O("img","","followers",e.photo_100)),n.appendChild(O("h3",e.name))}));break;case"photos":A.response.items.forEach(((e,t)=>{const n=R.appendChild(O("div","","divSubPhotos"));n.appendChild(O("button","",t)),n.appendChild(O("img","","photos",e.sizes[2].url))}));break;default:console.log("error")}V.addEventListener("click",z),V.addEventListener("click",F)}function z(e){if(e.target===V||e.target===U.lastElementChild){if("Фото"===U.firstElementChild.innerHTML)return R.innerHTML="",U.firstElementChild.innerHTML="Фотографии пользователя",V.removeEventListener("click",z),V.removeEventListener("click",F),N(A,j);V.style.display="none",R.innerHTML="",U.firstElementChild.innerHTML="",V.removeEventListener("click",z),V.removeEventListener("click",F)}}function F(e){var t;e.target.closest(".divSubPhotos")&&(t=e.target.className,R.innerHTML="",U.firstElementChild.innerHTML="Фото",R.appendChild(O("img","","photos__orig",A.response.items[t].sizes[6].url))),e.target.closest(".divSubFollowers")&&function(e){const t=document.querySelector(".profile__img"),n=document.querySelector(".info__name"),r=document.querySelector(".info__label"),o=document.querySelector(".info__item"),i=document.querySelector(".info__detail"),s=document.querySelector(".info__counters");t.innerHTML="",n.innerHTML="",r.innerHTML="",o.innerHTML="",i.innerHTML="",s.innerHTML="";const c=A.response.items[e].id;new P({usId:c,method:"users.get",params:"online,last_seen,bdate,city,universities,photo_200,counters"}).createSendRequest(),V.style.display="none",R.innerHTML="",U.firstElementChild.innerHTML="",V.removeEventListener("click",z)}(e.target.className)}function K(){return JSON.parse(localStorage.getItem("currentProfile"))}function Y(){localStorage.setItem("token","null"),localStorage.setItem("userId","null"),localStorage.setItem("currentProfile","null")}localStorage.getItem("token")||Y(),window.profile=e=>function(e){const t=e.response[0];localStorage.setItem("currentProfile",JSON.stringify(t)),M.style.display="flex",D.style.display="flex",$.style.display="block",M.appendChild(O("img","","",t.photo_200)),D.appendChild(O("h1",`${t.first_name} ${t.last_name}`));const n=new Date(1e3*t.last_seen.time);1!==t.online&&D.appendChild(O("h2",`Заходил ${n.toLocaleDateString("UTC",{month:"long",day:"numeric",hour:"numeric",minute:"numeric",hour12:!1})}`)),1===t.online&&D.appendChild(O("h2","Online"));const r=document.querySelector(".info__label");r.appendChild(O("h2","День рождения:")),r.appendChild(O("h2","Город:")),r.appendChild(O("h2","Образование:"));const o=t.bdate.split("."),i=new Date(o[2],o[1]-1,o[0]),s=new Date(new Date-i.getTime()).getFullYear()-1970,c=i.toLocaleDateString("UTC",{year:"numeric",month:"long",day:"numeric"}),u=document.querySelector(".info__item");u.appendChild(O("a",`${c} (${s} лет)`)),u.appendChild(O("a",t.city.title)),u.appendChild(O("a",t.universities[0].name)),document.querySelector(".info__detail").appendChild(O("a","Показать подробную информацию"));const l=document.querySelector(".info__counters"),a=l.appendChild(O("div","","button__counters"));a.appendChild(O("button","","counters-followers")),a.appendChild(O("label",t.counters.clips_followers)),a.appendChild(O("label","подписчиков"));const h=l.appendChild(O("div","","button__fotos"));h.appendChild(O("button","","counters-fotos")),h.appendChild(O("label",t.counters.photos)),h.appendChild(O("label","фотографии"));const d=l.appendChild(O("div","","button__friends"));d.appendChild(O("button","","counters-friends")),d.appendChild(O("label",t.counters.friends)),d.appendChild(O("label","друзей"));const p=l.appendChild(O("div","","button__groups"));p.appendChild(O("button","","counters-groups")),p.appendChild(O("label",t.counters.groups)),p.appendChild(O("label","сообществ"))}(e),window.followers=e=>function(e,t){if(0!==e.response.items.length)return N(e,"followers");const n={usId:e.response.id,count:e.response.count,method:"users.getFollowers",params:"photo_100"};new P(n).createSendRequest()}(e),window.photos=e=>N(e,"photos"),window.friends=e=>N(e,"friends"),window.groups=e=>N(e,"groups"),window.addEventListener("DOMContentLoaded",(()=>{"null"===localStorage.getItem("token")&&(new H).createToken(),"null"!==localStorage.getItem("token")&&new P({method:"users.get",params:"online,last_seen,bdate,city,universities,photo_200,counters,followers_count"}).createSendRequest()}));const J=document.querySelector(".autorization");document.querySelector(".info__counters").addEventListener("click",(function(e){const t=document.querySelector(".modal"),n=document.querySelector(".modal-header");let r;if(e.target.closest(".counters-followers")){t.style.display="block",n.firstElementChild.innerHTML="Подписчики";const e={method:"users.getFollowers",usId:K().id};new P(e).createSendRequest()}if(e.target.closest(".counters-fotos")){t.style.display="block",n.firstElementChild.innerHTML="Фотографии пользователя";const e=K();r=200,e.counters.photos<200&&(r=e.counters.photos);const o={method:"photos.getAll",owner_id:e.id,count:r};new P(o).createSendRequest()}if(e.target.closest(".counters-friends")){t.style.display="block",n.firstElementChild.innerHTML="Список друзей";const e=K();r=5e3,e.counters.friends<5e3&&(r=e.counters.friends);const o={method:"friends.get",usId:e.id,order:"hints",count:r,params:"photo_100"};new P(o).createSendRequest()}if(e.target.closest(".counters-groups")){t.style.display="block",n.firstElementChild.innerHTML="Список сообществ";const e=K();r=500,e.counters.groups<500&&(r=e.counters.groups);const o={method:"groups.get",usId:e.id,extended:1,owner_id:e.id,count:r};new P(o).createSendRequest()}})),J.addEventListener("click",(e=>{e.target.closest(".auto")&&(new H).login(),e.target.closest(".an_auto")&&(Y(),M.remove(),$.remove(),D.remove(),document.location.hash="")}));const X=document.querySelector(".autorization__input");X.onfocus=()=>{X.value=""};const B=function e(t,r,o,i){return n(o)&&(i=o,o=void 0),i?e(t,r,o).pipe(v((function(e){return c(e)?i.apply(void 0,e):i(e)}))):new m((function(e){S(t,r,(function(t){arguments.length>1?e.next(Array.prototype.slice.call(arguments)):e.next(t)}),e,o)}))}(X,"input").pipe(v((e=>e.target.value)),(500,void 0===G&&(G=T),function(e){return e.lift(new C(500,G))}),(function(e){return e.lift(new I(undefined,undefined))}));var G;B.subscribe((e=>{const t={q:e.toString(),offset:0,count:10,method:"users.search",params:""};new P(t).createSendRequest(),console.log(typeof e)})),window.search=e=>function(e){console.log(e)}(e),document.querySelector(".fetch").addEventListener("click",(()=>{const e=fetch(`${url}vasya&v=5.131`,{credentials:"include"});console.log(e)}))})();