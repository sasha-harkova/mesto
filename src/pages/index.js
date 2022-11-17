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
  avatar, profileForm,
  nameInput,
  aboutInput,
  newCardForm,
  newAvatarForm,
  linkForNewAvatar,
  objForValidation
} from "../utils/constans.js"

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

const userInfo = new UserInfo({usernameSelecor: ".profile__username", aboutSelector: ".profile__user-description"});

//------------ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ------------//

const popupEditProfile = new PopupWithForm(".popup_type_edit-profile", { handleFormSubmit: () => {
  userInfo.setUserInfo(nameInput, aboutInput)
} });
popupEditProfile.setEventListeners();

//------------ПОПАП РЕДАКТИРОВАНИЯ АВАТАРА------------//

const popupEditAvatar = new PopupWithForm(".popup_type_edit-avatar", { handleFormSubmit: () => {
  avatar.src = linkForNewAvatar.value;
} });
popupEditAvatar.setEventListeners();

const popupAddCard = new PopupWithForm(".popup_type_add-card", { handleFormSubmit: (formData) => {
  const renderedCard = new Section({formData},'.content');
  const card = new Card(formData.cardlink, formData.cardname, ".template-add-photo", { handleCardClick: () => {
    popupWithImage.open(formData.cardlink, formData.cardname);
  } });
  const cardElement = card.createCard();
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

//------------ДОБАВЛЕНИЕ КАРТОЧЕК ИЗ МАССИВА------------//

const cardFromArray = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.link, item.name, ".template-add-photo", {handleCardClick: () => {
      popupWithImage.open(item.link, item.name);
    }});
    const cardElement = card.createCard();
    cardFromArray.addItem(cardElement)
  }
},'.content');
cardFromArray.renderItems();
