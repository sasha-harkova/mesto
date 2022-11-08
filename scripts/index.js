import FormValidator from "./FormValidator.js"
import { openPopup, closePopup } from "./open-and-close-popup.js"
import initialCards from "./cards.js";
import Card from "./Card.js";

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

const objForValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

//------------ОТКРЫТИЕ ПОПАПОВ------------//

function openPopupEditProfile() {
  openPopup(popupEditProfile);
  const form = popupEditProfile.querySelector('.popup__form');
  const validation = new FormValidator(objForValidation, form);
  validation.enableValidation();
  validation.deactivateButton();
  nameInput.value = userName.textContent;
  jobInput.value = userDescription.textContent;
}

function openPopupAddCard() {
  openPopup(popupAddCard);
  const form = popupAddCard.querySelector('.popup__form');
  const validation = new FormValidator(objForValidation, form);
  validation.enableValidation();
  validation.deactivateButton();
}

function openPopupEditAvatar() {
  openPopup(popupEditAvatar);
  const form = popupEditAvatar.querySelector('.popup__form');
  const validation = new FormValidator(objForValidation, form);
  validation.enableValidation();
  validation.deactivateButton();
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

function addCard(photo, caption) {
  const newCard = new Card(photo, caption, ".template-add-photo");
  const newCardElement = newCard.createCard();
  content.prepend(newCardElement);
}

function addCardFromArray() {
  initialCards.forEach((item) => {
    addCard(item.link, item.name);
  });
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
