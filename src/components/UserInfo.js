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

  setUserInfo(nameInput, aboutInput) {
    this._username.textContent = nameInput.value;
    this._about.textContent = aboutInput.value;
  }

  setAvatar(avatarInput) {
    this._avatar.src = avatarInput.value;
  }
}
