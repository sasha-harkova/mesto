import './index.css';
import FormValidator from "../components/FormValidator.js";
import initialCards from "../utils/cards.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  profileEditButton,
  cardAddButton,
  popupEditAvatarButton,
  profileForm,
  nameInput,
  aboutInput,
  newCardForm,
  newAvatarForm,
  avatarInput,
  objForValidation
} from "../utils/constans.js"


//------------УНИВЕРСАЛЬНАЯ ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧКИ------------//

function addCard(photo, caption) {
  const card = new Card(photo, caption, ".template-add-photo", { handleCardClick: () => {
    popupWithImage.open(photo, caption);
  } });
  const cardElement = card.createCard();
  return cardElement;
}

//------------ДОБАВЛЕНИЕ КАРТОЧЕК ИЗ МАССИВА------------//

const renderedCard = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = addCard(item.link, item.name);
    renderedCard.addItem(cardElement)
  }
},'.content');
renderedCard.renderItems();

//------------ВАЛИДАЦИЯ ФОРМ------------//

const validationNewCardForm = new FormValidator(objForValidation, newCardForm);
validationNewCardForm.enableValidation();

const validationProfileForm = new FormValidator(objForValidation, profileForm);
validationProfileForm.enableValidation();

const validationNewAvatarForm = new FormValidator(objForValidation, newAvatarForm);
validationNewAvatarForm.enableValidation();

//------------ПОПАП С ЗУМОМ ИЗОБРАЖЕНИЯ------------//

const popupWithImage = new PopupWithImage('.popup_type_for-image');
popupWithImage.setEventListeners();

//------------ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ------------//

const userInfo = new UserInfo({usernameSelecor: ".profile__username", aboutSelector: ".profile__user-description", avatarSelector: ".profile__avatar"});

const popupEditProfile = new PopupWithForm(".popup_type_edit-profile", { handleFormSubmit: () => {
  userInfo.setUserInfo(nameInput, aboutInput);
} });
popupEditProfile.setEventListeners();

//------------ПОПАП РЕДАКТИРОВАНИЯ АВАТАРА------------//

const popupEditAvatar = new PopupWithForm(".popup_type_edit-avatar", { handleFormSubmit: () => {
  userInfo.setAvatar(avatarInput);
} });
popupEditAvatar.setEventListeners();

//------------ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ------------//

const popupAddCard = new PopupWithForm(".popup_type_add-card", { handleFormSubmit: (formData) => {
  const cardElement = addCard(formData.cardlink, formData.cardname);
  renderedCard.addItem(cardElement);
} });
popupAddCard.setEventListeners();

//------------УНИВЕРСАЛЬНАЯ ФУНКЦИЯ ДЛЯ ПОПАПОВ С ФОРМАМИ------------//

function openPopupWithForm(validationForm, popup) {
  validationForm.deactivateButton();
  validationForm.clearInputError();
  popup.open();
}

//------------СЛУШАТЕЛИ ПОПАПОВ------------//

profileEditButton.addEventListener("click", () => {
  openPopupWithForm(validationProfileForm, popupEditProfile);
  const profileData = userInfo.getUserInfo();
  nameInput.value = profileData.username;
  aboutInput.value = profileData.about;
});
popupEditAvatarButton.addEventListener("click", () => {
  openPopupWithForm(validationNewAvatarForm, popupEditAvatar);
});
cardAddButton.addEventListener("click", () => {
  openPopupWithForm(validationNewCardForm, popupAddCard);
});
