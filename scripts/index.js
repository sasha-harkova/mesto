const popups = document.querySelectorAll(".popup");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
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
  const form = popup.querySelector('.popup__form');
  const validation = new FormValidator(objForValidation, form);
  validation.enableValidation();
}

//------------ДЕАКТИВИРОВАНИЕ КНОПКИ------------//

function deactivateButtonAtForm(popup) {
  const form = popup.querySelector('.popup__form');
  const validation = new FormValidator(objForValidation, form);
  validation.deactivateButton();
}

//------------ОТКРЫТИЕ ПОПАПОВ------------//

import { openPopup, closePopup } from "./open-and-close-popup.js"

function openPopupWithForm(popup) {
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

function closePopupAfterSubmit(evt) {
  const popup = evt.target.closest('.popup');
  closePopup(popup);
}

function handleClosePopupByClickingOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

//------------СОХРАНЕНИЕ ИЗМЕНЕНИЙ РЕДАКТИРОВАНИЯ ПРОФИЛЯ------------//

function handleSaveProfile(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = jobInput.value;
  closePopupAfterSubmit(evt);
}

function handleEditAvatar(evt) {
  evt.preventDefault();
  const avatar = document.querySelector(".profile__avatar");
  avatar.src = linkForNewAvatar.value;
  closePopupAfterSubmit(evt);
}

//------------ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ------------//

import initialCards from "./cards.js";
import Card from "./Card.js";

function addCard(photo, caption) {
  const newCard = new Card(photo, caption, ".template-add-photo");
  const newCardElement = newCard.createCard();
  content.prepend(newCardElement);
}

function addCardFromArray() {
  initialCards.forEach((item) => addCard(item.link, item.name));
}
addCardFromArray();

function handleAddNewCard(evt) {
  evt.preventDefault();
  addCard(linkPhoto.value, placeName.value,);
  closePopupAfterSubmit(evt);
}


profileEditButton.addEventListener("click", openPopupEditProfile);
profileAddButton.addEventListener("click", openPopupAddCard);
popupEditAvatarButton.addEventListener("click", openPopupEditAvatar);
popupCloseButtons.forEach((btn) => {
  const popup = btn.closest('.popup');
  btn.addEventListener("click", () => closePopup(popup));
});
popups.forEach((item) => item.addEventListener("click", handleClosePopupByClickingOverlay));
profileForm.addEventListener("submit", handleSaveProfile);
newCardForm.addEventListener("submit", handleAddNewCard);
newAvatarForm.addEventListener("submit", handleEditAvatar);
