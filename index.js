const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupSaveButton = popup.querySelector('.popup__save-button');
const popupCloseButton = popup.querySelector('.popup__close-button');
let nameInput = popup.querySelector('.popup__form-item_name');
let jobInput = popup.querySelector('.popup__form-item_job');
let userName = document.querySelector('.profile__username');
let userDescription = document.querySelector('.profile__user-description');
let formElement = popup.querySelector('.popup__container');

function popupOpen() {
  popup.classList.add('popup_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function popupCloseByClickingOverlay(event) {
  if (event.target == event.currentTarget) {
    popupClose();
  }
}

popupOpenButton.addEventListener('click', popupOpen);
popupSaveButton.addEventListener('click', popupClose);
popupCloseButton.addEventListener('click', popupClose);
popup.addEventListener('click', popupCloseByClickingOverlay);



function popupSave(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = jobInput.value;
}

formElement.addEventListener('submit', popupSave);


