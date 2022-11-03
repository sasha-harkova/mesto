const popups = document.querySelectorAll(".popup");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupAddCard = document.querySelector(".popup_add-card");
const popupForImage = document.querySelector(".popup_for-image");
const popupEditAvatar = document.querySelector(".popup_edit-avatar");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupCloseButtons = document.querySelectorAll(".popup__close-button");
const popupEditAvatarButton = document.querySelector(".profile__avatar-container");
const content = document.querySelector(".content");
const profileForm = document.forms.edit;
const nameInput = profileForm.elements.username;
const jobInput = profileForm.elements.about;
const userName = document.querySelector(".profile__username");
const userDescription = document.querySelector(".profile__user-description");
const newCardForm = document.forms.addphoto;
const placeName = newCardForm.elements.cardname;
const linkPhoto = newCardForm.elements.cardlink;
const newAvatarForm = document.forms.editavatar;
const linkForNewAvatar = newAvatarForm.elements.avatarlink;

//------------ВКЛЮЧЕНИЕ ВАЛИДАЦИИ------------//

import FormValidator from "./FormValidator.js"

const objForValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function activateValidation(popup) {
  const form = popup.querySelector(`${objForValidation.formSelector}`);
  const inputList = Array.from(form.querySelectorAll(`${objForValidation.inputSelector}`));
  inputList.forEach((input) => {
    const validation = new FormValidator(input, objForValidation);
    validation.enableValidation();
  })
}

//------------ОЧИЩЕНИЕ ИНПУТОВ И ОШИБОК ПОСЛЕ ВАЛИДАЦИИ------------//


function clearInputAndError(popup) {
    const formElement = popup.querySelector('.popup__form');
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const inputErrorList = Array.from(formElement.querySelectorAll('.popup__error'));
    formElement.reset()
    inputList.forEach(inputElement => {
      inputElement.classList.remove('popup__input_type_error');
    });
    inputErrorList.forEach(errorElement => {
      errorElement.textContent = "";
      errorElement.classList.remove('popup__error_visible');
    });
};

//------------ДЕАКТИВИРОВАНИЕ КНОПКИ------------//

function deactivateButtonAtForm(popup) {
  const button = popup.querySelector(".popup__save-button");
  button.classList.add("popup__save-button_disabled");
  button.setAttribute("disabled", "disabled");
}

//------------ОТКРЫТИЕ ПОПАПОВ------------//

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByClickingEscape);
}

function openPopupWithForm(popup) {
  clearInputAndError(popup);
  deactivateButtonAtForm(popup);
  activateValidation(popup);
  openPopup(popup);
}

function openPopupEditProfile() {
  openPopupWithForm(popupEditProfile);
  nameInput.value = userName.textContent;
  jobInput.value = userDescription.textContent;
}

function openPopupAddCard() {
  openPopupWithForm(popupAddCard);
}

function openPopupEditAvatar() {
  openPopupWithForm(popupEditAvatar);
}

//------------ЗАКРЫТИЕ ПОПАПОВ------------//

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByClickingEscape);
}

function closeEachPopup() {
  popups.forEach((item) => closePopup(item));
}

function handleClosePopupByClickingOverlay(evt) {
  if (evt.target == evt.currentTarget) {
    closePopup(evt.target);
  }
}

function closePopupByClickingEscape(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

//------------СОХРАНЕНИЕ ИЗМЕНЕНИЙ РЕДАКТИРОВАНИЯ ПРОФИЛЯ------------//

function handleSaveProfile(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = jobInput.value;
  closeEachPopup();
}

function handleEditAvatar(evt) {
  evt.preventDefault();
  const avatar = document.querySelector(".profile__avatar");
  avatar.src = linkForNewAvatar.value;
  closeEachPopup();
}

//------------ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ------------//

import initialCards from "./cards.js";
import Card from "./Card.js";

function openPreviewPicture(card) {
  card.querySelector(".content__photo").addEventListener("click", () => openPopup(popupForImage));
}

function addCard(photo, caption) {
  const newCard = new Card(photo, caption, ".template-add-photo");
  const newCardElement = newCard.createCard();
  content.prepend(newCardElement);
  openPreviewPicture(newCardElement);
}

function addCardFromArray() {
  initialCards.forEach((item) => addCard(item.link, item.name));
}
addCardFromArray();

function handleAddNewCard(evt) {
  evt.preventDefault();
  addCard(linkPhoto.value, placeName.value,);
  closeEachPopup();
}


profileEditButton.addEventListener("click", openPopupEditProfile);
profileAddButton.addEventListener("click", openPopupAddCard);
popupEditAvatarButton.addEventListener("click", openPopupEditAvatar);
popupCloseButtons.forEach((btn) => btn.addEventListener("click", closeEachPopup));
popups.forEach((item) => item.addEventListener("click", handleClosePopupByClickingOverlay));
profileForm.addEventListener("submit", handleSaveProfile);
newCardForm.addEventListener("submit", handleAddNewCard);
newAvatarForm.addEventListener("submit", handleEditAvatar);
