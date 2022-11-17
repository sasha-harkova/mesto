export default class UserInfo {
  constructor({ usernameSelecor, aboutSelector }) {
    this._username = document.querySelector(usernameSelecor);
    this._about = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    this._profileData = {};
    this._profileData.username = this._username.textContent;
    this._profileData.about = this._about.textContent;
    return this._profileData;
  }

  setUserInfo(nameInput, aboutInput) {
    this._username.textContent = nameInput.value;
    this._about.textContent = aboutInput.value;
  }
}
