export const profileEditButton = document.querySelector(".profile__edit-button");
export const cardAddButton = document.querySelector(".profile__add-button");
export const popupEditAvatarButton = document.querySelector(".profile__avatar-container");
export const profileForm = document.forms.edit;
export const nameInput = profileForm.elements.username;
export const aboutInput = profileForm.elements.about;
export const newCardForm = document.forms.addphoto;
export const newAvatarForm = document.forms.editavatar;
export const avatarInput = newAvatarForm.elements.avatarlink;

export const objForValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
