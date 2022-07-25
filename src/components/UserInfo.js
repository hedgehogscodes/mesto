export default class UserInfo {
  constructor({nameSelector, statusSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._status = document.querySelector(statusSelector);
    this._avatar = document.querySelector(avatarSelector)
  }

  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      status: this._status.textContent,
    };
    return userData;
  }

  setUserInfo(name,status,userid,avatar) {
    this._name.textContent = name;
    this._status.textContent = status;
    this.id = userid;
    this._avatar.style.backgroundImage = `url(${avatar})`;
  }

}