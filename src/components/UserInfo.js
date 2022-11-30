export default class UserInfo {
  constructor({ usernameSelecor, aboutSelector, avatarSelector }) {
    this._username = document.querySelector(usernameSelecor);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._profileData = {};
    this._profileData.username = this._username.textContent;
    this._profileData.about = this._about.textContent;
    this._profileData.avatar = this._avatar.src;
    return this._profileData;
  }

  setUserInfo(data) {
    this._username.textContent = data.name;
    this._about.textContent = data.about;

  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }
}
