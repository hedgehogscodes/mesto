export default class UserInfo {
  constructor(nameSelector, statusSelector) {
    this._name = document.querySelector(nameSelector);
    this._status = document.querySelector(statusSelector);
  }

  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      status: this._status.textContent,
    };
    return userData;
  }

  setUserInfo(name,status) {
    this._name.textContent = name;
    this._status.textContent = status;
  }

}