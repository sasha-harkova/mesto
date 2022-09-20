const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupSaveButton = popup.querySelector('.popup__save-button');
const popupCloseButton = popup.querySelector('.popup__close-button');
let nameInput = popup.querySelector('.popup__form-item_el_name');
let jobInput = popup.querySelector('.popup__form-item_el_job');
let userName = document.querySelector('.profile__username');
let userDescription = document.querySelector('.profile__user-description');
let formElement = popup.querySelector('.popup__form');

function popupOpen() {
  popup.classList.add('popup_opened');
  nameInput.value = userName.textContent;
  jobInput.value = userDescription.textContent;
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
popupCloseButton.addEventListener('click', popupClose);
popup.addEventListener('click', popupCloseByClickingOverlay);



function popupSave(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = jobInput.value;
  popupClose();
}

formElement.addEventListener('submit', popupSave);


