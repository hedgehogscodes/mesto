export default class Api {
  constructor(options) {
    this._token = options.baseUrl;
    this._authorization = options.headers.authorization;
    this._contentType = options.headers["Content-Type"];
  }

  //////////////////Setup User Info////////////////////////////////////
  getUserInfo() {
    return fetch(`${this._token}/users/me`, {
        method: 'GET',
        headers: {
          authorization: this._authorization
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
  /////////////////////////////////////////////////////////////////////

  //////////////////Setup Cards ///////////////////////////////////////
  getInitialCards() {
    return fetch(`${this._token}/cards`, {
        method: 'GET',
        headers: {
          authorization: this._authorization
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
  /////////////////////////////////////////////////////////////////////

  //////////////////Save user information ////////////////////////////
  saveUserInfo({ name, status }) {
    return fetch(`${this._token}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this._authorization,
          'Content-Type': this._contentType
        },
        body: JSON.stringify({
          name: name,
          about: status
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
  /////////////////////////////////////////////////////////////////////

  //////////////////Add Card /////////////////////////////////////////
  addCard({ title, link }) {
    return fetch(`${this._token}/cards`, {
        method: 'POST',
        headers: {
          authorization: this._authorization,
          'Content-Type': this._contentType
        },
        body: JSON.stringify({
          name: title,
          link: link
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
  /////////////////////////////////////////////////////////////////////

  //////////////////Del Card /////////////////////////////////////////
  deleteCard(cardId) {
    return fetch(`${this._token}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._authorization,
          'Content-Type': this._contentType
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
  /////////////////////////////////////////////////////////////////////

  //////////////////Add Like /////////////////////////////////////////
  addLike(cardId) {
    return fetch(`${this._token}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
          authorization: this._authorization,
          'Content-Type': this._contentType
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
  /////////////////////////////////////////////////////////////////////

  //////////////////Del Like /////////////////////////////////////////
  deleteLike(cardId) {
    return fetch(`${this._token}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._authorization,
          'Content-Type': this._contentType
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
  /////////////////////////////////////////////////////////////////////

  //////////////////Edit Avatar////////////////////////////////////////
  editAvatar(link) {
    return fetch(`${this._token}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this._authorization,
          'Content-Type': this._contentType
        },
        body: JSON.stringify({
          avatar: `${link}`
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
   /////////////////////////////////////////////////////////////////////
}