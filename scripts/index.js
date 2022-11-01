const popups = document.querySelectorAll(".popup");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupAddCard = document.querySelector(".popup_add-card");
const popupForImage = document.querySelector(".popup_for-image");
const popupEditAvatar = document.querySelector(".popup_edit-avatar");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupSaveButton = document.querySelector(".popup__save-button");
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

import initialCards from "./cards.js";
import Card from "./Card.js";


function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByClickingEscape);
}

function openPopupEditProfile() {
  openPopup(popupEditProfile);
  nameInput.value = userName.textContent;
  jobInput.value = userDescription.textContent;
  clearInputError(popupEditProfile);
}

function openPopupAddCard() {
  openPopup(popupAddCard);
  clearInputError(popupAddCard);
}

function openPopupEditAvatar() {
  openPopup(popupEditAvatar);
  clearInputError(popupEditAvatar);
}

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

function handleSaveProfile(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = jobInput.value;
  closeEachPopup();
  handleDeactivateButtonAtForm(evt);
}

function handleEditAvatar(evt) {
  evt.preventDefault();
  const avatar = document.querySelector(".profile__avatar");
  avatar.src = linkForNewAvatar.value;
  closeEachPopup();
  handleDeactivateButtonAtForm(evt);
  newAvatarForm.reset();
}

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
  handleDeactivateButtonAtForm(evt);
  newCardForm.reset();
}

function closePopupByClickingEscape(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

profileEditButton.addEventListener("click", openPopupEditProfile);
profileAddButton.addEventListener("click", openPopupAddCard);
popupEditAvatarButton.addEventListener("click", openPopupEditAvatar);
popupCloseButtons.forEach((btn) =>
  btn.addEventListener("click", closeEachPopup)
);
popups.forEach((item) =>
  item.addEventListener("click", handleClosePopupByClickingOverlay)
);
profileForm.addEventListener("submit", handleSaveProfile);
newCardForm.addEventListener("submit", handleAddNewCard);
newAvatarForm.addEventListener("submit", handleEditAvatar);
